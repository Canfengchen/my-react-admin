import React, { Component } from 'react'
import css from './NavHeader.module.scss'
import {
  MenuUnfoldOutlined,
  DownOutlined,
  SwapOutlined
} from '@ant-design/icons';
import { Breadcrumb, Menu, Dropdown, Button, Tag } from 'antd';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from '@/redux/assistant'
import {
  setToken
} from '@/libs/utils'

function getState(state) {
// 传入多个模块文件名称
  return mapStateToProps(state, ['user', 'app'])
}

function getAction(dispatch) {
// 传入多个模块action
  return mapDispatchToProps(dispatch, ['userActions'])
}

function changeMenu (menu) {
  if (menu.key === '1') {
    setToken('')
    window.location.href = '/login'
  }
}

const menu = (
  <Menu onClick={(menu) => changeMenu(menu)}>
    <Menu.Item key="0">
      修改密码
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      退出登录
    </Menu.Item>
  </Menu>
)

function routeToBreadcrumb (routes) {
  return routes.map(route => {
    return (<Breadcrumb.Item key={route.path}>{route.title}</Breadcrumb.Item>)
  })
}



class NavHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tagList: [
        {
          name: 'saas平台',
          path: '/sass-platform'
        },
        {
          name: 'saas平台',
          path: '/sass-platform'
        },
      ]
    }
  }

  toPlatform = () => {
    this.props.history.push("/sass-platform");
  }

  tagViews =() => {
    return this.state.tagList.map((tag, key) => {
      return (
        <Tag closable key={key}>
          {tag.name}
        </Tag>
      )
    })
  }


  render () {
    return (
      <div className={css['container']}>
        <div className={css['navbar']}>
          <MenuUnfoldOutlined className={css['collapsed-icon']} onClick={() => { this.props.toggleCollapsed() }}/>
          <Breadcrumb className={css['breadcrumb']}>
            {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
            {routeToBreadcrumb(this.props.breadcrumbList)}
          </Breadcrumb>
          <div className={css['right-menu']}>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {this.props.userName} <DownOutlined />
              </a>
            </Dropdown>

            <Button  icon={<SwapOutlined />} onClick={() => this.toPlatform()}>切换</Button>

          </div>


        </div>

        <div className={css['tag-view']}>
          {this.tagViews()}
        </div>

      </div>
    )

  }
}
export default connect(getState, getAction)(withRouter(NavHeader))
