import http from '@/utils/request'
import { removeTokenInfo, setTokenInfo } from '@/utils/storage'

/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendValidationCode = (mobile) => {
  return async (dispatch) => {
    const res = await http.get(`/sms/codes/${mobile}`)
    console.log(res)
  }
}

/**
 * 将 Token 信息保存到 Redux 中
 * @param {*} tokens
 * @returns
 */
export const saveToken = (tokenInfo) => {
  return {
    type: 'login/token',
    payload: tokenInfo,
  }
}
/**
 * 登录
 * @param {*} params
 * @returns
 */
export const login = (params) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', params)
    console.log(res, 'ceshi')
    //保存token到redux中去
    dispatch(saveToken(res.data))

    // 保存 Token 到 LocalStorage 中
    setTokenInfo(res.data)
  }
}
