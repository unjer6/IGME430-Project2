const LoginForm = require('./LoginForm.jsx');
const SignupForm = require('./SignupForm.jsx');

// the login page component
const Login = ({ csrf }) => {
    return (<>
        <h1>Welcome to Chalk!</h1>
        <p>Love Twitter, but need less words to choose from? Tired of politics, religion, and toxicity? Chalk has you covered. Send messages using pre-defined templates.</p>
        <LoginForm csrf={csrf}/>
        <hr />
        <SignupForm csrf={csrf}/>
    </>)
}

const init = async () => {
    const response = await fetch('/getToken');
    const { csrfToken } = await response.json();
    
    ReactDOM.render(<Login csrf={csrfToken}/>, document.querySelector('#root'));
};

window.onload = init;
