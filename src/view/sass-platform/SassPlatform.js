import React, { Component } from 'react'
import css from './SassPlatform.module.scss'
import SassCard from './SassCard'
import permission from '@/assets/images/sass-platform/permission.png'
import permissionActive from '@/assets/images/sass-platform/permission-active.png'
import system from '@/assets/images/sass-platform/system.png'
import systemActive from '@/assets/images/sass-platform/system-active.png'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '@/redux/assistant'

function getState(state) {
// 传入多个模块文件名称
  return mapStateToProps(state, ['app'])
}

function getAction(dispatch) {
// 传入多个模块action
  return mapDispatchToProps(dispatch, ['appActions'])
}

class SassPlatform extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cardList: [
        {
          title: '权限管理',
          imgPic: `url(${permission})`,
          imgPicActive: `url(${permissionActive})`,
          desktop: 'permission'
        },
        {
          title: '管理系统',
          imgPic: `url(${system})`,
          imgPicActive: `url(${systemActive})`,
          desktop: 'system'
        }
      ]
    }
  }

  toDeskTop = (card) => {
    this.props.setDeskTop(card.desktop)
    this.props.history.push('/home')
  }

  render () {
    return (
      <div className={css['container']}>
        <div className={css['main']}>
          <div className={css['system-title']}>物联网平台</div>
          <SassCard cardList={this.state.cardList} onClick={this.toDeskTop}></SassCard>
        </div>
      </div>
    )
  }
}

export default connect(getState, getAction)(withRouter(SassPlatform))
