import React, { useEffect, useState } from 'react';
import './App.css';
import {
    Link
} from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);

    let usersFetch = () => {
        fetch("https://reqres.in/api/users?page=" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                setUsers([...users, ...responseJson.data]);
                if (page <= responseJson.total_pages){
                    setPage(page => page + 1);
                }
            })
            .catch(error => {
                setError(error);
            })
    };
    useEffect(() => {
        usersFetch();
    }, []);

    useEffect(() => {
        usersFetch();
    }, [page]);

    let usersName = users.map((user, index) => {
        return (
            <div className="card">
                <img src={user.avatar} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-title">{user.first_name}</p>
                    <p className="card-text">{user.email}</p>
                    <Link to="/edit">
                        <button className="btn btn-outline-primary">Edit</button>
                    </Link>
                </div>
            </div>
        )
    })

    return (
        <div className="App">
            <header className="App-header">
                <h1>Users list</h1>
                {error ? error : ""}
                {users ? usersName : ""}
            </header>
        </div>
    );
}

export default Users;
