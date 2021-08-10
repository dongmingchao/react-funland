import React from 'react'

export function setProps<P, T extends keyof P>(
  wrapped: React.ComponentType<P>,
  preset: {
    [k in T]: P[k]
  }
): React.FunctionComponent<Omit<P, T>> {
  return function (props: Omit<P, T>) {
    return React.createElement(wrapped, {
      ...props,
      ...preset
    } as P)
  }
}
