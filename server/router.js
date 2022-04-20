const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // database request and session request routes
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getTemplates', controllers.App.getTemplates);
  app.get('/getConjunctions', controllers.App.getConjunctions);
  app.get('/getPhrases', controllers.App.getPhrases);
  app.get('/getRecent', controllers.Post.getRecent);
  app.get('/getPopular', controllers.Post.getPopular);
  app.get('/getFollowing', mid.requiresLogin, controllers.Post.getFollowing);
  app.get('/getLiked', mid.requiresLogin, controllers.Post.getLiked);

  // account session management
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // routes that create or change post docs
  app.post('/post', mid.requiresLogin, controllers.Post.makePost);
  app.delete('/deletePost', mid.requiresLogin, controllers.Post.deletePost);
  app.post('/like', mid.requiresLogin, controllers.Post.likePost);
  app.post('/dislike', mid.requiresLogin, controllers.Post.dislikePost);

  // THE app home page. Contains post feed
  app.get('/', controllers.App.appPage);
  // the account page
  app.get('/account', controllers.App.accountPage);

  // leaving this here as a reminder that we may redirect here from other routes if necessary
  app.get('/notFound', controllers.notFoundPage);
  // anything else is not found
  app.get('*', controllers.notFoundPage);
};

module.exports = router;
