import App from './App'
import { createRoot } from 'react-dom/client'
//导入通用样式
import '@/assets/styles/index.scss'
import store from '@/store'
import { Provider } from 'react-redux'
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
)
