const { v4: uuidv4 } = require('uuid');

// special select element for PostForm
const Navbar = ({ currentPage }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(undefined);

    React.useEffect(async () => {
        const res = await fetch('/isLoggedIn');
        const json = await res.json();
        
        if (json?.result !== undefined)
            setIsLoggedIn(json.result);
    }, []);

    let myAccountNav = <></>;
    if (isLoggedIn === true) {
        myAccountNav = (
            <li className="nav-item me-2">
                <a className={currentPage === "Account" ? "nav-link active" : "nav-link"} href="/account">My Account</a>
            </li>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand fs-3" href="/">
                    <img src="/assets/img/brand.png" alt="" width="30" height="30" className="me-2" />
                    Chalk
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item me-2">
                            <a className={currentPage === "Home" ? "nav-link active" : "nav-link"} href="/">Home</a>
                        </li>
                        {myAccountNav}
                        <li className="nav-item me-2">
                            <a className={currentPage === "Login" ? "nav-link active" : "nav-link"} href={isLoggedIn === true ? "/logout" : "/login"}>{isLoggedIn === true ? "Logout" : "Login"}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

module.exports = Navbar;