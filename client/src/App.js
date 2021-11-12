import './App.css';
import axios from 'axios';
import React, {useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import Create from './components/Create';
// import Update from './components/Update';
import ViewOne from './components/ViewOne';
import Login from './components/Login';
// import Register from './components/Register';

function App() {

  let cookies = document.cookie.split(';')
  let defaultLoginStatus = false
  for (let cookie of cookies) {
    if (cookie.startsWith('usertoken')) {
      defaultLoginStatus = true
      break
    }
  }

  axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState(defaultLoginStatus);

  const setStatus = (status) => {
    setLoginStatus(status);
  }


  return (
    <div className="App">
          {JSON.stringify(loginStatus)}
      <Switch>

        {/* userLogin */}
        <Route path="/user/login">
          <Login loginStatus = {loginStatus} setStatus = {setStatus}/>
        </Route>

        {/* userRegister */}
        {/* <Route path="/notes/user/register">
          <Register loginStatus = {loginStatus} setStatus = {setStatus}/>
        </Route> */}

        {/* UPDATE */}
        {/* <Route path="/pirates/update/:id">
          <Update />
        </Route> */}

        {/* CREATE */}
        <Route path="/pirates/new">
          <Create />
        </Route>

        {/* SHOW ONE */}
        <Route path="/pirates/:id">
          <ViewOne />
        </Route>

        {/* ALL PIRATES */}
        <Route path="/pirates">
          <Main loginStatus = {loginStatus} setStatus = {setStatus}/>
        </Route>

        <Route path="/">
          <Redirect to="/user/login" />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
