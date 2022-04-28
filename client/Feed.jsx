const Post = require('./Post.jsx');
const Ad = require('./Ad.jsx');
const { v4: uuidv4 } = require('uuid');

// the feed or list of posts component
const Feed = ({ type }) => {
    const [posts, setPosts] = React.useState([]);
    const [premium, setPremium] = React.useState(false);

    const getRecent = async () => {
        const res = await fetch('/getRecent');
        const result = await res.json();

        if(result.error) return;

        foundPosts = result.posts.map(post => { return {
            key: uuidv4(),
            author: post.owner.username,
            content: post.content,
        }});

        setPosts(foundPosts);

        document.querySelector('#spinner').classList.add('d-none');
    }

    React.useEffect(() => {
        if (type === "recent") {
            getRecent();
        }
    }, []);

    React.useEffect(async () => {
        const res = await fetch('/getHasPremium');
        const result = await res.json();

        setPremium(result.premium);
    }, []);

    return (
        <div>
            <div id="spinner" className="d-flex justify-content-center align-items-center p-3">
                <div className="spinner-border" role="status" aria-hidden="true"></div>
                <strong className="ps-3">Loading...</strong>
            </div>
            {posts.map((post, index) => {
                if(index % 5 == 0 && index != 0 && !premium){
                    return (<>
                        <Ad />
                        <Post
                            key={post.key}
                            author={post.author}
                            content={post.content}
                        />
                    </>)
                }

                return (
                    <Post
                        key={post.key}
                        author={post.author}
                        content={post.content}
                    />
                )
            })}
        </div>
    )
};

module.exports = Feed;