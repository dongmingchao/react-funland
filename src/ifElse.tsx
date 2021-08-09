import React from 'react'

export function ifElse<P>(
  predicate: (p: P) => boolean | undefined | null,
  ThenCom: React.ComponentType<P>,
  BaseCom: React.ComponentType<P>
): React.FunctionComponent<P> {
  return function (props) {
    if (predicate(props)) {
      return <ThenCom {...props} />
    }
    return <BaseCom {...props} />
  }
}
