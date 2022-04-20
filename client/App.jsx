const Feed = require('./Feed.jsx');
const PostForm = require('./PostForm.jsx');

// our app mainpage component
const App = () => {
    return (<>
        <h1>Chalk</h1>
        <p>Send chalk messages for all to see! (WIP)</p>
        <a href="/login">Login</a><a href="/logout">Logout</a>
        <PostForm />
        <Feed />
    </>)
};

const init = () => {
    ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = init;