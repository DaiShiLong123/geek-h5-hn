import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import '../src/App.scss'
const Login = React.lazy(() => import('@/pages/Login/index'))
const Home = React.lazy(() => import('@/pages/Home/index'))

export default function App() {
  return (
    <Router>
      <div className="app">
        {/*  <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}
