import React, { Component } from 'react'
import { Modal, Button, Tree, message } from 'antd'

import {
  getRoleAccess,
  setRoleAccess
} from '@/api/permission'

class RoleAuthModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isShow: false,
      defaultCheckedKeys: [],
      selectKey: [],
      isChange: false // 触发onCheck，selectKey拿到选中节点才设置为true，
    }
  }

  componentWillReceiveProps (nextProps) {
    const { id } = nextProps.setting
    if (id) {
      this.getRoleAccess(id)
    }
  }

  onCancel = () => {
    this.setState({
      isShow: false
    })
    this.props.onCancel()
  }
  submit = () => {
    let data = {
      id: this.props.setting.id,
      access: this.state.selectKey.join(',')
    }
    this.setAuth(data)
  }

  setAuth = (data) => {
    setRoleAccess(data).then(res => {
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

  getRoleAccess = (id) => {
    getRoleAccess({id}).then(res => {
      if (res.code === 0) {
        this.setState({
          defaultCheckedKeys: JSON.parse(JSON.stringify(res.data.access)),
          isShow: true
        })
      } else {
        message.error('系统繁忙')
      }
    })
  }

  onCheck = (checkedKeys, event) => {
    let selectKey = checkedKeys.concat(event.halfCheckedKeys)
    if (!this.state.isChange) {
      // 第一次触发要讲ischange设置为true，保存按钮可点击
      this.setState({
        selectKey: selectKey,
        isChange: true
      })
    } else {
      this.setState({
        selectKey: selectKey
      })
    }
  }

  render () {
    return (
      <Modal
        visible={this.state.isShow}
        title="设置权限"
        maskClosable={false}
        closable={false}
        destroyOnClose={true}
        footer={[
          <Button type="primary" key="bt1" onClick={this.submit} disabled={!this.state.isChange}>
            保存
          </Button>,
          <Button key="bt2" onClick={this.onCancel}>
            取消
          </Button>,
        ]}
      >
        <Tree
          checkable
          onCheck={this.onCheck}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          treeData={this.props.treeData}
        />
      </Modal>

    )
  }
}

export default RoleAuthModal
