import React, { Component } from 'react';
import { Card, Button, Table, Popconfirm, message } from 'antd';
import config from '@/config'
import '@/style/css.scss'
import {
  getRoleList,
  delRole,
  getAuthList
} from '@/api/permission'

import RoleModal from './modal/RoleModal'
import RoleAuthModal from './modal/RoleAuthModal'


function RoleTable (props) {

  const columns = [
    {
      title: '分组名称',
      dataIndex: 'roleName',
      align: 'center',
      width: 250
    },
    {
      title: '具体描述',
      dataIndex: 'remark',
      align: 'center',
      width: 300
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 120,
      render: createdAt => {
        const time = config.$moment(createdAt * 1000).format('YYYY-MM-DD HH:mm:ss')
        return (<div>{time}</div>)
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: status => <div>{status * 1 === 1 ? '正常' : '停用'}</div>
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 230,
      render: (text, record) =>{
        return (
          <div>
            <Button type="primary" size="small" className="mr10" onClick={() => props.editClick(record.id)}>编辑</Button>
            <Button type="primary" size="small" className="mr10" onClick={() => props.editAuth(record.id)}>设置权限</Button>
            <Popconfirm title="确认删除该权限?" onConfirm={() => props.handleDelete(record.id)}>
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      bordered
      rowKey={(record, index) => index}
      pagination={false}
    />
  )
}


class UserManager extends Component{
  constructor (props) {
    super(props);
    this.state = {
      tableData: [],
      modalSetting: {
        id: '',
        action: ''
      },
      modalSetting2: {
        id: ''
      },
      authData: [],
      test: ''
    }
  }

  componentDidMount () {
    this.getList()
    this.getAuthList()
  }

  getAuthList = () => {
    getAuthList({}).then(res => {
      if (res.code === 0) {
        this.setState({
          treeData: res.data
        })
      } else {
        message.error('系统繁忙')
      }
    })
  }

  getList = () => {
    // this.cancelModal()
    getRoleList({}).then(res => {
      if (res.code === 0) {
        this.setState({
          tableData: res.data
        })
      } else {
        message.error('系统繁忙')
      }
    })
  }


  addClick = () => {
    this.setState({
      modalSetting: {
        id: '',
        action: 'add'
      }
    })
  }

  editClick = (id) => {
    this.setState({
      modalSetting: {
        id: id,
        action: 'edit'
      }
    })
  }

  editAuth = (id) => {
    this.setState({
      modalSetting2: {
        id: id
      }
    })
  }

  onCancel = () => {
    this.setState({
      modalSetting: {
        id: '',
        action: ''
      }
    })
  }

  onCancel2 = () => {
    this.setState({
      modalSetting2: {
        id: ''
      }
    })
  }


  delClick = (id) => {
    delRole({id}).then(res => {
      if (res.code === 0) {
        message.success('删除成功')
        this.getList()
      } else {
        message.error('系统繁忙')
      }
    })
  }


  render () {
    return (
      <Card title='分组管理' extra={<Button onClick={this.addClick}>新增</Button>}>
        <RoleTable data={this.state.tableData} handleDelete={this.delClick} editClick={this.editClick} editAuth={this.editAuth}/>
        <RoleModal setting={this.state.modalSetting} getList={this.getList} onCancel={this.onCancel}></RoleModal>
        <RoleAuthModal treeData={this.state.treeData} setting={this.state.modalSetting2} getList={this.getList} onCancel={this.onCancel2}></RoleAuthModal>
      </Card>
    )
  }
}

export default UserManager
