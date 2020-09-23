import React, { Component } from 'react';
import { Card, Button, Table, Popconfirm, message } from 'antd';
import '@/style/css.scss'
import {
  getAuthList,
  delAuth
} from '@/api/permission'

import AuthModal from './modal/AuthModal'


function AuthTable (props) {

  const columns = [
    {
      title: '权限名称',
      dataIndex: 'title',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: status => <div>{status * 1 === 1 ? '正常' : '停用'}</div>
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 180,
      render: (text, record) =>{
        return (
          <div>
            <Button type="primary" size="small" className="mr10" onClick={() => props.editClick(record.id)}>编辑</Button>
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
      }
    }
  }

  componentDidMount () {
    this.getList()
  }

  getList = () => {
    // this.cancelModal()
    getAuthList({}).then(res => {
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
    console.log(this.state.modalSetting)
  }

  onCancel = () => {
    this.setState({
      modalSetting: {
        id: '',
        action: ''
      }
    })
  }



  delClick = (id) => {
    delAuth({id}).then(res => {
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
      <Card title='权限管理' extra={<Button onClick={this.addClick}>新增</Button>}>
        <AuthTable data={this.state.tableData} handleDelete={this.delClick} editClick={this.editClick}/>
        <AuthModal setting={this.state.modalSetting} getList={this.getList} onCancel={this.onCancel} treeData={this.state.tableData}></AuthModal>
      </Card>
    )
  }
}

export default UserManager
