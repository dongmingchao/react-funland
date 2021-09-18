import {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  ReactElement
} from 'react'

export interface HOCDefine<RecProps = any, RetProps = any> {
  (Wrapped: ComponentType<RecProps>): FunctionComponent<RetProps>
  (Wrapped: ComponentType<RecProps>): (
    props: PropsWithChildren<RetProps>
  ) => ReactElement<any, any> | null
}

function reduce<C>(steps: Array<HOCDefine<C, C>>, start: ComponentType<C>) {
  return steps.reduce((previousValue, currentValue) => {
    return currentValue(previousValue)
  }, start)
}
