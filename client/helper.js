/* Takes in an error message. Sets the error message up in html, and
   displays it to the user. Will be hidden by other events that could
   end in an error.
*/
const handleError = (message) => {
    let errorMessage = document.querySelector('#errorMessage');
    let errorContainer = document.querySelector('#errorContainer');
    if (errorMessage) errorMessage.textContent = message;
    if (errorContainer) errorContainer.classList.remove('d-none');
};

const handleSuccess = (message) => {
    let successMessage = document.querySelector('#successMessage');
    let successContainer = document.querySelector('#successContainer');
    if (successMessage) successMessage.textContent = message;
    if (successContainer) successContainer.classList.remove('d-none');
};

const hideSuccessAndError = () => {
    let errorContainer = document.querySelector('#errorContainer');
    let successContainer = document.querySelector('#successContainer');
    if (errorContainer) errorContainer.classList.add('d-none');
    if (successContainer) successContainer.classList.add('d-none');
}

/* Sends post requests to the server using fetch. Will look for various
    entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if(result.redirect) {
        window.location = result.redirect;
    }

    if(result.error) {
        handleError(result.error);
    }

    if(handler) {
        handler(result);
    }
};

const sendDelete = (url, data) => {
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

module.exports = {
    handleError,
    handleSuccess,
    hideSuccessAndError,
    sendPost,
    sendDelete,
};