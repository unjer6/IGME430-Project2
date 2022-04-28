// an ad component
const Ad = () => {
    return (
        <div className="ms-3 p-2 mb-3 border border-dark border-2">
            <h1 className="fs-6 mb-0 fw-bold fst-italic">Sponsered</h1>
            <p className="fs-3 mb-0 lh-sm fst-italic" style={{whiteSpace: 'pre-line'}}>This is an advertisement!</p>
        </div>
    )
};

module.exports = Ad;