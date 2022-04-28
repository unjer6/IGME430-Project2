// an individual post component
const Post = ({author, content }) => {
    return (
        <div className="ms-3 p-2 mb-3 border">
            <h1 className="fs-6 mb-0 fw-bold">{author ? author : "Unknown"}</h1>
            <p className="fs-3 mb-0 lh-sm" style={{whiteSpace: 'pre-line'}}>{content ? content : "No content"}</p>
        </div>
    )
};

module.exports = Post;