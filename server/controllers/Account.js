// controllers for account management
const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login');
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = account.toAPI();

    return res.json({ redirect: '/' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = newAccount.toAPI();
    return res.json({ redirect: '/' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

const isLoggedIn = (req, res) => {
  if (req.session.account) return res.json({ result: true });

  return res.json({ result: false });
};

const getUsername = (req, res) => res.json({ username: req.session.account.username });

const changePassword = async (req, res) => {
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const search = { username: req.session.account.username };
    const data = { password: hash };
    const updatedAccount = await Account.findOneAndUpdate(search, data, { new: true }).exec();
    req.session.account = updatedAccount.toAPI();
    return res.json({});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const togglePremium = async (req, res) => {
  try {
    const search = { username: req.session.account.username };
    const data = { premium: !req.session.account.premium };
    const updatedAccount = await Account.findOneAndUpdate(search, data, { new: true }).exec();
    req.session.account = updatedAccount.toAPI();
    return res.json({ premium: req.session.account.premium });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const getHasPremium = (req, res) => res.json({ premium: req.session.account.premium });

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  getToken,
  isLoggedIn,
  getUsername,
  changePassword,
  togglePremium,
  getHasPremium,
};
