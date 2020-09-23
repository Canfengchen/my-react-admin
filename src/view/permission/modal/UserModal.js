import React, { Component } from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd'

import {
  addUser,
  updateUser,
  getUserOne
} from '@/api/user'

const {Option} = Select

const formItemLayout = {
  labelCol: { span: 4 },
};

class UserModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      formData: {
        id: '',
        userName: '',
        phone: '',
        position: '',
        name: '',
        roleId: ''
      },
      title: '',
      isShow: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const {id, action} = nextProps.setting
    if (id) {
      this.getOne(id, action)
    } else if (action) {
      this.setState({
        isShow: true,
        title: this.getTitle(action)
      })
    }
  }

  getTitle = (action) => {
    switch (action) {
      case 'add':
        return '新增用户'
      case 'edit':
        return '编辑用户'
    }
  }

  onCancel = () => {
    this.setState({
      formData: {
        id: '',
        userName: '',
        phone: '',
        position: '',
        name: '',
        roleId: ''
      },
      isShow: false
    })
    this.props.onCancel()
  }
  submit = () => {
    this.refs['formData'].submit()
  }
  onFinish = (values) => {
    const { userName, phone, position, name, roleId } = values
    const data = {userName, phone, position, name, roleId }
    if (this.props.setting.action === 'add') {
      this.add(data)
    } else {
      data.id = this.state.formData.id
      this.update(data)
    }
  }
  add = (data) => {
    addUser(data).then(res => {
      if (res.code === 0) {
        message.success('保存成功')
        this.props.getList()
        this.props.onCancel()
        this.onCancel()
      } else if (res.code === -1){
        message.error(res.msg)
      } else {
        message.error('系统繁忙')
      }
    })
  }

  update = (data) => {
    updateUser(data).then(res => {
      if (res.code === 0) {
        message.success('保存成功')
        this.props.getList()
        this.onCancel()
      } else if (res.code === -1){
        message.error(res.msg)
      } else {
        message.error('系统繁忙')
      }
    })
  }
  getOne = (id, action) => {
    getUserOne({id}).then(res => {
      if (res.code === 0) {
        this.setState({
          formData: JSON.parse(JSON.stringify(res.data)),
          isShow: true,
          title: this.getTitle(action)
        })
      } else {
        message.error('系统繁忙')
      }
    })
  }

  render () {
    return (
      <Modal
        visible={this.state.isShow}
        title={this.state.title}
        maskClosable={false}
        closable={false}
        destroyOnClose={true}
        footer={[
          <Button type="primary" key="bt1" onClick={this.submit}>
            保存
          </Button>,
          <Button key="bt2" onClick={this.onCancel}>
            取消
          </Button>,
        ]}
      >
        <Form
          ref="formData"
          name="formData"
          onFinish={this.onFinish}
          initialValues={this.state.formData}
        >
          <Form.Item
            name="userName"
            label="账号"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色分组"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Select>
              {this.props.roleData.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    )
  }
}

export default UserModal
