const LoginForm = require('./LoginForm.jsx');
const SignupForm = require('./SignupForm.jsx');
const Navbar = require('./Navbar.jsx');

// the login page component
const Login = ({ csrf }) => {
    return (<>
        <Navbar currentPage="Login"/>

        <div className="container bg-white mt-2 p-3">
            <div className="row">
                <div className="col-lg-5 col-xl-4 col-12">
                    <h1>Welcome to Chalk!</h1>
                </div>
                <div className="col-lg-4 col-12">
                    <p>Love Twitter, but need less words to choose from? Tired of politics, religion, and toxicity?
                        Chalk has you covered. Send messages using our pre-defined templates.</p>
                </div>
            </div>
            
            <div className="row justify-content-between">
                <div className="col-lg-6 col-12">
                    <LoginForm csrf={csrf}/>
                </div>

                <hr className="d-lg-none"/>

                <div className="col-lg-6 col-12">
                    <SignupForm csrf={csrf}/>
                </div>
            </div>

            <div id="errorContainer" className="d-none alert alert-danger d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div id="errorMessage"></div>
            </div>
        </div>
    </>)
}

const init = async () => {
    const response = await fetch('/getToken');
    const { csrfToken } = await response.json();
    
    ReactDOM.render(<Login csrf={csrfToken}/>, document.querySelector('#root'));
};

window.onload = init;
