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

export function wrap2Props<A, B>(
  Com: React.ComponentType<A>,
  Wrapped: React.ComponentType<B>
): React.FunctionComponent<{
  outerProps: A
  innerProps: B
}> {
  return function ({ outerProps, innerProps }) {
    return (
      <Com {...outerProps}>
        <Wrapped {...innerProps} />
      </Com>
    )
  }
}
