import React, {useState} from 'react'
import {Button, Card, Form, FormItemProps, Input, InputNumber, Switch} from 'antd'
import {ifElse, map, Mappable, ItemComProps, wrap2Props, setProps} from 'react-funland'
import {dissoc, propOr, when} from 'ramda'
import {InputProps} from "antd/es";

interface FinalProps extends Mappable {
  itemProps: FormItemProps
}

function showOr<T extends { editing?: boolean }>(e: React.ComponentType<T>): React.FunctionComponent<T> {
  return ifElse((props) => props.editing, e, propOr('---', 'value'));
}

const editHideRule = when(
  (p: { editing?: boolean }) => !p.editing,
  dissoc('rules')
)

// const initProps = partialRight(oProps, [dissoc('editing')]) as <T>(Com: React.ComponentType<Omit<T, 'editing'>>) => React.ComponentType<T>;

function formItem(editing?: boolean) {
  return function ({rules, ...rest}: FormItemProps) {
    if (editing) return <Form.Item rules={rules} {...rest} />;
    return <Form.Item {...rest} />;
  }
}

// const wrapWithFormItem = wrap2Props(formItem);

const columns: FinalProps[] = [
  {
    key: 'account',
    children({ value, onChange }: InputProps) {
      return <Input value={value} onChange={onChange} />
    },
    itemProps: {
      label: '账号',
      name: 'account',
      rules: [{required: true}],
    }
  },
  {
    key: 'age',
    children: InputNumber,
    itemProps: {
      label: '数字输入',
      name: 'age',
      rules: [{required: true}],
    }
  },
  {
    key: 'remark',
    children: Input.TextArea,
    itemProps: {
      label: '备注',
      name: 'remark',
      rules: [{required: true}],
    }
  }
]

function makeRow(props: ItemComProps<FinalProps, { editing?: boolean }>) {
  return wrap2Props(formItem(props.parent.editing), setProps(showOr(props.value.children), props.parent))({
    outerProps: props.value.itemProps,
    innerProps: {},
  })
}

const FinalRow = map<FinalProps, { editing?: boolean }>(
  columns, makeRow
);

function TestMap() {
  const [editing, setEditing] = useState(false)
  return (
    <Card>
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
        <FinalRow editing={editing}/>
        <Button htmlType='submit'>提交</Button>
      </Form>
    </Card>
  )
}

export default TestMap
