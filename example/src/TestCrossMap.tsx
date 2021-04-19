import React, { useCallback, useState } from 'react'
import { Form, Input, Button, Card, Space, Switch, Skeleton } from 'antd'
import 'antd/dist/antd.css'
import { ifElse, crossMap } from 'react-funland'
import { partial } from 'ramda'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
}

type AppendPropsHoc<A> = <E>(
  t2: React.ComponentType<E>
) => React.ComponentType<A & E>

const ifValueNotExist = partial(ifElse, [
  (p: { value: any }) => !p.value,
  () => <span>value is not exist!</span>
]) as <T>(
  a: React.ComponentType<{ value: T }>
) => React.ComponentType<{ value?: T }>

const ifEdit = partial(ifElse, [(p: { editing: boolean }) => p.editing]) as <
  A,
  B
>(
  then: React.ComponentType<A>,
  base: React.ComponentType<B>
) => React.ComponentType<A & B & { editing: boolean }>

const ifLoading = partial(ifElse, [
  (p: { loading: boolean }) => p.loading,
  () => <Skeleton.Input active style={{ width: '300px' }} />
]) as AppendPropsHoc<{ loading: boolean }>

function Base({ value }: { value: string }) {
  return <span>基础功能组件, value = {value}</span>
}

const FormItem = crossMap(Form.Item, [
  {
    name: 'account',
    label: '账号',
    children: ifEdit(Input, ifLoading(ifValueNotExist(Base))),
    rules: [{ required: true }]
  },
  {
    name: 'age',
    label: '年龄',
    children: ifEdit(Input, ifLoading(ifValueNotExist(Base)))
  },
  {
    name: 'email',
    label: '邮箱',
    children({ testA }: { testA?: number }) {
      return <span>{testA}</span>
    }
  }
])

const App = () => {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = useCallback((e) => {
    console.log('submit', e)
  }, [])
  return (
    <Card style={{ width: '50%' }}>
      <Space>
        <span>
          Loading
          <Switch
            checked={loading}
            onChange={setLoading}
            checkedChildren='开启'
            unCheckedChildren='关闭'
          />
        </span>
        <span>
          编辑
          <Switch
            checked={editing}
            onChange={setEditing}
            checkedChildren='开启'
            unCheckedChildren='关闭'
          />
        </span>
      </Space>
      <Form {...formItemLayout} onFinish={handleSubmit}>
        <FormItem loading={loading} editing={editing} />
        <Button htmlType='submit'>提交</Button>
      </Form>
    </Card>
  )
}

export default App
