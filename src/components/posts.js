import React, { useEffect, useState } from "react";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const resp = await fetch(
                "https://worker.intern-assignment.workers.dev/api/posts"
            );
            const postsResp = await resp.json();
            setPosts(postsResp);
        };

        getPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.text}</p>
                    <p>
                        <em>By {post.username}</em>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Posts;