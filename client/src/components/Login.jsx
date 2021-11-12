import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';

const Login = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerEmail, registerSetEmail] = useState("");
    const [registerPassword, registerSetPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", {
            "email" : loginEmail, 
            "password" : loginPassword})
            .then(res => {
                console.log(res);
                props.setStatus(true);
                history.push("/pirates")
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {
            firstName, 
            lastName, 
            "email" : registerEmail, 
            "password" : registerPassword})
            .then(res => {
                console.log(res);
                props.setStatus(true);
                history.push("/pirates");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div style = {{display: "flex"}}>
            <form onSubmit = {handleLogin} style = {{display: "flex", flexDirection: "column", margin:"100px"}}>
                <h1>Login</h1>
                <label>Email: </label>
                <input type="email" value = {loginEmail} onChange = {e => setLoginEmail(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <label>Password: </label>
                <input type="password" value = {loginPassword} onChange = {e => setLoginPassword(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <button>Login</button>
            </form>

            <form onSubmit = {handleRegister} style = {{display: "flex", flexDirection: "column",margin:"100px"}}>
                <h1>Register</h1>
                <label>Firstname: </label>
                <input type="text" value = {firstName} onChange = {e => setFirstName(e.target.value)} />
                <label>LastName: </label>
                <input type="text" value = {lastName} onChange = {e => setLastName(e.target.value)} />
                <label>Email: </label>
                <input type="email" value = {registerEmail} onChange = {e => registerSetEmail(e.target.value)} />
                <label>Password: </label>
                <input type="password" value = {registerPassword} onChange = {e => registerSetPassword(e.target.value)} />&nbsp;&nbsp;&nbsp;
                <button>Register</button>
            </form>
        </div>
    )
}

export default Login;