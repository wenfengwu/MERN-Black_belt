import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';



const options = ['Captain', 'First Mate', 'Quarter Master', 'Boatswain', 'Powder Monkey']

const Create = (props) => {

    let history = useHistory();

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [treasure, setTreasure] = useState("");
    const [phrase, setPhrase] = useState("");
    const [position, setPosition] = useState(options[1]);
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [dbErrors, setDBErrors] = useState([]);


    const createPirate = (e) => {
        e.preventDefault();
        console.log("submitted form!");

        const newPirate = {
            name,
            imageUrl,
            treasure,
            phrase,
            position,
            pegLeg,
            eyePatch,
            hookHand
        }

        axios.post("http://localhost:8000/api/pirates", newPirate)
            .then(res => {
                console.log(res.data);
                console.log("success writing to the db!!");
                history.push("/pirates")
            })
            .catch(err => {
                console.log("Validations did not pass!!!");

                // handle Errors
                const {errors} = err.response.data.error;
                console.log(errors);
                const messages = Object.keys(errors).map( error => errors[error].message )
                setDBErrors(messages);

                // handle Errors - the platform way
                // const errorResponse = err.response.data.error.errors; // Get the errors from err.response.data
                // const errorArr = []; // Define a temp error array to push the messages in
                // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                //     errorArr.push(errorResponse[key].message)
                // }
                // // Set Errors
                // setErrors(errorArr);
            })
    }

    return (
        <div>
            <h1>Pirate Crew</h1>
            <span><Link to = {"/pirates"}>Crew Board</Link></span><br /><br />
            {/* {JSON.stringify(title)}<br />
            {JSON.stringify(content)}<br />
            {JSON.stringify(isImportant)}<br /> */}

            {/* {
                errors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)
            } */}
            {
                dbErrors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)
            }

            <form onSubmit={createPirate}>
                Pirate Name: 
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} /><br /><br />
                Image Url:
                <input type="text" onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} /><br /><br />
                # of Treasure Cheats:
                <input type="number" onChange={(e) => setTreasure(e.target.value)} value={treasure} /><br /><br />
                Pirate Catch Phrase:
                <input type="text" onChange={(e) => setPhrase(e.target.value)} value={phrase} /><br /><br />
                Crew Position: 
                <select value = {position} onChange = {e => setPosition(e.target.value)}>
                    {options.map((option, idx) => 
                        <option key = {idx} value = {option}>{option}</option>
                    )}
                </select><br />
                    Pegleg: <input type="checkbox" onChange={e => setPegLeg(e.target.checked)} checked={pegLeg} /><br /><br />
                    Eye Patch: <input type="checkbox" onChange={e => setEyePatch(e.target.checked)} checked={eyePatch} /><br /><br />
                    Hook Hand: <input type="checkbox" onChange={e => setHookHand(e.target.checked)} checked={hookHand} /><br />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Create
