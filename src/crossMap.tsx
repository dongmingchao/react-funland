import React, { useMemo } from 'react'
import { Empty } from './Empty'
import { Merge } from './utils'

interface ItemProps {
  name: React.Key | React.Key[]
}

interface WithChildren<O, P> extends ItemProps {
  children?: React.ComponentType<P>
  itemCom?: React.ComponentType<O>
}

type Merge<A, B> = Omit<A, keyof B> & B

type ColumnsType<O, P> = Merge<O, WithChildren<O, P>>

type ChildProps<C> = {
  name?: React.Key | React.Key[]
  defaultChildCom?: React.ComponentType<C>
}

type OutputProps<O, T> = UnionToIntersection<
  T extends ColumnsType<O, infer P> ? P : object
>
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export function crossMap<O, C extends ColumnsType<O, any>>(
  defaultItemCom: React.ComponentType<O>,
  columns: C[],
  { name = [], defaultChildCom: DefaultChildCom = Empty }: ChildProps<C> = {}
) {
  return function (props: OutputProps<O, C>) {
    const ret = useMemo(
      () =>
        columns.map(
          ({
            name: subName,
            children: ChildCom = DefaultChildCom,
            itemCom: ItemCom = defaultItemCom,
            ...itemProps
          }) => {
            const finalName = flat(name, subName)
            return (
              <ItemCom
                key={finalName.join()}
                name={finalName}
                {...(itemProps as any)}
              >
                <ChildCom {...props} />
              </ItemCom>
            )
          }
        ),
      [props]
    )
    return <React.Fragment>{ret}</React.Fragment>
  }
}

export function flat<T>(a: T | T[], b: T | T[]) {
  if (a instanceof Array) {
    return a.concat(b)
  }
  return [a].concat(b)
}
