import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';

const Register = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {firstName, lastName, email, password})
            .then(res => {
                console.log(res);
                props.setStatus(true);
                history.push("/notes");
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Firstname: </label>
                <input type="text" value = {firstName} onChange = {e => setFirstName(e.target.value)} />
                <label>LastName: </label>
                <input type="text" value = {lastName} onChange = {e => setLastName(e.target.value)} />
                <label>Email: </label>
                <input type="email" value = {email} onChange = {e => setEmail(e.target.value)} />
                <label>Password: </label>
                <input type="text" value = {password} onChange = {e => setPassword(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;