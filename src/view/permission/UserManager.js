import React, { Component } from 'react';
import { Form, Card, Button, Input, Select, Table, Popconfirm, message } from 'antd';
import css from './UserManager.module.scss';
import '@/style/css.scss'
import {
  getUserList,
  updateUser,
  delUser
} from '@/api/user'
import {
  getRoleList
} from '@/api/permission'
import config from '../../config'
import {
  PageList
} from '@/components/PageList'
import UserModal from './modal/UserModal'

const { Option } = Select


function HeaderList (props) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={(value) => props.onSearch(value)}
      colon={false}
      initialValues={{
        roleId: "",
        status: ""
      }}
      className={css['header-list']}
    >
      <Form.Item
        name="userName"
        label="账号"
      >
        <Input placeholder="账号" style={{ width: 120 }}/>
      </Form.Item>
      <Form.Item
        name="name"
        label="姓名"
      >
        <Input placeholder="姓名" style={{ width: 120 }}/>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色分组"
      >
        <Select style={{ width: 120 }}>
          <Option value="">全部</Option>
          {props.roleData.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label="状态"
      >
        <Select style={{ width: 120 }}>
          <Option value="">全部</Option>
          <Option value="0">停用</Option>
          <Option value="1">正常</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
    </Form>
  )
}



function UserTable (props) {

  const columns = [
    {
      title: '账号',
      dataIndex: 'userName',
      align: 'center',
      width: 150
    },
    {
      title: '手机',
      dataIndex: 'phone',
      align: 'center',
      width: 120
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 80
    },
    {
      title: '职位',
      dataIndex: 'position',
      align: 'center',
      width: 110
    },
    {
      title: '角色分组',
      dataIndex: 'roleName',
      align: 'center',
      width: 110
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 120,
      render: createTime => {
        const time = config.$moment(createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        return (<div>{time}</div>)
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render: status => <div>{status * 1 === 1 ? '正常' : '停用'}</div>
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 290,
      render: (text, record) =>{
        return (
          <div>
            <Button type="primary" size="small" className="mr10" onClick={() => props.editClick(record.id)}>修改</Button>
            <Popconfirm title="确认停用该用户?" onConfirm={() => props.changeStatus(record.id, record.status)}>
              <Button type="warning" size="small" className="mr10">{record.status * 1 === 1 ? '停用' : '启用'}</Button>
            </Popconfirm>
            <Popconfirm title="确认删除该用户?" onConfirm={() => props.handleDelete(record.id)}>
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
      page: {
        current: 1,
        total: 0,
        limit: 10,
        userName: '',
        name: '',
        role: '',
        status: ''
      },
      tableData: [],
      modalSetting: {
        id: '',
        action: ''
      },
      roleData: []
    }
  }

  componentDidMount () {
    this.getList()
    this.getRoleList()
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

  changeStatus = (id, status) => {
    // 改变账号状态逻辑
    const data = {
      id,
      status: status * 1 === 1 ? 0 : 1
    }
    updateUser(data).then(res => {
      if (res.code === 0) {
        message.success('修改成功')
        this.getList()
      } else {
        message.error('系统繁忙')
      }
    })
  }

  handleDelete = (id) => {
    // 删除逻辑
    delUser({id}).then(res => {
      if (res.code === 0) {
        message.success('删除成功')
        this.getList()
      } else {
        message.error('系统繁忙')
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

  getRoleList = () => {
    getRoleList({}).then(res => {
      if (res.code === 0) {
        this.setState({
          roleData: res.data
        })
      } else {
        message.error('系统繁忙')
      }
    })
  }

  getList = () => {
    const { current: page, limit, userName, name, roleId, status } = this.state.page
    getUserList({page, limit, userName, name, roleId, status}).then(res => {
      if (res.code === 0) {
        const page = Object.assign(this.state.page, {total: res.count})
        this.setState({
          tableData: res.data,
          page: page
        })
      } else {
        message.error(res.msg, 2)
      }
    })
  }

  onSearch = (value) => {
    const { userName, name, roleId, status } = value
    const page = Object.assign(this.state.page, { userName, name, roleId, status })
    this.setState({
      page: page
    })
    this.getList()
  }

  changePage = (current, limit) => {
    let data = {}
    if (typeof limit === 'undefined') {
      data = {current}
    } else {
      data = {current, limit}
    }
    const page = Object.assign(this.state.page, data)
    this.setState({
      page: page
    })
    this.getList()
  }


  render () {
    return (
      <Card title='用户管理' extra={<Button onClick={this.addClick}>新增</Button>}>
        <HeaderList onSearch={this.onSearch} roleData={this.state.roleData}/>
        <UserTable data={this.state.tableData} editClick={this.editClick} changeStatus={this.changeStatus} handleDelete={this.handleDelete}/>
        <PageList
          size="small"
          page={this.state.page}
          onChange={this.changePage}
          onShowSizeChange={this.changePage}
        />
        <UserModal roleData={this.state.roleData} setting={this.state.modalSetting} getList={this.getList} onCancel={this.onCancel}></UserModal>
      </Card>
    )
  }
}

export default UserManager
