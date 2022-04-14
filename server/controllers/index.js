// render 404 not found page
const notFoundPage = (req, res) => {
    res.status(404).render('notFound');
};

module.exports.Account = require('./Account.js');
module.exports.Post = require('./Post.js');
module.exports.App = require('./App.js');
module.exports.notFoundPage = notFoundPage;