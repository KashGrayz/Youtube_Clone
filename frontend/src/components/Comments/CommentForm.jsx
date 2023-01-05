import React, { useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


export default function Comments({featuredVideo, handleSubmit, user, video_id, text, setText, likes, dislikes, token, comments, setComments, getComments}) {

  function handleSubmit(event){
    event.preventDefault();
    let newComment = {
      user:user.id,
      // video_id: featuredVideo[0]?.id.videoId,
      text: text,
      likes: likes,
      dislikes: dislikes,
  }
    postComment(newComment);
    console.log(newComment);
    // getComments();
    // setComments(comments, newComment);
    setText('')
}


async function postComment(newComment) {

  try{
    let res = await axios.post(`http://127.0.0.1:8000/api/comments/${featuredVideo[0]?.id.videoId}/`, newComment, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
      if(res.status === 201){
        console.log(`if statement for 201 ${res}`);   
      }
      else{
        console.log(`else statement for not 201 ${res}`);
      }
  }
  catch (error) {
    console.log(error)
    alert('Sorry! We have encountered an error processing your request!');
    }
  }

    

  return (
    <div className = 'comment-submit'>
        <form onSubmit ={handleSubmit} className = 'search'>
            <input className = 'search-input' type = 'text' onChange={(event) => setText(event.target.value)} required value = {text}>
            </input>
            <button  type = 'submit'>Post</button>
        </form>
    </div>
  

  )
}