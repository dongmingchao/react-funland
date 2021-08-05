import React from 'react'
import { PartialPart } from './utilsType'

export function defaultProps<P, T extends keyof P>(
  wrapped: React.ComponentType<P>,
  preset: {
    [k in T]: P[k]
  }
): React.ComponentType<PartialPart<P, T>> {
  return function (props: PartialPart<P, T>) {
    return React.createElement(wrapped, {
      ...props,
      ...preset
    } as P)
  }
}
