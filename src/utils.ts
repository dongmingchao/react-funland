export function curry2<A, B, C>(
  base: (a: A, b: B) => C
): {
  (a: A, b: B): C
  (a: A): (b: B) => C
} {
  function wrapSameProps(a: A): (b: B) => C
  function wrapSameProps(a: A, b: B): C
  function wrapSameProps(Com: A, Wrapped?: B): ((Wrapped: B) => C) | C {
    if (Wrapped === undefined) {
      return function (Wrap: B) {
        return base(Com, Wrap)
      }
    }
    return base(Com, Wrapped)
  }

  return wrapSameProps
}

export function fold<R>(starter: R, reducers: Array<(f: R) => R>) {
  return reducers.reduce(
    (previousValue, currentValue) => currentValue(previousValue),
    starter
  )
}
