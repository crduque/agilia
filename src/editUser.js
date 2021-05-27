import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, useHistory, useParams } from "react-router-dom"

function EditUser() {
    let history = useHistory();
    let params = useParams();
    const [error, setError] = useState("");
    const [body, setBody] = useState({});
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [successText, setSuccessText] = useState("");

    useEffect(() => {
        fetch("https://reqres.in/api/users/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) return response.json();
            })
            .then(responseJson => {
                setBody({
                    email: responseJson.data.email,
                    first_name: responseJson.data.first_name,
                    last_name: responseJson.data.last_name
                })
            })
            .catch(error => {
                setError(error);
            })
    }, [])

    let editUser = () => {
        fetch("https://reqres.in/api/users/" + params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) return response.json();
            })
            .then(responseJson => {
                setSuccessText(responseJson.updatedAt)
            })
            .catch(error => {
                setError(error)
            });
    }

    return (
        <div className="d-flex justify-content-evenly mt-5">
            <h1>EDIT USER</h1>
            {error ? <h2>{error}</h2> : ""}
            {successText ? <h2>Updated at: {successText}</h2> : ""}
            <form onSubmit={(event) => {
                event.preventDefault();
                setBody({
                    email: email,
                    first_name: firstName,
                    last_name: lastName
                })
                editUser();
            }}>
                <div>
                    <label className="form-label">
                        Email:
                    <input type="text" defaultValue={body.email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        First name:
                    <input type="text" defaultValue={body.first_name} onChange={e => setFirstName(e.target.value)} className="form-control"></input>
                    </label>
                </div>
                <div>
                    <label className="form-label">
                        Last name:
                    <input type="text" defaultValue={body.last_name} onChange={e => setLastName(e.target.value)} className="form-control"></input>
                    </label>
                </div>
                <button type="submit" className="btn btn-primary my-2">Edit</button>
            </form>
            <Link to="/">Back home</Link>
        </div>
    );
}

export default EditUser;
