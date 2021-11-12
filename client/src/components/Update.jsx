import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Update = (props) => {

    let history = useHistory()
    // grab the var from the url
    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isImportant, setIsImportant] = useState(false);

    const [dbErrors, setDBErrors] = useState([]);

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                console.log(res.data);
                setTitle(res.data.title)
                setContent(res.data.content);
                setIsImportant(res.data.isImportant);
            })
            .catch()
    }, [])

    const updateForm = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8000/api/notes/" + id, {
            title,
            content,
            isImportant
        })
            .then(res => {
                console.log(res.data);
                history.push("/")
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
            <h3>UPDATE note</h3>
            
            {
                dbErrors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)
            }

            <form onSubmit={updateForm}>
                title:
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} /><br />
                content:
                <textarea onChange={(e) => setContent(e.target.value)} value={content} col="10" rows="4"></textarea><br />
                📌 Important ? <input type="checkbox" onChange={e => setIsImportant(e.target.checked)} checked={isImportant} />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Update
