import React, {PropsWithChildren, useState} from 'react'
import {Button, Card, Col, Form, FormItemProps, Input, InputNumber, Row, Switch} from 'antd'
import {ifElse, map, Mappable, ItemComProps, wrap2Props, setProps, oProps, fold} from 'react-funland'
import {dissoc, prop, propOr, splitEvery, when} from 'ramda'
import {ColProps, InputProps} from "antd/es";

interface FinalProps extends Mappable {
  itemProps: FormItemProps
  colProps: ColProps
}

function showOr<T extends { editing?: boolean }>(e: React.ComponentType<Omit<T, 'editing'>>): React.FunctionComponent<T> {
  return ifElse((props) => props.editing, oProps(e, dissoc('editing')), propOr('---', 'value'));
}

const editHideRule = when(
  (p: { editing?: boolean }) => !p.editing,
  dissoc('rules')
)

// const initProps = partialRight(oProps, [dissoc('editing')]) as <T>(Com: React.ComponentType<Omit<T, 'editing'>>) => React.ComponentType<T>;
// const wrapWithFormItem = wrap2Props(formItem);

const columns: FinalProps[] = [
  {
    key: 'account',
    children({value, onChange}: InputProps) {
      return <Input value={value} onChange={onChange}/>
    },
    itemProps: {
      label: '账号',
      name: 'account',
      rules: [{required: true}],
    },
    colProps: {},
  },
  {
    key: 'age',
    children: InputNumber,
    itemProps: {
      label: '数字输入',
      name: 'age',
      rules: [{required: true}],
    },
    colProps: {},
  },
  {
    key: 'remark',
    children: Input.TextArea,
    itemProps: {
      label: '备注',
      name: 'remark',
      rules: [{required: true}],
    },
    colProps: {},
  },
  {
    key: 'desc',
    children: Input.TextArea,
    itemProps: {
      label: '说明',
      name: 'desc',
      rules: [{required: true}],
    },
    colProps: {},
  }
]

function makeCol(props: ItemComProps<FinalProps, { editing?: boolean }>) {
  const ParentCom = oProps<Omit<FormItemProps, 'rules'>, FormItemProps>(Form.Item, p => {
    if (props.parent.editing) return p
    return dissoc('rules', p)
  });
  const ChildCom = setProps(showOr(props.value.children), props.parent);
  const wrapFormItem = wrap2Props(ParentCom, ChildCom)
  const WrapCol = wrap2Props(Col, wrapFormItem);
  return WrapCol({
    outerProps: {
      lg: 12,
      xs: 24,
    },
    innerProps: {
      outerProps: props.value.itemProps,
      innerProps: {}
    }
  })
}

function makeRow(props: ItemComProps<FinalProps[], { editing?: boolean }>) {
  return (
    <Row>
      {map(props.value, makeCol)(props.parent)}
    </Row>
  )
}

const FinalRow = map<FinalProps, { editing?: boolean }>(
  splitEvery(2, columns), makeRow
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
        <Row>
          <Col lg={12} xs={24}>
            <Form.Item name="range" label="范围">
              <Input/>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item name="range" label="范围">
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Button htmlType='submit'>提交</Button>
      </Form>
    </Card>
  )
}

export default TestMap
