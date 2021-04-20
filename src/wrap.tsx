import React from 'react'

export function wrapSameProps<P>(
  Com: React.ComponentType<P>,
  Wrapped: React.ComponentType<P>
) {
  return function (props: P) {
    return (
      <Com {...props}>
        <Wrapped {...props} />
      </Com>
    )
  }
}
