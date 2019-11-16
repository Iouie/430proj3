const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/userPage', mid.requiresLogin, controllers.Account.userPage);
  app.get('/', controllers.Account.homePage);
  app.get('/homePage', controllers.Account.homePage);
  // app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
};

module.exports = router;

