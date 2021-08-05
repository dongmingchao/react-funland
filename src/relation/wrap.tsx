import React from 'react'

function _wrapSameProps<P>(
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

export function wrapSameProps<P>(
  Com: React.ComponentType<P>
): (Wrapped: React.ComponentType<P>) => React.ComponentType<P>
export function wrapSameProps<P>(
  Com: React.ComponentType<P>,
  Wrapped: React.ComponentType<P>
): React.ComponentType<P>
export function wrapSameProps<P>(
  Com: React.ComponentType<P>,
  Wrapped?: React.ComponentType<P>
):
  | ((Wrapped: React.ComponentType<P>) => React.ComponentType<P>)
  | React.ComponentType<P> {
  if (Wrapped === undefined) {
    return function (Wrap: React.ComponentType<P>) {
      return _wrapSameProps(Com, Wrap)
    }
  }
  return _wrapSameProps(Com, Wrapped)
}
