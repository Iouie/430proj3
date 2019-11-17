const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/userPage', mid.requiresLogin, controllers.Account.userPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.homePage);
  app.get('/homePage', mid.requiresSecure, controllers.Account.homePage);
  app.get('/myPage', mid.requiresSecure, mid.requiresLogin, controllers.Account.myPage);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin,
  controllers.Account.changePassword);
  app.get('/maker', mid.requiresLogin, controllers.Calories.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Calories.make);
  app.get('/*', controllers.Account.notFoundPage);
};

module.exports = router;

