import "./CreatePage.scss"
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Auth from "../../modules/Auth";
import Axios from "axios";

function CreatePage() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    let navigate = useNavigate()

    const [picture, setPicture] = useState("");
    const [SendingPicture, setSendingPicture] = useState("")
    const onChangePicture = e => {
        console.log('picture: ', picture);
        setPicture(URL.createObjectURL(e.target.files[0]));
        setSendingPicture(e.target.files[0])
        console.log('picture: ', picture);
    };

    const BASE_URL = "http://localhost:5000"

    function handleSubmit(event) {
        if (name === "" || category === "" ||
            description === "" || SendingPicture === "") {

            console.log("no send")
            event.preventDefault()
            return;
        }
        console.log("a")
        console.log(name)
        console.log(category)
        console.log(description)
        console.log(SendingPicture)
        event.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('category', category)
        bodyFormData.append('description', description)
        bodyFormData.append('image', SendingPicture)
        console.log(bodyFormData)
        Axios({
            method: 'POST',
            url : BASE_URL + '/api/page',
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: bodyFormData
        })
            // .then(response => response.json())
            .then((data) => {
                navigate("/page/"+data.data._id)
            })
    }
    return (
        <div className='formular-page'>
            <h1>Create Page</h1>
            <form onSubmit={event => handleSubmit(event)}>
                <div>
                    <h2 >
                        Name:
                    </h2>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div>
                    <h2 >
                        Category:
                    </h2>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>

                <div>
                    <h2 >
                        Description:
                    </h2>
                    <textarea rows="4" id={"description"} onChange={(e) => setDescription(e.target.value)}/>
                </div>

                {picture === "" ?
                    <div>
                        <h2 >
                            Picture:
                        </h2>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Choose a file
                        </label>
                    </div>
                    :
                    <div>
                        <h2 >
                            Picture:
                        </h2>
                        <h2 onClick={() => {
                            setPicture("")
                            setSendingPicture("")
                        }}>Remove file</h2>
                    </div>
                }
                <input id="file-upload"
                       type="file"
                    // value={file}
                       onChange={onChangePicture}/>
                <img src={picture}/>

                <div className='Buton'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
export default CreatePage;