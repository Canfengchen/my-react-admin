import React, { Component } from 'react'
import { Modal, Button, Form, Input, message } from 'antd'

import {
  addRole,
  updateRole,
  getRoleInfo
} from '@/api/permission'

const formItemLayout = {
  labelCol: { span: 4 },
};

class RoleModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      formData: {
        id: '',
        roleName: '',
        remark: ''
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
        return '新增角色'
      case 'edit':
        return '编辑角色'
    }
  }

  onCancel = () => {
    this.setState({
      formData: {
        id: '',
        roleName: '',
        access: []
      },
      isShow: false
    })
    this.props.onCancel()
  }
  submit = () => {
    this.refs['formData'].submit()
  }
  onFinish = (values) => {
    const { roleName, remark } = values
    const data = { roleName, remark}
    if (this.props.setting.action === 'add') {
      this.add(data)
    } else {
      data.id = this.state.formData.id
      this.update(data)
    }
  }
  add = (data) => {
    addRole(data).then(res => {
      if (res.code === 0) {
        message.success('保存成功')
        this.props.getList()
        this.props.onCancel()
        this.onCancel()
      } else {
        message.error('系统繁忙')
      }
    })
  }

  update = (data) => {
    updateRole(data).then(res => {
      if (res.code === 0) {
        message.success('保存成功')
        this.props.getList()
        this.onCancel()
        this.props.onCancel()
      } else {
        message.error('系统繁忙')
      }
    })
  }
  getOne = (id, action) => {
    getRoleInfo({id}).then(res => {
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
            name="roleName"
            label="分组名称"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="remark"
            label="具体描述"
            rules={[{ required: true }]}
            {...formItemLayout}
          >
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }}/>
          </Form.Item>
        </Form>
      </Modal>

    )
  }
}

export default RoleModal
