import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import SIdentify from '@/components/SIdentify/SIdentify'
import { withRouter } from "react-router-dom";
import css from './login.module.css'
import '@/style/css.scss'
import {
  makeCode,
  setToken,
  setDeskTop
} from '@/libs/utils'
import {
  login
} from '@/api/user'
import { connect } from 'react-redux'

import {mapDispatchToProps, mapStateToProps} from '@/redux/assistant'
function getState(state) {
// 传入多个模块文件名称
  return mapStateToProps(state, ['user'])
}

function getAction(dispatch) {
// 传入多个模块action
  return mapDispatchToProps(dispatch, ['userActions'])
}

class NormalLoginForm extends Component{
  constructor (props) {
    super(props);
    this.state = {
      code: '',
      loading: false
    }
  }

  componentDidMount() {
    this.changeIdentifyCode()
    setToken('')
    setDeskTop('')
  }

  onFinish = (values) => {
    // console.log('Received values of form: ', values);
    const { userName, password } = values
    this.setState({
      loading: true
    })
    login({userName, password}).then(res => {
      if (res.code === 0) {
        const { token, userName, id, access } = res.data
        setToken(token)
        this.props.setUserId(id)
        this.props.setUserName(userName)
        this.props.setAccess(access.split(','))
        message.success('登录成功', 2)
        this.props.history.push('/sass-platform')
      } else {
        message.error(res.msg, 2)
        this.setState({
          loading: false
        })
      }
    }).catch(() => {
      this.setState({
        loading: false
      })
    })
  }

  changeIdentifyCode = () => {
    const code = makeCode(4)
    this.setState({
      code: code
    })
  }

  validateCode = (rule, value) => {
    if (!value) {
      return Promise.reject('请输入验证码!')
    } else if (value !== this.state.code) {
      return Promise.reject('验证码输入错误!')
    } else {
      return Promise.resolve()
    }
  }



  render () {
    return (
      <div className={`${css['login-container']} login`}>
        <div className={css['login-main']}>
          <div className={css['login-title']}>物联网平台</div>
          <Form
            name="normal_login"
            className={css['login-form']}
            initialValues={{
              userName: 'admin',
              password: '123456'
            }}
            onFinish={this.onFinish}
          >
            <div className={css['form-title']}>用户登录</div>
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: '请输入你的账号!',
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码!'
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>


            <Form.Item
              name="code"
              rules={[
                {
                  validator: this.validateCode
                },
              ]}
              validateTrigger='onBlur'
            >
            <Row gutter={16}>
              <Col className="gutter-row" span={14}>
                <Input className="ant-input-affix-wrapper" placeholder="验证码" />
              </Col>
              <Col className="gutter-row" span={10}>
                <SIdentify code={this.state.code} onClick={this.changeIdentifyCode}></SIdentify>
              </Col>
            </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={css['login-form-button']} loading={this.state.loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

};

export default connect(getState, getAction)(withRouter(NormalLoginForm));
