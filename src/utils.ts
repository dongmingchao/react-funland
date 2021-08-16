export type Curry2<A, B, C> = {
  (a: A, b: B): C
  (a: A): (b: B) => C
}

export function curry2<A, B, C>(base: (a: A, b: B) => C) {
  function upgrade(a: A): (b: B) => C
  function upgrade(a: A, b: B): C
  function upgrade(a: A, b?: B): ((b: B) => C) | C {
    if (b === undefined) {
      return (b: B) => base(a, b)
    }
    return base(a, b)
  }

  return upgrade
}

export type Curry3<A, B, C, D> = {
  (a: A, b: B, c: C): D
  (a: A, b: B): (c: C) => D
  (a: A): Curry2<B, C, D>
}

export function curry3<A, B, C, D>(
  base: (a: A, b: B, c: C) => D
): Curry3<A, B, C, D> {
  function upgrade(a: A, b: B, c: C): D
  function upgrade(a: A, b: B): (c: C) => D
  function upgrade(a: A): Curry2<B, C, D>
  function upgrade(a: A, b?: B, c?: C) {
    if (b === undefined) {
      return curry2<B, C, D>((b, c) => base(a, b, c))
    }
    if (c === undefined) {
      return (c: C) => base(a, b, c)
    }
    return base(a, b, c)
  }
  return upgrade
}

export function fold<R>(starter: R, reducers: Array<(f: R) => R>) {
  return reducers.reduce(
    (previousValue, currentValue) => currentValue(previousValue),
    starter
  )
}
