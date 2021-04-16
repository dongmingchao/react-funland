import React, { useState } from 'react'
import { map } from 'react-funland'
import { Form, Input, Button, Card, Switch, FormItemProps } from 'antd'
import 'antd/dist/antd.css'
import { compose } from 'ramda'

// function rest(
//   com: (...oargs: any[]) => any,
//   handle: (...oargs: any[]) => any[]
// ) {
//   return function (...args: any[]) {
//     return com(...handle(args))
//   }
// }

const FinalItem = compose(
  Form.Item,
  ({ editing, ...rest }: FormItemProps & { editing: boolean }) => {
    return {
      ...rest,
      name: 'account',
      rules: editing ? [{ required: true }] : [],
      label: '账号'
    }
  }
)

const TestItem2 = map(
  [
    {
      name: 'account',
      children: <Input />,
      itemCom: FinalItem
    },
    {
      name: 'age',
      children: <Input />,
      itemCom({ editing }: { editing: boolean }) {
        return <span>{editing ? '编辑中' : '不编辑'}</span>
      }
    }
  ],
  {
    defaultChildCom: Form.Item as React.ComponentType<
      FormItemProps & { editing: boolean }
    >
  }
)

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
        <TestItem2 editing={editing} />
        <Button htmlType='submit'>提交</Button>
      </Form>
    </Card>
  )
}

export default TestMap
