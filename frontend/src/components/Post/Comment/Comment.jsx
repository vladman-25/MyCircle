import userpfp from "../../../public/userpfp.jpg";
import React from "react";

import './Comment.scss'

function Comment(props) {

    const firstname = props.user.authorId.firstname
    const lastname = props.user.authorId.lastname
    const username = props.user.authorId.username

    const content = props.user.content
    return(
        <div className="comment">
            <div className="comment-image">
                <img src={userpfp}/>
            </div>
            <div className="comment-body">
                <a href={'/user/'+ props.user.authorId._id}>{firstname + "  " + lastname + " @" + username}</a>
                <h3>{content}</h3>
            </div>
        </div>
    )
}

export default Comment;