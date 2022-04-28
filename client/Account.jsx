const Navbar = require('./Navbar.jsx');
const helper = require('./helper.js');

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(undefined);
    const [username, setUsername] = React.useState(undefined);
    const [_csrf, setCsrf] = React.useState();
    const [premium, setPremium] = React.useState();

    React.useEffect(async () => {
        const res = await fetch('/isLoggedIn');
        const json = await res.json();

        if (json?.result !== undefined)
            setIsLoggedIn(json.result);
    }, []);

    React.useEffect(async () => {
        const res = await fetch('/getUsername');
        const json = await res.json();

        if (json?.username !== undefined)
            setUsername(json.username);
    }, []);

    React.useEffect(async () => {
        const res = await fetch('/getToken');
        const json = await res.json();

        setCsrf(json.csrfToken);
    }, []);

    React.useEffect(async () => {
        const res = await fetch('/getHasPremium');
        const json = await res.json();

        setPremium(json.premium);
    }, []);


    const changePassword = () => {
        helper.hideSuccessAndError();

        const pass = document.querySelector('#password1').value;
        const pass2 = document.querySelector('#password2').value;
    
        if(!pass || !pass2) {
            helper.handleError('Password is empty!');
            return false;
        }
    
        if(pass !== pass2) {
            helper.handleError('Passwords do not match!');
            return false;
        }
        
        document.querySelector('#password1').value = '';
        document.querySelector('#password2').value = '';

        helper.sendPost('/changePassword', {pass, pass2, _csrf}, (json) => {
            if(!json.error){
                helper.handleSuccess('Successfully changed passwords');
            }
        });

        return false;
    };

    const togglePremium = async (e) => {
        const res = await fetch('/togglePremium');
        const json = await res.json();

        if(!json.error){
            setPremium(json.premium);
        }
    };


    if(isLoggedIn === undefined){
        return(<>
            <Navbar currentPage="Account" />
        
            <div className="container bg-white mt-2 p-3">
                <div className="d-flex justify-content-center align-items-center p-3">
                    <div className="spinner-border" role="status" aria-hidden="true"></div>
                    <strong className="ps-3">Loading...</strong>
                </div>
            </div>
        </>)
    }

    if(isLoggedIn === false){
        return(<>
        <Navbar currentPage="Account" />
        
        <div className="container bg-white mt-2 p-3">
            <div className="d-flex justify-content-center">
                <h1>Not logged in! Please login or signup to view your account.</h1>
            </div>
        </div>
        </>)
    }

    return (
        <>
        <Navbar currentPage="Account" />
        
        <div className="container bg-white mt-2 p-3">
            <div className="row">
                <h1>{username}</h1>
            </div>

            <div className="row g-3 mb-2 align-items-center">
                <div className="col-lg-auto col-8">
                    <label htmlFor="password1" className="col-form-label">Change Password:</label>
                </div>
                <div className="col-lg-auto col-8 mt-0 mt-lg-3">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password1" placeholder="Password" />
                        <label htmlFor="password1">New Password</label>
                    </div>
                </div>
                <div className="col-lg-auto col-8">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password2" placeholder="Password" />
                        <label htmlFor="password2">Retype Password</label>
                    </div>
                </div>
                <div className="col-lg-auto col-8">
                    <button type="button" className="btn btn-primary" onClick={changePassword}>Submit</button>
                </div>
            </div>

            <div id="errorContainer" className="d-none alert alert-danger d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div id="errorMessage"></div>
            </div>

            <div id="successContainer" className="d-none alert alert-success d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div id="successMessage"></div>
            </div>

            <div className="row">
                <div className="col-auto">
                    <label htmlFor="getPremium" className="col-form-label">Toggle Premium:</label>
                </div>
                <div className="col-auto">
                    <button type="button" className={premium === true ? "btn btn-success" : "btn btn-danger"} onClick={togglePremium}>{premium === true ? "On" : "Off"}</button>
                </div>
            </div>
        </div>
        </>
    )
}

const init = () => {
    ReactDOM.render(<Account />, document.querySelector('#root'));
};

window.onload = init;