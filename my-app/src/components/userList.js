import React, { useEffect } from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

function mapStateToProps(state) {
    return {
        currentUser: state.user
    }
}
export default connect(mapStateToProps)(function UserList(props) {
    const { currentUser } = props;
    const [taskTitle, setTaskTitle] = useState('')
    const [tasks, setTasks] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    function handleShow() {
        setShow(true)
    }
    function readUserTasks() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('authorization', currentUser.token)
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch("http://localhost:3030/tasks/getUserTask", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.tasks)
                setTasks(result.tasks)
                console.log(tasks)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        readUserTasks()
    }, [])
    function addTask(index) {
        if (taskTitle !== '') {
            setTaskTitle('')
            console.log(index, currentUser.token)
            handleClose()
            let currentTask = {
                "title": taskTitle
            }
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');
            myHeaders.append('authorization', currentUser.token)
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(currentTask),
            };
            fetch("http://localhost:3030/tasks/addTask", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    readUserTasks()
                })
                .catch(error => console.log('error', error));
        }
    }

    function deleteTask(index) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('authorization', currentUser.token)
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify(tasks[index]),
        };
        fetch("http://localhost:3030/tasks/deleteTask", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                readUserTasks()
            })
            .catch(error => console.log('error', error));

    }
    function updateStatusTask(index) {
        console.log(tasks[index].completed, tasks[index].date)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('authorization', currentUser.token)
        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(tasks[index]),
        };
        fetch("http://localhost:3030/tasks/updateStatusTask", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                readUserTasks()
            })
            .catch(error => console.log('error', error));

    }
    function updateTask(index) {
        if (taskTitle !== '') {
            tasks[index].title = taskTitle
            document.getElementsByClassName('input').value = ''
            setTaskTitle('')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');
            myHeaders.append('authorization', currentUser.token)
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(tasks[index]),
            };
            fetch("http://localhost:3030/tasks/updateTask", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    readUserTasks()
                })
                .catch(error => console.log('error', error));
        }
    }
    if (JSON.stringify(currentUser.token) === JSON.stringify({}))
        return <Redirect to='/'></Redirect>
    return (
        <>
            <h1>My Tasks</h1>
            <Button variant="secondary" className="details" onClick={() => handleShow()}>Add new Task</Button>
            {tasks ===undefined ?
                <div className="container taskContainer">
                    <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                        <circle cx="170" cy="170" r="160" stroke="#E2007C" />
                        <circle cx="170" cy="170" r="135" stroke="#404041" />
                        <circle cx="170" cy="170" r="110" stroke="#E2007C" />
                        <circle cx="170" cy="170" r="85" stroke="#404041" />
                    </svg>
                </div> :<div>{tasks.length===0?<h3>no tasks</h3>:
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task Title</th>
                            <th scope="col">Task Date</th>
                            <th scope="col">Task completed</th>
                            <th scope="col">Update status</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}
                                    <br></br>
                                    <input className='input' onChange={(e) => setTaskTitle(e.target.value)}></input>
                                    <button className="btn btn-primary" onClick={() => updateTask(index)} title='update' >update</button>
                                </td>
                                <td>{item.date.substring(0, 10)}</td>
                                <td>{item.completed.toString()}</td>
                                <td>
                                    {item.completed.toString() === 'true' ? <button title={item.completed.toString()} className="btn btn-success btn-xs" onClick={() => updateStatusTask(index)} >{item.completed.toString()}</button>
                                        : <button className="btn btn-danger btn-xs" onClick={() => updateStatusTask(index)} title={item.completed.toString()}>{item.completed.toString()}</button>}
                                </td>
                                <td><p title="delete"><button className="btn btn-danger btn-xs" onClick={() => deleteTask(index)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg><span className="glyphicon glyphicon-trash"></span></button></p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
                </div>
            }
            <Modal size='lg' show={show} onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <h4>Add your task</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="name">Title Task</label>
                        <input type="text" className="form-control" id="name" onChange={(e) => setTaskTitle(e.target.value)} />
                        {taskTitle === '' ? <span style={{ color: "red" }}>title of task is require</span> : ''}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={addTask}>Add Task</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
})


