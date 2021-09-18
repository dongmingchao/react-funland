import React from 'react'
import { Merge, SamePropsHoc } from './utilsType'
import { lensProp, over, splitEvery } from 'ramda'
import { Fragment } from './Empty'
import { wrap2Props } from './relation/wrap'

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
  item: T
  index: number
  all: T[]
  parent: C
}

function getKey<T extends { key: React.Key }>(t: T | T[]): React.Key {
  if (t instanceof Array) {
    return getKey(t[0])
  }
  return t.key
}

export function map<T extends { key: React.Key }, C>(
  items: T[],
  ItemCom: React.ComponentType<ItemComProps<T, C>>,
  ParentCom?: React.ComponentType<C>
): React.FunctionComponent<C>
export function map<T extends { key: React.Key }, C>(
  items: T[][],
  ItemCom: React.ComponentType<ItemComProps<T[], C>>,
  ParentCom?: React.ComponentType<C>
): React.FunctionComponent<C>
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
          key: getKey(t),
          item: t,
          index: i,
          all,
          parent: props
        })
      )
    )
  }
}

export function makeCol<T>(
  Col: React.ComponentType,
  wrapFormItem: React.FunctionComponent<T>
) {
  return function (props: T) {
    const WrapCol = wrap2Props(Col, wrapFormItem)
    return WrapCol({
      outerProps: {
        style: {
          flexGrow: 1
        }
      },
      innerProps: props
    })
  }
}

export function makeRow<T extends { key: React.Key }, C>(
  Row: React.ComponentType,
  Col: React.ComponentType,
  each: React.FunctionComponent<ItemComProps<T, C>>
) {
  return function ({ item, parent }: ItemComProps<T[], C>) {
    return <Row>{map(item, makeCol(Col, each))(parent)}</Row>
  }
}

export function mapGrid<T extends { key: React.Key }, C>(
  gridComponents: {
    Row: React.ComponentType
    Col: React.ComponentType
  },
  colNumber: number,
  columns: T[],
  ItemCom: React.FunctionComponent<ItemComProps<T, C>>
) {
  return map(
    splitEvery(colNumber, columns),
    makeRow(gridComponents.Row, gridComponents.Col, ItemCom)
  )
}
