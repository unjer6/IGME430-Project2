const Feed = require('./Feed.jsx');

// component with 4 tabs containing the 4 feeds
const TabbedFeeds = () => {
    return (
        <div className='container mt-2 bottom-0'>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className="nav-link ms-3 px-md-5 px-4 text-dark active" data-bs-toggle="tab" data-bs-target="#recent" type="button">Recent</button>
                </li>
            </ul>
            <div className="tab-content bg-white p-3">
                <div className="tab-pane show active" id="recent"><Feed type="recent"/></div>
            </div>
        </div>
    )
}

module.exports = TabbedFeeds;