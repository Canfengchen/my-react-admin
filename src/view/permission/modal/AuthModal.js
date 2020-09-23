import React, { Component } from 'react'
import { Modal, Button, Form, Input, TreeSelect, message } from 'antd'

import {
  addAuth,
  updateAuth,
  getAuthOne
} from '@/api/permission'

const formItemLayout = {
  labelCol: { span: 4 },
};

class AuthModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      formData: {
        id: '',
        parentId: '',
        title: '',
        access: ''
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
        return '新增权限'
      case 'edit':
        return '编辑权限'
    }
  }

  onCancel = () => {
    this.setState({
      formData: {
        id: '',
        parentId: '',
        title: '',
        access: ''
      },
      isShow: false
    })
    this.props.onCancel()
  }
  submit = () => {
    this.refs['formData'].submit()
  }
  onFinish = (values) => {
    const { parentId, title, access } = values
    const data = {parentId, title, access}
    if (this.props.setting.action === 'add') {
      this.add(data)
    } else {
      data.id = this.state.formData.id
      this.update(data)
    }
  }
  add = (data) => {
    addAuth(data).then(res => {
      if (res.code === 0) {
        message.success('保存成功')
        this.props.getList()
        this.onCancel()
      } else {
        message.error('系统繁忙')
      }
    })
  }

  update = (data) => {
    updateAuth(data).then(res => {
      if (res.code === 0) {
        message.success('保存成功')
        this.props.getList()
        this.onCancel()
      } else {
        message.error('系统繁忙')
      }
    })
  }
  getOne = (id, action) => {
    getAuthOne({id}).then(res => {
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
            name="parentId"
            label="父级权限"
            {...formItemLayout}
          >
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={this.props.treeData}
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            name="title"
            label="权限名称"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="access"
            label="权限链接"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>

    )
  }
}

export default AuthModal
