import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'
import TaskList from './taskList'
import UserList from './userList'
function mapStateToProps(state) {
    return {
        currentUser: state.user
    }
}
export default connect(mapStateToProps)(function ProjectRouter(props) {
    const {currentUser}=props
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/taskList">Task List</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/userList">My List</Link>
                    </li>
                </ul>
                <form >
                    <p className="form-control mr-sm-2">{currentUser.userName} is connected</p>
                    <button className="btn" style={{ backgroundColor: '#ff4b7d' }}>
                        <Link className="nav-link" style={{ color: '#404041' }} to="/login">Login</Link>
                    </button>
                    <button className="btn" type="button" style={{ backgroundColor: '#ff4b7d' }} >
                        <Link className="nav-link" style={{ color: '#404041' }} to="/register">sign up</Link>
                    </button>
                </form>
            </div>
        </nav>
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
            </Switch>
        </div>
    )
})
