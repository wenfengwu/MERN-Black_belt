import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ourStyle from "./Main.module.css";
import { Link, useHistory } from 'react-router-dom';

const Main = (props) => {

    const [pirates, setPirates] = useState([]);
    const history = useHistory();
    

    useEffect(() => {
        getNotesFromDB();
    }, [])

    const getNotesFromDB = () => {
        axios.get("http://localhost:8000/api/pirates")
            .then(res => {
                console.log(res.data);
                setPirates(res.data)
            })
            .catch(err => console.log(err))
    }

    const deletePirate = (deleteId) => {
        // console.log(deleteId);
        axios.delete("http://localhost:8000/api/pirates/" + deleteId)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS DELETE ❌");

                setPirates(pirates.filter((pirate) => pirate._id !== deleteId))
            })
            .catch(err => console.log(err))
    }

    const handleLogout = (e) => {
        props.setStatus(false);
        axios.put("http://localhost:8000/api/logout")
        .then(res => console.log(res))
        .catch(err => console.log(err))
        history.push('/user/login');
  }


    return (
        <div>
            <h1>Pirate Crew</h1>
            <span><Link to = {"/pirates/new"}>Add Pirate</Link></span>
            &nbsp;&nbsp;&nbsp;&nbsp;<button onClick = {handleLogout}>Logout</button>
            
            {/* {JSON.stringify(pirates)} */}

            {
                pirates.map((pirate, i) => {
                    return (
                        <div key={pirate._id} className={ourStyle.note}>
                            <img src= {pirate.imageUrl}  alt="pirate.jpg" width = "200"/>
                            <h3>
                                {pirate.name}
                            </h3>
                            <div style = {{display: "flex"}}>
                                <div>
                                    <Link to = {"/pirates/" + pirate._id}>View Pirate</Link>
                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button onClick={() => deletePirate(pirate._id)}>Walk the Plank</button>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Main
