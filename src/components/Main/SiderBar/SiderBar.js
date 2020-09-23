import React, { Component } from 'react'
import { Menu } from 'antd';
import {
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import css from './SiderBar.module.scss'
import {
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import {
  mapStateToProps,
  mapDispatchToProps
} from '@/redux/assistant'
import {
  getAccessRoutes,
  getDesktopRoutes
} from '@/libs/utils'

function getState(state) {
// 传入多个模块文件名称
  return mapStateToProps(state, ['app','user'])
}


function getAction(dispatch) {
// 传入多个模块action
  return mapDispatchToProps(dispatch, ['appActions'])
}

const { SubMenu } = Menu;


function routeToMenu (routeList) {
  return routeList.map(router => {
    if (router.routes.length > 1) {
      return (
        <SubMenu
          key={router.path}
          title={
            <span>
              <MailOutlined />
              <span>{router.title}</span>
            </span>
          }
          >
          {
            router.routes.map(router2 => {
              if (router2.routes) {
                return routeToMenu(router2.routes)
              } else {
                return (
                  <Menu.Item key={router2.path}>
                    <PieChartOutlined />
                    <span>{router2.title}</span>
                  </Menu.Item>
                )
              }
            })
          }
        </SubMenu>
      )
    } else if (router.routes) {
      return (
        <Menu.Item key={router.routes[0].path}>
          <PieChartOutlined />
          <span>{router.routes[0].title}</span>
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item key={router.path}>
          <PieChartOutlined />
          <span>{router.title}</span>
        </Menu.Item>
      )
    }
  })
}

class SiderBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentMenu: '',
      currentOpen: []
    }
  }
  componentWillMount () {
    let pathname = this.props.history.location.pathname
    let pathList = pathname.split('/')
    let currentOpen = []
    for (let i = 1; i < pathList.length - 1; i++) {
      currentOpen.push('/' + pathList[i])
    }
    this.setState({
      currentMenu: pathname,
      currentOpen: currentOpen
    })
    this.handleDefaultSelect()
  }

  handleDefaultSelect = () => {
    let url = this.props.location.pathname
    this.getBreadCrumbList(url)
  }

  getBreadCrumbList = (url) => {
    let selectList = []
    let routes = getDesktopRoutes(this.props.desktop)
    const pathname = url.split('/').slice(1)
    pathname.reduce((lastPath, path) => {
      let newPath = `${lastPath}/${path}`
      for (let i in routes) {
        if (routes[i].path === newPath) {
          selectList.push(routes[i])
          routes=routes[i].routes
          break
        }
      }
      return newPath
    }, '')
    this.props.setBreadcrumbList(selectList)
  }

  clickMenu = (menu) => {
    this.props.history.push(menu.key)
    this.getBreadCrumbList(menu.key)
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={this.state.currentMenu}
          defaultOpenKeys={this.state.currentOpen}
          inlineCollapsed={this.props.collapsed}
          className={css.menu}
          onClick={this.clickMenu}
        >
          {
            routeToMenu(getAccessRoutes(this.props.desktop, this.props.access))
          }
        </Menu>
      </div>
    );
  }
}
export default connect(getState, getAction)(withRouter(SiderBar))
