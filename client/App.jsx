const Feed = require('./Feed.jsx');
const PostForm = require('./PostForm.jsx');

// our app mainpage component
const App = () => {
    const [templates, setTemplates] = React.useState([]);
    const [words, setWords] = React.useState({});
    const [conjunctions, setConjunctions] = React.useState([]);

    const fetchTemplates = async () => {
        const response = await fetch('/getTemplates');
        const json = await response.json();

        setTemplates(json.templates);
    };

    const fetchWords = async () => {
        const response = await fetch('/getWords');
        const json = await response.json();

        setWords(json.words);
    };

    const fetchConjunctions = async () => {
        const response = await fetch('/getConjunctions');
        const json = await response.json();

        setConjunctions(json.conjunctions);
    };

    React.useEffect(() => {
        //fetchTemplates();
        //fetchWords();
        //fetchConjunctions();
    }, []);

    return (<>
        <h1>Chalk</h1>
        <p>Send chalk messages for all to see! (WIP)</p>
        <a href="/login">Login</a><a href="/logout">Logout</a>
        <PostForm templates={["templates"]} words={{"category":["word"]}} conjunctions={["conjunctions"]}/>
        <Feed />
    </>)
};

const init = () => {
    ReactDOM.render(<App />, document.querySelector('#root'));
};

window.onload = init;