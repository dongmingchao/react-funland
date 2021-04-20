import React, {useState} from 'react'
import {Button, Card, Form, FormItemProps, Input, InputNumber, Switch} from 'antd'
import {ifElse, mapHoc, oProps, SamePropsHoc, wrapSameProps, Mappable, Merge} from 'react-funland'
import {dissoc, partial, partialRight, propOr, when} from 'ramda'

interface FinalProps extends Merge<FormItemProps, Mappable> {
  editing?: boolean
}

const showOr = (e: React.ComponentType<FinalProps>) =>
  ifElse((props: FinalProps) => props.editing, e, propOr('---', 'value'))

const editHideRule = when(
  (p: FinalProps) => !p.editing,
  dissoc('rules')
)
const initProps = partialRight(oProps, [dissoc('editing')])

const wrapWithFormItem = partial(wrapSameProps, [
  oProps(initProps(Form.Item), editHideRule)
]) as SamePropsHoc<FinalProps>

const columns: FinalProps[] = [
  {
    label: '账号',
    name: 'account',
    key: 'account',
    rules: [{ required: true }],
    children: Input,
  },
  {
    label: '数字输入',
    name: 'age',
    key: 'age',
    rules: [{ required: true }],
    children: InputNumber,
  },
  {
    label: '备注',
    name: 'remark',
    key: 'remark',
    rules: [{ required: true }],
    children: Input.TextArea,
  }
]

const FinalRow = mapHoc(columns, wrapWithFormItem, showOr, initProps);

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
        <FinalRow editing={editing} />
        <Button htmlType='submit'>提交</Button>
      </Form>
    </Card>
  )
}

export default TestMap
