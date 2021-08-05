import React from 'react'

export function oProps<A, B>(
  Com: React.ComponentType<A>,
  fn: (a: B) => A
): React.ComponentType<B> {
  return function (props: B) {
    return <Com {...fn(props)} />
  }
}
