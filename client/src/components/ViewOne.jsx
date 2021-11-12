import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewOne = (props) => {


    const { id } = useParams();
    const [thisPirate, setThisPirate] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates/" + id)
            .then(res => {
                console.log(res.data);
                setThisPirate(res.data);
            })
            .catch(err => console.log(err))
    }, [id])


    const handleChange = () => {
        axios.put("http://localhost:8000/api/pirates/" + id, thisPirate)
            .then(res => {
                setThisPirate(res.data)
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <h1>{thisPirate.name}</h1>
            <div style = {{display: 'flex', alignItems: "center"}}>
                
                <div>
                    <img src = {thisPirate.imageUrl} alt="pirate.png" width = '500'/>
                    <h1>{thisPirate.phrase}</h1>
                </div>
                
                <div>
                    <h2>About</h2>
                    <div style = {{margin: '200px'}}>
                        <p>Position: {thisPirate.position}</p>
                        <p>Treasures: {thisPirate.treasure}</p>
                        <p>Peg Leg: {thisPirate.pegLeg ? "Yes" : "No"}
                            &nbsp;&nbsp;<button onClick = {() => {thisPirate.pegLeg = !thisPirate.pegLeg; handleChange()}}>{thisPirate.pegLeg ? "No" : "Yes"}</button>
                        </p>
                        <p>Eye Patch: {thisPirate.eyePatch ? "Yes" : "No"}
                            &nbsp;&nbsp;<button onClick = {() => {thisPirate.eyePatch = !thisPirate.eyePatch; handleChange()}}> {thisPirate.eyePatch ? "No" : "Yes"}</button>
                        </p>
                        <p>Hook Hand: {thisPirate.hookHand ? "Yes" : "No"}
                            &nbsp;&nbsp;<button onClick = {() => {thisPirate.hookHand = !thisPirate.hookHand; handleChange()}}>{thisPirate.hookHand ? "No" : "Yes"}</button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewOne
