import React, { PropsWithChildren } from 'react'

export function Empty() {
  return null
}

export function Fragment({ children }: PropsWithChildren<{}>) {
  return <React.Fragment>{children}</React.Fragment>
}
