const helper = require('./helper.js');

// the form component for signing up for an account
const SignupForm = ({ csrf }) => {
    const handleSignup = (e) => {
        e.preventDefault();
        helper.hideError();

        const username = e.target.querySelector('#user').value;
        const pass = e.target.querySelector('#pass').value;
        const pass2 = e.target.querySelector('#pass2').value;
        const _csrf = e.target.querySelector('#_csrf').value;
    
        if(!username || !pass || !pass2) {
            helper.handleError('Username or password is empty!');
            return false;
        }
    
        if(pass !== pass2) {
            helper.handleError('Passwords do not match!');
            return false;
        }
    
        helper.sendPost(e.target.action, {username, pass, pass2, _csrf});

        return false;
    }

    return (
        <>
        <h1>Sign Up</h1>
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={csrf} />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
        </>
    );
}

module.exports = SignupForm;