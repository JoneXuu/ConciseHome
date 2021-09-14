import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router'
import './router.scss'
import Home from '../pages/home'
import Todolist from '../pages/todolist'
// import TodoListDetail from '../pages/todolist/todoListDetail'

const AppRouter = () => {
  let routeConfig = [
    { title: '首页', path: '/', exact: true, component: Home },
    { title: 'ToDoList', path: '/todoList', exact: true, component: Todolist },
  ]
  return (
    <Router>
      <div className="layout">
        <div className="sideBar">
          <ul>
            {
              routeConfig.map((item, index) => {
                return (<li key={index}><Link to={item.path}>{item.title}</Link></li>)
              })
            }
          </ul>
        </div>

        <div className="main-box">
          <div className="header">头部</div>
          <div className="main-content">
            {/* exact精准匹配 */}
            {
              routeConfig.map((item, index) => {
                return (<Route key={index} path={item.path} exact={item.exact} component={item.component} />)
              })
            }
            {/* <Route path="/todoListDetail" component={TodoListDetail} /> */}
          </div>
        </div>
      </div>
    </Router>
  )
}

export default AppRouter
