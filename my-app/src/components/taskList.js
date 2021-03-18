import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './task.css'
function mapStateToProps(state) {
    return {
        currentUser: state.user
    }
}
export default connect(mapStateToProps)(function TaskList(props) {
    const { currentUser } = props;
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setTasks(result)
                console.log(tasks)
            })
            .catch(error => console.log('error', error));
    }, [])
    if (JSON.stringify(currentUser) === JSON.stringify({}))
        return <Redirect to='/'></Redirect>
    function addTask(index) {
        console.log(index, currentUser)
        let currentTask = {
            "title": tasks[index].title
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

            })
            .catch(error => console.log('error', error));

    }
    return (
        <>
            <h1>Tasks</h1>
            {tasks.length === 0 ?
                <div className="container taskContainer">


                    <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                        <circle cx="170" cy="170" r="160" stroke="#E2007C" />
                        <circle cx="170" cy="170" r="135" stroke="#404041" />
                        <circle cx="170" cy="170" r="110" stroke="#E2007C" />
                        <circle cx="170" cy="170" r="85" stroke="#404041" />
                    </svg>
                </div> :
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task Title</th>
                            <th scope="col">Add to your list</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.title}</td>
                                <td>
                                    <input type="checkbox" onClick={() => addTask(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
})


