import React from 'react'
import { SamePropsHoc } from './utilsType'

export const hocInspectProps: SamePropsHoc<any> = (c) => {
  return function (props: any) {
    console.log('props', props)
    return React.createElement(c, props)
  }
}
