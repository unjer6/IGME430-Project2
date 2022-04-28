const Navbar = require('./Navbar.jsx');
const TabbedFeeds = require('./TabbedFeeds.jsx');
const PostModal = require('./PostModal.jsx');

//import 'bootstrap/dist/css/bootstrap.min.css';

// our app mainpage component
const App = () => {
    return (<>
        <Navbar currentPage="Home"/>

        <TabbedFeeds />

        <PostModal />
    </>)
};

const init = () => {
    ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = init;