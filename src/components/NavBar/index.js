import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useNavigate } from 'react-router'
function NavBar({ children, extra }) {
  const navigate = useNavigate()
  const back = () => {
    // 跳回上一页
    navigate(-1)
  }
  return (
    <div className={styles.root}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}
export default NavBar
