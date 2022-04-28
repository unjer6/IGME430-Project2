const helper = require('./helper.js');

// the form component for signing into your account
const LoginForm = ({ csrf }) => {
    const handleLogin = (e) => {
        e.preventDefault();

        helper.hideSuccessAndError();

        const username = e.target.querySelector('#username').value;
        const pass = e.target.querySelector('#password').value;
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
        <form
            onSubmit={handleLogin}
            action="/login"
            method="POST"
        >
            <legend>Login</legend>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={csrf} />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    );
}

module.exports = LoginForm;