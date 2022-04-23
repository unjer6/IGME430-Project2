// controllers for app pages

const appPage = (req, res) => res.render('app');

const accountPage = (req, res) => res.render('account');

const getTemplates = () => {};

const getConjunctions = () => {};

const getWords = () => {};

module.exports = {
  appPage,
  accountPage,
  getTemplates,
  getConjunctions,
  getWords,
};
