// post malone's friend from high school
// the modal that pops up when you hit the plus button and the button itself
const PostForm = require('./PostForm.jsx');
const emitter = require('./EventEmitter.js');

const PostModal = () => {
    const emitReset = () => {
        emitter.emit('post-reset');
    }
    const emitSend = () => {
        emitter.emit('post-send');
    }

    return (<>
        <button type="button" className="btn btn-primary post-button position-fixed bottom-0 end-0 p-0 me-5 mb-5 rounded-circle" data-bs-toggle="modal" data-bs-target="#postModal">
            <img src='/assets/img/plus.png' alt='plus-sign' width='75' height='75'/>
        </button>

        <div className="modal fade" id="postModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Message</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <PostForm />
                        <div id="errorContainer" className="d-none alert alert-danger d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <div id="errorMessage"></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={emitReset}>Reset</button>
                        <button type="button" className="btn btn-primary" onClick={emitSend}>Send Message</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

module.exports = PostModal;