import React, { createRef } from 'react'
import { connect } from 'react-redux'
import { actionUser } from '../redux/actions/actionUser'
import { withRouter, Redirect } from 'react-router-dom'
import { useState } from 'react'

function mapStateToProps(state) {
    return {

    }
}
const mapDispathToProps = (dispatch) => ({
    setUser: (user) => dispatch(actionUser.setUser(user))
})
export default withRouter(connect(mapStateToProps, mapDispathToProps)(function Login(props) {
    const RefToName = createRef()
    const RefToPassword = createRef()
    const { setUser, history } = props
    const [fields, setFields] = useState({})
    const [errors, setErrors] = useState({})
    function login() {
        let user = {
            "userName": RefToName.current.value,
            "password": RefToPassword.current.value
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user),
        };
        fetch("http://localhost:3030/users/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.token === undefined) {
                    alert('User does not exist')
                    history.push('/register')
                }
                else {
                    console.log(result.token)
                    user["token"]=result.token
                    setUser(user)
                    history.push('/userRouter')
                    history.push('/taskList')
                }

            })
            .catch(error => console.log('error', error));

    }
    function myFunction() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    function handleValidation() {
        let formfields = fields;
        let error = {};
        let formIsValid = true;

        //Name
        if (!formfields["name"]) {
            formIsValid = false;
            error["name"] = "name is require";
        }
        if (typeof formfields["name"] !== "undefined") {
            if (!formfields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                error["name"] = "Only letters";
            }
        }
        if (!formfields["password"]) {
            formIsValid = false;
            error["password"] = "password is require";
        }
        setErrors(error)
        return formIsValid
    }
    function handleChange(field, e) {
        let formfields = fields;
        formfields[field] = e.target.value;
        setFields(formfields)
    }
    function contactSubmit(e) {
        e.preventDefault();

        if (handleValidation()) {
            login()
        }

    }
    return (
        <>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form >
                        <h1>Login</h1>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" onChange={(e) => handleChange("name", e)} ref={RefToName} />
                            <span style={{ color: "red" }}>{errors["name"]}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => handleChange("password", e)} ref={RefToPassword} />
                            <span style={{ color: "red" }}>{errors["password"]}</span>
                            <br></br>
                            <input type="checkbox" onClick={myFunction} />  Show Password
                        </div>
                    </form>
                    <button onClick={contactSubmit} className="btn btn-primary">Login</button>
                </div>
            </div>
        </>
    )
}))