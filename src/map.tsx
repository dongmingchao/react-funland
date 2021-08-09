import React, { useContext } from 'react'
import { Merge, SamePropsHoc } from './utilsType'
import { compose, lensProp, mergeWithKey, over } from 'ramda'
import { Fragment } from './Empty'

export function overChildrenHoc<P extends { children: React.ComponentType }, C>(
  fn: SamePropsHoc<C>
): (
  value: P
) => Merge<
  P,
  {
    children: React.ComponentType<C>
  }
> {
  // @ts-ignore
  return over(lensProp('children'), fn)
}

export interface Mappable<P = any> {
  key: React.Key
  children: P
}

export interface ItemComProps<T, C = undefined> {
  value: T
  index: number
  all: T[]
  parent: C
}

export function map<T extends { key: React.Key }, C>(
  items: T[],
  ItemCom: React.ComponentType<ItemComProps<T, C>>,
  ParentCom: React.ComponentType<C> = Fragment
): React.FunctionComponent<C> {
  return function (props) {
    return React.createElement(
      ParentCom,
      props,
      items.map((t, i, all) =>
        React.createElement(ItemCom, {
          key: t.key,
          value: t,
          index: i,
          all,
          parent: props
        })
      )
    )
  }
}
