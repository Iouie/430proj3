const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', {
    csrfToken: req.csrfToken(),
  });
};

const notFoundPage = (req, res) => {
  res.render('404', { csrfToken: req.csrfToken(),
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to cover security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.password}`;

  if (!username || !password) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong username or password',
      });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({
      redirect: '/maker',
    });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({
      error: 'Passwords do not match',
    });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({
        redirect: '/maker',
      });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({
          error: 'Username already in use.',
        });
      }

      return res.status(400).json({
        error: 'An error occurred',
      });
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  req.body.currPass = `${req.body.currPass}`;
  req.body.newPass = `${req.body.newPass}`;
  req.body.newPass2 = `${req.body.newPass2}`;

  if (!req.body.currPass || !req.body.newPass || !req.body.newPass2) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  if (req.body.newPass !== req.body.newPass2) {
    return res.status(400).json({
      error: 'Passwords do not match',
    });
  }

  return Account.AccountModel.authenticate(req.session.account.username, req.body.currPass,
    (err, pass) => {
      if (err || !pass) {
        return res.status(401).json({
          error: 'Current Password is incorrect.',
        });
      }

      return Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
        const findUser = {
          username: `${req.session.account.username}`,
        };

        Account.AccountModel.update(findUser, {
          $set: {
            password: hash,
            salt,
          },
        }, {}, (error) => {
          if (error) {
            return res.status(500).json({
              error: 'Cannot update password at the moment.',
            });
          }

          return res.status(200).json({
            redirect: '/login',
          });
        });
      });
    }
  );
};

// get CSRF token
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports = {
  loginPage,
  notFoundPage,
  logout,
  login,
  signup,
  changePassword,
  getToken,
};
