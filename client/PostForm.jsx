const emitter = require('./EventEmitter.js');
const { v4: uuidv4 } = require('uuid');
const PostSelect = require('./PostSelect.jsx');
const helper = require('./helper.js');

// an individual post component
const PostForm = () => {
    const [templateList, setTemplateList] = React.useState([]);
    const [wordList, setWordList] = React.useState({});
    const [conjunctionList, setConjunctionList] = React.useState([]);

    const [template1, setTemplate1] = React.useState();
    const [category1, setCategory1] = React.useState();
    const [word1, setWord1] = React.useState();
    const [conjunction, setConjunction] = React.useState();
    const [template2, setTemplate2] = React.useState();
    const [category2, setCategory2] = React.useState();
    const [word2, setWord2] = React.useState();

    const fetchTemplates = async () => {
        const response = await fetch('/getTemplates');
        const json = await response.json();

        setTemplateList(json.templates);
    };

    const fetchWords = async () => {
        const response = await fetch('/getWords');
        const json = await response.json();

        setWordList(json.words);
    };

    const fetchConjunctions = async () => {
        const response = await fetch('/getConjunctions');
        const json = await response.json();

        setConjunctionList(json.conjunctions);
    };

    const sendPost = async () => {
        helper.hideSuccessAndError();

        const response = await fetch('/getToken');
        const json = await response.json();

        const data = {
            template1: document.querySelector('#template-one').value,
            category1: document.querySelector('#category-one').value,
            word1: document.querySelector('#word-one')?.value || "",
            conjunction: document.querySelector('#conjunction').value,
            template2: document.querySelector('#template-two')?.value || "",
            category2: document.querySelector('#category-two')?.value || "",
            word2: document.querySelector('#word-two')?.value || "",
            _csrf: json.csrfToken,
        }

        console.log(data.template1);

        helper.sendPost('/post', data, (result) => {
            if(result.error){
                helper.handleError(result.error);
            } else {
                // kinda a dirty hack to close modal and display the new post.
                // should fix this later
                window.location = '/';
            }
        });
    };

    React.useEffect(() => {
        fetchTemplates();
        fetchWords();
        fetchConjunctions();

        const sub1 = emitter.addListener('post-reset', () => {
            setTemplate1('');
            setCategory1('');
            setWord1('');
            setConjunction('');
            setTemplate2('');
            setCategory2('');
            setWord2('');
        });

        const sub2 = emitter.addListener('post-send', sendPost);

        return () => {
            sub1.remove();
            sub2.remove();
        }
    }, []);
    
    const halfPhrase = (
        <div className="row g-3 mb-3 align-items-center">
            <div className="col-auto">
                <label htmlFor="template-one" className="col-form-label">Template:</label>
            </div>
            <div className="col-auto">
                <PostSelect id="template-one" options={templateList} value={template1} onChange={(e) => setTemplate1(e.target.value)}/>
            </div>

            <div className="w-100 m-0 d-lg-none d-block"></div>

            <div className="col-auto">
                <label htmlFor="category-one" className="col-form-label">Word:</label>
            </div>
            <div className="col-auto">
                <PostSelect id="category-one" options={Object.keys(wordList)} value={category1} onChange={(e) => {setWord1(''); setCategory1(e.target.value)}} />
            </div>
            <div className="col-auto">
                {category1 ? <PostSelect id="word-one" options={wordList[category1]} value={word1} onChange={(e) => setWord1(e.target.value)}/> : <></>}
            </div>
        </div>
    );
    let secondHalf;
    if(conjunction){
        secondHalf = (
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="template-two" className="col-form-label">Template:</label>
                </div>
                <div className="col-auto">
                    <PostSelect id="template-two" options={templateList} value={template2} onChange={(e) => setTemplate2(e.target.value)}/>
                </div>

                <div className="w-100 m-0 d-lg-none d-block"></div>

                <div className="col-auto">
                    <label htmlFor="category-two" className="col-form-label">Word:</label>
                </div>
                <div className="col-auto">
                    <PostSelect id="category-two" options={Object.keys(wordList)} value={category2} onChange={(e) => {setWord2(''); setCategory2(e.target.value)}} />
                </div>
                <div className="col-auto">
                    {category2 ? <PostSelect id="word-two" options={wordList[category2]} value={word2} onChange={(e) => setWord2(e.target.value)}/> : <></>}
                </div>
            </div>
        );
    }

    return (<>
        {halfPhrase}
        <div className="row g-3 mb-3 align-items-center">
            <div className="col-auto">
                <label htmlFor="conjunction" className="col-form-label">Conjunction:</label>
            </div>
            <div className="col-auto">
                <PostSelect id="conjunction" options={conjunctionList} value={conjunction} onChange={(e) => setConjunction(e.target.value)}/>
            </div>
        </div>
        {secondHalf}
    </>)
};

module.exports = PostForm;