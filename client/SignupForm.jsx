const helper = require('./helper.js');

// the form component for signing up for an account
const SignupForm = ({ csrf }) => {
    const handleSignup = (e) => {
        e.preventDefault();
        helper.hideSuccessAndError();

        const username = e.target.querySelector('#username').value;
        const pass = e.target.querySelector('#password1').value;
        const pass2 = e.target.querySelector('#password2').value;
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
        <form
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
        >
            <legend>Sign Up</legend>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password1" />
            </div>
            <div className="mb-3">
                <label htmlFor="password2" className="form-label">Retype Password</label>
                <input type="password" className="form-control" id="password2" />
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={csrf} />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    );
}

module.exports = SignupForm;