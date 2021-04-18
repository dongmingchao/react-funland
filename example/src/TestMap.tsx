import React, { useState } from 'react'
import {Input, Form, Card, Switch, Button, FormItemProps} from "antd";
import { Empty, ifElse, PickComponentTypeProps, SamePropsHoc, oProps } from 'react-funland';
import { omit, propOr, mergeWithKey, partial, when, partialRight } from 'ramda';

interface FinalProps extends FormItemProps {
  key?: React.Key
  editing?: boolean
}

const showOr = (e: React.ComponentType<FinalProps>) => ifElse((props: FinalProps) => props.editing, e, propOr('---', 'value'));

function makeChildrenNode<T extends { children?: React.ComponentType<C> }, C = PickComponentTypeProps<T["children"]>>(
  items: T[],
  { defaultCom = Empty,
    whenConflict = (_k, l) => l
  }: {
    defaultCom?: React.ComponentType<C>,
    whenConflict?: (k: string, l: C, r: Omit<T, 'children'>) => C,
  } = {},
): React.ComponentType<C> {
  return function (props: C) {
    return <>{items.map(({ children = defaultCom, ...rest }) => {
      const finalProps = mergeWithKey(whenConflict, props, rest);
      return React.createElement(children, finalProps);
    })}</>;
  }
}

function wrapSameProps<P>(Com: React.ComponentType<P>, Wrapped: React.ComponentType<P>) {
  return function (props: P) {
    return (
      <Com {...props}>
        <Wrapped {...props} />
      </Com>
    )
  }
}

const editHideRule = when((p: FinalProps) => !p.editing, ({ rules, ...rest}) => rest);
const initProps = partialRight(oProps, [
  omit(['editing']),
]);

// @ts-ignore
const wrapWithFormItem = partial(wrapSameProps, [oProps(initProps(Form.Item), editHideRule)]) as SamePropsHoc<FinalProps>;

const columns: FinalProps[] = [{
  label: '账号',
  name: 'account',
  key: 'account',
  rules: [{ required: true }],
},{
  label: '邮箱',
  name: 'email',
  key: 'email',
  rules: [{ required: true }],
},{
  label: '昵称',
  name: 'nick',
  key: 'nick',
  rules: [{ required: true }],
}]

const finalItem = showOr(initProps(Input));

// @ts-ignore
const FinalRow = makeChildrenNode(columns, {
  defaultCom: wrapWithFormItem(finalItem)
});

function TestMap() {
  const [editing, setEditing] = useState(false)
  return <Card>
    <span>
      编辑
      <Switch
        checked={editing}
        onChange={setEditing}
        checkedChildren='开启'
        unCheckedChildren='关闭'
      />
    </span>
    <Form onFinish={console.log}>
      <FinalRow editing={editing} />
      <Button htmlType="submit">提交</Button>
    </Form>
  </Card>
}

export default TestMap;
