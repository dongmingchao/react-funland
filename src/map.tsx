import React from 'react'
import { Merge, SamePropsHoc } from './utilsType'
import { compose, lensProp, mergeWithKey, over } from 'ramda'

export function overChildrenHoc<P extends { children: React.ComponentType }, C>(
  fn: SamePropsHoc<C>
) {
  return over(lensProp('children'), fn) as (
    value: P
  ) => Merge<
    P,
    {
      children: React.ComponentType<C>
    }
  >
}

export function createChildren<
  P extends { children: React.ComponentType<C> },
  C
>(
  { children, ...rest }: P,
  {
    whenConflict = (_k, l) => l
  }: {
    whenConflict?: (k: string, l: C, r: Omit<P, 'children'>) => C
  } = {}
) {
  return function (props: C) {
    const finalProps = mergeWithKey(whenConflict, props, rest)
    return React.createElement(children, finalProps)
  }
}

export function mapSameProps<T extends Mappable<C>, C>(items: T[]) {
  return function (props: C) {
    return React.createElement(
      React.Fragment,
      undefined,
      items.map((c) => createChildren(c)(props))
    )
  }
}

export interface Mappable<P = any> {
  key: React.Key
  children: React.ComponentType<P>
}

export function mapHoc<T extends Mappable>(
  items: T[],
  firstHoc: SamePropsHoc<T>,
  ...hocArray: SamePropsHoc<any>[]
) {
  return mapSameProps<
    Merge<
      T,
      {
        children: React.ComponentType<T>
      }
    >,
    Omit<T, keyof Mappable>
  >(
    items.map(
      overChildrenHoc(
        // @ts-ignore
        hocArray.length ? compose(firstHoc, ...hocArray) : firstHoc
      )
    )
  )
}
