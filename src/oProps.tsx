import React from 'react'
import { compose } from 'ramda'

export function oProps(
  Com: React.ComponentType,
  ...fn: Array<(r: any) => any>
): React.ComponentType {
  let finalFn: any = fn[0]
  if (fn.length > 1) {
    // @ts-ignore
    finalFn = compose(...fn)
  }
  return function (props: any) {
    return <Com {...finalFn(props)} />
  }
}
