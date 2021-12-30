import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './App.css'

function MainPage() {

    const [postList, setPostList] = useState([]);

    let history = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3002/api/get").then((data) => {
            setPostList(data.data)
        });
    }, [])


    return (
        <div className="MainPage">
            <div className="PostContainer">
                {postList.map((val, key) => {
                    return (
                        <div className="Post" >
                            <h1 className="post-title" onClick={() => (history.push(`/post/${val.id}`))}>{val.title}</h1>
                            <p>{val.post_text.length > 300 ? val.post_text.substring(0, 300) + " ..." : val.post_text}</p>
                            <h4>{val.user_name}</h4>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPage