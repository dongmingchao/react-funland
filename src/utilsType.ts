import React from 'react'

export type SamePropsHoc<P> = (
  i: React.ComponentType<P>
) => React.ComponentType<P>

export type BiPropsHoc<I, O> = (
  i: React.ComponentType<I>
) => React.ComponentType<O>

export type PickComponentTypeProps<T> = T extends React.ComponentType<infer P>
  ? P
  : any

export type Merge<A, B> = Omit<A, keyof B> & B

export type PartialPart<P, T extends keyof P> = Omit<P, T> &
  {
    [k in T]?: P[k]
  }
