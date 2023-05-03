import './Post.scss'
import userpfp from '../../public/userpfp.jpg'
import imgprop from '../../public/imgprop.jpg'
import like from '../../public/like.png'
import liked from '../../public/liked.png'
import comm from '../../public/comm.png'
import expand from '../../public/expand.png'
import collapse from '../../public/collapse.png'
import submit from '../../public/submit-comm.png'

import Comment from "./Comment/Comment";

import React, {useEffect, useState} from 'react';

function Post(props) {

    const [check, setCheck] = useState(false);

    const firtstName = props.post.authorId.firstname
    const lastName = props.post.authorId.lastname
    const username = props.post.authorId.username
    const caption = props.post.caption
    const image = props.post.imgUrl
    let likeCount = props.post.likes === [] ? 0 : props.post.likes.length
    const commentCount = props.post.comments === [] ? 0 : props.post.comments.length
    const comments = props.post.comments === [] ? [] : props.post.comments
    const myFirstName = props.me.firstname
    const myLastName = props.me.lastname
    const myUsername = props.me.username
    const [comment, setComment] = useState("")
    const [likedpic, setLikedpic] = useState(false)
    const [likeCountState, setLikeCountState] = useState(likeCount)
    const [commentsCountState, setCommentsCountState] = useState(commentCount)
    const [commentsState, setCommentsState] = useState([])

    useEffect(() => {
        if (props.post.likes.indexOf(props.me._id) !== - 1) {
            setLikedpic(true)
        }
        setCommentsState(comments)
    },[])

    const BASE_URL = "http://localhost:5000"
    function handleComment() {
        console.log(comment)
        fetch(BASE_URL + '/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({post: props.post,
                                        me: props.me,
                                        comment: comment})
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if(data.msg === 'Ok!') {
                    let newComm = {authorId : props.me, content: comment}
                    console.log(commentsState)
                    setCommentsState((list) => [...list, newComm]);
                    setCommentsCountState(commentsCountState + 1)
                    console.log(commentsState)
                    // window.location.reload()
                }
            })
            .catch(error => console.error(error));
        setComment("")
    }

    function handleLike() {
        fetch(BASE_URL + '/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({post: props.post,
                me: props.me})
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if(data.msg === 'Ok!') {
                    if (likedpic === true) {
                        setLikeCountState(likeCountState - 1)
                    } else {
                        setLikeCountState(likeCountState + 1)
                    }
                    setLikedpic(!likedpic)
                }
            })
            .catch(error => console.error(error));
    }

    const onChangeComment = e => {
        setComment(e.target.value)
    };
    return(
        <div className="post">
            <div className="post-header">
                <div className="post-header-img">
                    <img src={userpfp}/>
                </div>
                <div className="post-header-details">
                    <a href={'/user/'+ props.post.authorId._id}>{firtstName + "  " + lastName + " @" + username}</a>
                    <h3>16:31</h3>
                </div>
            </div>
            <div className="post-body">
                <h2>{caption}</h2>
                {image !== ""?
                    <div className={`post-body-img ${check === false? "":"expanded"}`}>
                        <img src={"http://localhost:5000/posts/" + image}/>
                    </div>
                    :
                    <div/>
                }

                <div className="post-body-actions">
                    <div className="like-comm">
                        <div className="like">
                            <h2>{likeCountState}</h2>
                            <img src={likedpic === true ? liked : like} onClick={handleLike}/>
                        </div>
                        <div className="comm">
                            <h2>{commentsCountState}</h2>
                            <img src={comm}/>
                        </div>
                    </div>
                    {image !== ""?
                        <div className="expand">
                            <img src={check === false ? expand : collapse} onClick={() => setCheck(!check)}/>
                        </div>
                        :
                        <div/>
                    }
                </div>
            </div>
            <div className="post-comments">
                <div className="your-comment">
                    <div className="your-comment-image">
                        <img src={userpfp}/>
                    </div>
                    <div className="your-comment-body">
                        <h2>{myFirstName + "  " + myLastName + " @" + myUsername}</h2>

                        <form>
                            <div className="form-comment">
                                <div className="form-input">
                                    <textarea rows="2" placeholder="Say something..." id={"comment"+props.post._id} value={comment} onChange={onChangeComment}/>
                                </div>
                                <div className="form-send">
                                    <img src={submit} onClick={handleComment}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {commentsState .map((value, key) => <Comment key={key} user={value}/>)}

            </div>


        </div>
    );
}

export default Post;