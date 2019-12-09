const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getFoods', mid.requiresLogin, controllers.Calories.getFoods);
  app.get('/getVideos', mid.requiresLogin, controllers.Calories.getVideos);
  app.post('/deleteFood', mid.requiresSecure, mid.requiresLogin, controllers.Calories.deleteFood);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin,
  controllers.Account.changePassword);
  app.get('/maker', mid.requiresLogin, controllers.Calories.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Calories.make);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/*', mid.requiresSecure, mid.requiresLogin, controllers.Account.notFoundPage);
};

module.exports = router;

