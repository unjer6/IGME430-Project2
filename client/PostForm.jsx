const EventEmitter = require('./EventEmitter.js');
const { v4: uuidv4 } = require('uuid');

// an individual post component
const PostForm = ({csrf}) => {
    const handlePost = (e) => {
        e.preventDefault();
        
        EventEmitter.emit('CreatePost', {
            key: uuidv4(),
            author: e.target.querySelector('#postUser').value,
            content: e.target.querySelector('#postContent').value,
            likes: e.target.querySelector('#postLikes').value,
            dislikes: e.target.querySelector('#postDislikes').value,
        });

        return false;
    };

    return (
        <form
            onSubmit={handlePost}
            name="postForm"
            action="/post"
            method="POST"
            className="postForm"
        >
            <div>
                <label htmlFor="name">User: </label>
                <input id="postUser" type="text" name="name" placeholder="Username" />
            </div>
            <div>
                <label htmlFor="content">Content: </label>
                <input id="postContent" type="text" name="content" placeholder="My Message" />
            </div>
            <div>
                <label htmlFor="likes">Likes: </label>
                <input id="postLikes" type="number" min="0" name="likes" />
            </div>
            <div>
                <label htmlFor="dislikes">Dislikes: </label>
                <input id="postDislikes" type="number" min="0" name="dislikes" />
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={csrf} />
            <input type="submit" value="Post Message" />
        </form>
    )
};

module.exports = PostForm;