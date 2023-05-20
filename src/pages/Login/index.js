import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input/index'
import { login, sendValidationCode } from '@/store/actions/login'
import classnames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Toast } from 'antd-mobile'

export default function Login() {
  const history = useNavigate()
  const [time, setTime] = useState(0)
  // 获取 Redux 分发器
  const dispatch = useDispatch()
  const onExtraClick = async () => {
    if (time > 0) return
    // 先对手机号进行验证
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      form.setTouched({
        mobile: true,
      })
      return
    }
    try {
      await dispatch(sendValidationCode(mobile))
      Toast.show({
        icon: 'success',
        content: '获取验证码成功',
        duration: 1000,
      })

      // 开启倒计时
      setTime(5)
      let timeId = setInterval(() => {
        // 当我们每次都想要获取到最新的状态，需要写成 箭头函数的形式
        setTime((time) => {
          if (time === 1) {
            clearInterval(timeId)
          }
          return time - 1
        })
      }, 1000)
    } catch (err) {
      if (err.response) {
        Toast.show({
          content: err.response.data.message,
          duration: 1000,
        })
      } else {
        Toast.show({
          content: '服务器繁忙，请稍后重试',
        })
      }
    }
  }
  // Formik 表单对象
  const form = useFormik({
    // 设置表单字段的初始值
    initialValues: {
      mobile: '13900001111',
      code: '246810',
    },
    // 提交
    onSubmit: (values) => {
      dispatch(login(values))
      Toast.show('登录成功')
      history('/home')
    },

    // 表单验证
    validationSchema: Yup.object().shape({
      // 手机号验证规则
      mobile: Yup.string()
        .required('请输入手机号')
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),

      // 手机验证码验证规则
      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字'),
    }),
  })
  const {
    values: { mobile, code },
    touched,
    errors,
    isValid,
    handleChange,
    handleSubmit,
    handleBlur,
  } = form
  console.log(form, 'hahahahha')
  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                placeholder="请输入手机号"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Input>
            </div>
            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>
          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                placeholder="请输入验证码"
                onExtraClick={onExtraClick}
                extra={time === 0 ? '获取验证码' : time + 's后获取'}
                name="code"
                value={code}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Input>
              {/*  <div className="extra">获取验证码</div> */}
            </div>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>
          {/* 登录按钮 */}
          <button
            type="submit"
            className={classnames('login-btn', isValid ? '' : 'disabled')}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
