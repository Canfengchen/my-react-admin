import React, { Component } from 'react'
import css from './Main.module.scss'
import SiderBar from './SiderBar/SiderBar'
import NavHeader from './header/NavHeader'


class Main extends Component{
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false,
      breadList: []
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  // componentDidMount () {
  //   console.log(this.props)
  // }

  render () {
    let container = css['container']
    if (this.state.collapsed) {
      container += ' ' + css['collapse']
    }
    return (
      <div className={container}>
        <div className={css['left']}>
          <SiderBar collapsed={this.state.collapsed}/>
        </div>
        <div className={css['right']}>
          <NavHeader toggleCollapsed={ this.toggleCollapsed }/>
          <div className={css['main']}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

}
export default Main
