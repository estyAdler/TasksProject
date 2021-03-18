import React from 'react'
import  ProjectRouter  from './router'
import  HomeRouter from './homeRoute'
import { connect } from 'react-redux'


function mapStateToProps(state) {
    return {
        currentUser: state.user
    }
}
export default connect(mapStateToProps)(function Home(props) {
    const { currentUser } = props; 
    console.log(currentUser)
    return (
        <div>
            {JSON.stringify(currentUser) === JSON.stringify({})?<HomeRouter></HomeRouter>:<ProjectRouter></ProjectRouter>}
        </div>
    )
})
