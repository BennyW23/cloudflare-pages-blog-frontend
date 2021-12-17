import React, { useEffect, useState } from "react";

const BASE_URL = "https://worker.intern-assignment.workers.dev";
const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const resp = await fetch(
                BASE_URL + "/api/posts"
            );
            const postsResp = await resp.json();
            setPosts(postsResp);
        };

        getPosts();
    }, [posts]);

    return (
        <div className="container">
            <h1>Blogs R Us</h1>
            <NewPost posts={posts}/>
            {posts.map((post) => (
                <div className="post-outline flex-item centered">
                    <h1>{post.title}</h1>
                    <p>
                        <em>By {post.username}</em>
                    </p>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

function NewPost(posts) {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");

    const sharePost = async () => {
        await fetch(BASE_URL + "/api/posts", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, username: username, content: content}) // body data type must match "Content-Type" header
        });
        setTitle("");
        setUsername("");
        setContent("");

    }
    return (
        <div className="post-outline flex-item">
            <h1>
            <input type="text"
                   value={title}
                   className="title-input"
                   onChange={(event) => {setTitle(event.target.value)}}
                   placeholder="Enter a Title!"/>
            </h1>
            <p>
                <em>By&nbsp;
                    <input type="text"
                           value={username}
                           className="username-input"
                           onChange={(event) => {setUsername(event.target.value)}}
                           placeholder="Enter your username!"/>
                    </em>
            </p>
            <p placeholder="Share your story!">
                <textarea
                  value={content}
                  className="content-input"
                  onChange={(event) => {setContent(event.target.value)}}
                  placeholder="Share your story!"/>
            </p>
            <button className="share-input" onClick={sharePost}>Share!</button>
        </div>
    );

}
export default Posts;