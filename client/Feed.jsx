const Post = require('./Post.jsx');
const EventEmitter = require('./EventEmitter.js');

// the feed or list of posts component
const Feed = () => {
    const [posts, setPosts] = React.useState([]);

    // init our event listener
    React.useEffect(() => {
        const subscription = EventEmitter.addListener('CreatePost', (e) => {
            setPosts((prevPosts) => {
                return [...prevPosts, {
                    key: e.key,
                    author: e.author,
                    content: e.content,
                    likes: e.likes,
                    dislikes: e.dislikes,
                }];
            })
        })

        return () => {
            subscription.remove();
        }
    }, []);

    return (
        <div>
            {posts.map(post => {
                return (
                    <Post
                        key={post.key}
                        author={post.author}
                        content={post.content}
                        likes={post.likes}
                        dislikes={post.dislikes}
                    />
                )
            })}
        </div>
    )
};

module.exports = Feed;