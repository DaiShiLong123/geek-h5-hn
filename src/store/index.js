import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducer from './reducers'
const middleware = [thunk]
//1.创建Store
const store = configureStore({
  //2.参数
  reducer: reducer,
  //3.异步处理
  middleware: [...middleware],
})
export default store
