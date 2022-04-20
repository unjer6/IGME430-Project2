const helper = require('./helper.js');

// the form component for signing into your account
const LoginForm = ({ csrf }) => {
    const handleLogin = (e) => {
        e.preventDefault();

        helper.hideError();

        const username = e.target.querySelector('#user').value;
        const pass = e.target.querySelector('#pass').value;
        const _csrf = e.target.querySelector('#_csrf').value;
    
        if(!username || !pass) {
            helper.handleError('Username or password is empty!');
            return false;
        }
    
        helper.sendPost(e.target.action, {username, pass, _csrf});

        return false;
    }

    return (
        <>
        <h1>Login</h1>
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
        </>
    );
}

module.exports = LoginForm;