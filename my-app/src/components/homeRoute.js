import React from 'react'
import Register from './register'
import Login from './login'
import UserList from './userList'
import TaskList from './taskList'
import { Link, Switch, Route } from 'react-router-dom'
import  ProjectRouter  from './router'
import Home from './home'
export default function HomeRouter() {
    return (
        <div>
            <Menu />
            <Switch>
                <Route path='/login'>
                    <Login></Login>
                </Route>
                <Route path='/register'>
                    <Register></Register>
                </Route>
                <Route path='/taskList'>
                    <TaskList></TaskList>
                </Route>
                <Route path='/userList'>
                    <UserList></UserList>
                </Route>
                <Route path='/userRouter'>
                    <ProjectRouter></ProjectRouter>
                </Route>
                <Route path='/home'>
                    <Home></Home>
                </Route>
            </Switch>
        </div>
    )
}
function Menu() {
    return (
        <>
            <h1>Welcome </h1>
            <h4>Please <Link to='/login'>login</Link> or <Link to='/register'>sign up</Link></h4>
            <div className="row">
                <div className="col-md-12">
                    <div className="loader10">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}