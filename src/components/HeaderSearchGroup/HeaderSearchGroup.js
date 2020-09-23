import React from 'react'
import '../../style/css.scss'

export const HeaderSearchGroup = (props) => {
  return (
    <div className="btn-header-list">
      {props.children}
    </div>
  )
}

export const HeaderSearchItem = (props) => {
  return (
    <div className="item">
      {props.children}
    </div>
  )
}
