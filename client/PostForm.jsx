const EventEmitter = require('./EventEmitter.js');
const { v4: uuidv4 } = require('uuid');
const PostSelect = require('./PostSelect.jsx');

// an individual post component
const PostForm = ({csrf, templates, words, conjunctions}) => {
    const handlePost = (e) => {
        e.preventDefault();

        // EventEmitter.emit('CreatePost', {
        //     key: uuidv4(),
        //     author: e.target.querySelector('#postUser').value,
        //     content: e.target.querySelector('#postContent').value,
        //     likes: e.target.querySelector('#postLikes').value,
        //     dislikes: e.target.querySelector('#postDislikes').value,
        // });

        return false;
    };

    const [template1, setTemplate1] = React.useState();
    const [category1, setCategory1] = React.useState();
    const [word1, setWord1] = React.useState();
    const [conjunction, setConjunction] = React.useState();
    const [template2, setTemplate2] = React.useState();
    const [category2, setCategory2] = React.useState();
    const [word2, setWord2] = React.useState();
    
    if(conjunction){
        return (
            <form
                onSubmit={handlePost}
                name="postForm"
                action="/post"
                method="POST"
                className="postForm"
            >
                <label>Template:</label>
                <PostSelect options={templates} value={template1} onChange={(e) => setTemplate1(e.target.value)}/>
                <label htmlFor="category-one">Word:</label>
                <PostSelect options={Object.keys(words)} value={category1} onChange={(e) => {setWord1(''); setCategory1(e.target.value)}} />
                {category1 ? <PostSelect options={words[category1]} value={word1} onChange={(e) => setWord1(e.target.value)}/> : <></>}
                

                <hr></hr>
                
                <label>Conjunction:</label>
                <PostSelect options={conjunctions} value={conjunction} onChange={(e) => setConjunction(e.target.value)}/>

                <hr></hr>
                
                <label>Template:</label>
                <PostSelect options={templates} value={template2} onChange={(e) => setTemplate2(e.target.value)}/>
                <label htmlFor="category-one">Word:</label>
                <PostSelect options={Object.keys(words)} value={category2} onChange={(e) => {setWord2(''); setCategory2(e.target.value)}} />
                {category2 ? <PostSelect options={words[category2]} value={word2} onChange={(e) => setWord2(e.target.value)}/> : <></>}
            </form>
        )
    }

    return (
        <form
            onSubmit={handlePost}
            name="postForm"
            action="/post"
            method="POST"
            className="postForm"
        >
            <label>Template:</label>
            <PostSelect options={templates} value={template1} onChange={(e) => setTemplate1(e.target.value)}/>
            <label htmlFor="category-one">Word:</label>
            <PostSelect options={Object.keys(words)} value={category1} onChange={(e) => {setWord1(''); setCategory1(e.target.value)}} />
            {category1 ? <PostSelect options={words[category1]} value={word1} onChange={(e) => setWord1(e.target.value)}/> : <></>}
            

            <hr></hr>
            
            <label>Conjunction:</label>
            <PostSelect options={conjunctions} value={conjunction} onChange={(e) => setConjunction(e.target.value)}/>
        </form>
    )
};

module.exports = PostForm;