import React from 'react'
import { createRef, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { actionUser } from '../redux/actions/actionUser'
function mapStateToProps(state) {
    return {

    }
}
const mapDispathToProps = (dispatch) => ({
    setUser: (user) => dispatch(actionUser.setUser(user))
})
export default withRouter(connect(mapStateToProps, mapDispathToProps)(function Register(props) {
    const RefToName = createRef()
    const RefToLastName = createRef()
    const RefToPassword = createRef()
    const { setUser, history } = props
    const [fields, setFields] = useState({})
    const [errors, setErrors] = useState({})
    function register() {
        let user = {
            "userName": RefToName.current.value,
            "lastName": RefToLastName.current.value,
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
        fetch("http://localhost:3030/users/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                debugger
                if (result.token === undefined) {
                    alert(result.message)
                    document.getElementById("form").reset();
                }
                else {
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
        console.log(x)
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
        if (!formfields["lastName"]) {
            formIsValid = false;
            error["lastName"] = "lastName is require";
        }
        if (typeof formfields["lastName"] !== "undefined") {
            if (!formfields["lastName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                error["lastName"] = "Only letters";
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
            register()
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form id="form">
                        <h1>Sign Up</h1>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name"  onChange={(e)=>handleChange( "name",e)} ref={RefToName} />
                            <span style={{ color: "red" }}>{errors["name"]}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="LastName"  onChange={(e)=>handleChange( "lastName",e)} ref={RefToLastName} />
                            <span style={{color: "red"}}>{errors["lastName"]}</span>

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>handleChange( "password",e)} ref={RefToPassword} />
                            <span style={{ color: "red" }}>{errors["password"]}</span>
                            <br></br>
                            <input type="checkbox" onClick={myFunction} />  Show Password
                        </div>

                    </form></div>

            </div>
            <button onClick={contactSubmit} className="btn btn-primary">Submit</button>

        </>
    )
}))