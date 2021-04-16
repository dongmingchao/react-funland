import React, { useMemo } from 'react'
import { Empty } from './Empty'
import { Merge } from './utils'

export interface ItemProps {
  name: React.Key | React.Key[]
}

interface WithChildren<P> extends ItemProps {
  itemCom?: React.ComponentType<P>
}

export type ColumnsType<O, P> = Merge<
  O,
  React.PropsWithChildren<WithChildren<P>>
>

export type ChildProps<C> = {
  name?: React.Key | React.Key[]
  defaultChildCom?: React.ComponentType<C>
}

// type OutputProps<O, T> = UnionToIntersection<
//   T extends ColumnsType<O, infer P> ? P : object
// >
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
//   k: infer I
// ) => void
//   ? I
//   : never

export function map<P>(
  columns: Array<React.PropsWithChildren<WithChildren<P>>>,
  { name = [], defaultChildCom: DefaultChildCom = Empty }: ChildProps<P> = {}
): React.ComponentType<P> {
  return function (props) {
    const ret = useMemo(
      () =>
        columns.map(
          ({ name: subName, itemCom: ItemCom = DefaultChildCom, children }) => {
            const finalName = flat(name, subName)
            return React.createElement(
              ItemCom,
              {
                key: finalName.join(),
                ...props
              },
              children
            )
            // return (
            //   <ItemCom key={finalName.join()} {...props}>
            //     {children}
            //   </ItemCom>
            // )
          }
        ),
      [props]
    )
    return <React.Fragment>{ret}</React.Fragment>
  }
}

function flat<T>(a: T | T[], b: T | T[]) {
  if (a instanceof Array) {
    return a.concat(b)
  }
  return [a].concat(b)
}
