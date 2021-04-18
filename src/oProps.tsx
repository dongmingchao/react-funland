import React from 'react';
import { compose } from 'ramda';

export function oProps(Com: React.ComponentType, ...fn: Parameters<typeof compose>) {
  let finalFn: any = fn[0];
  if (fn.length > 1) {
    finalFn = compose(...fn);
  }
  return function (props: any) {
    return <Com {...finalFn(props)} />;
  }
}
