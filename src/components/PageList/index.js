import { Pagination } from 'antd'
import React from 'react'
import css from './PageList.module.scss'

export const PageList = (props) => {
  return (
    <Pagination
      className={css['page-list']}
      size={props.size}
      total={props.page.total}
      current={props.page.current}
      showSizeChanger
      showQuickJumper
      onChange={props.onChange}
      onShowSizeChange={props.onShowSizeChange}
    />
  )
}
