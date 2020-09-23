import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {
  constRoutes,
  constSiderRoutes,
  redirectRoutes
} from '@/router/router'
// import permissionRoutes from '@/router/modules/permission'
import {
  setToken,
  getToken,
  getDeskTop,
  getAccessRoutes
} from '@/libs/utils'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '@/redux/assistant'
import { getUserInfo } from '@/api/user'
function getState(state) {
// 传入多个模块文件名称
  return mapStateToProps(state, ['user', 'app'])
}

function getAction(dispatch) {
// 传入多个模块action
  return mapDispatchToProps(dispatch, ['userActions', 'appActions'])
}

function RouteWithSubRoutes(route) {
  if (route.redirect) {
    return (
      <Redirect
        from={route.path}
        to={{
          pathname: route.redirect
        }}
      />
    )
  }
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} >
          {
            route.routes &&  route.routes.map((route2, i) => {
              if (i === 0 && props.match.isExact) {
                return (
                  <div key={i}>
                    <Redirect strict from={route.path} to={route2.path}></Redirect>
                    <RouteWithSubRoutes {...route2} exact/>
                  </div>
                )
              }
              return <RouteWithSubRoutes key={i} {...route2} exact/>
            })
          }
        </route.component>
      )}
    >
    </Route>
  );
}

class App extends Component{
  componentDidMount () {
    // 页面刷新
    if(window.location.pathname !== '/login' && this.props.userName === ''){
      if (getToken()) {
        this.getUserInfo(getToken())
        this.props.setDeskTop(getDeskTop())
      } else {
        window.location.href ='/login'
      }
    }
  }

  getUserInfo = (token) => {
    getUserInfo({token}).then(res => {
      if (res.code === 0) {
        const { token, userName, id, access } = res.data
        setToken(token)
        this.props.setUserId(id)
        this.props.setUserName(userName)
        this.props.setAccess(access.split(','))
      }
    })
  }
  deskTopRoute = (desktop, access) => {
    let routes = constRoutes
    if (desktop) {
      routes = [...routes, ...getAccessRoutes(desktop, access)]
    }
    routes = [...routes, ...redirectRoutes]
    return routes
  }

  render () {
    return (
      <Router>
        <Switch>
          {this.deskTopRoute(this.props.desktop, this.props.access).map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default connect(getState, getAction)(App);
