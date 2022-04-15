// an individual post component
const Post = ({author, content, likes, dislikes}) => {
    return (
        <div>
            <h1>{author ? author : "Unknown"}</h1>
            <p>{content ? content : "No content"}</p>
            <p>Likes: {likes ? likes : 0}</p>
            <p>Dislikes: {dislikes ? dislikes : 0}</p>
        </div>
    )
};

module.exports = Post;