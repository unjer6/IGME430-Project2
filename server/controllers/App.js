// controllers for app pages
const { templates, conjunctions, words } = require('../words.js');

const appPage = (req, res) => res.render('app');

const accountPage = (req, res) => res.render('account');

const getTemplates = (req, res) => { res.json({ templates }); };

const getConjunctions = (req, res) => { res.json({ conjunctions }); };

const getWords = (req, res) => { res.json({ words }); };

module.exports = {
  appPage,
  accountPage,
  getTemplates,
  getConjunctions,
  getWords,
};
