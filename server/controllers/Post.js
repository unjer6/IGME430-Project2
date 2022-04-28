// controllers for post data management (creating, likes, dislikes)
const models = require('../models');

const { Post } = models;
const { templates, conjunctions, words } = require('../words.js');

// makes a new post
const makePost = async (req, res) => {
  const { template1 } = req.body;
  const { category1 } = req.body;
  const { word1 } = req.body;
  const { conjunction } = req.body;
  const { template2 } = req.body;
  const { category2 } = req.body;
  const { word2 } = req.body;

  if (!template1 || !category1 || !word1) {
    return res.status(400).json({ error: 'First template and word are required!' });
  }

  if (conjunction && (!template2 || !category2 || !word2)) {
    return res.status(400).json({ error: 'Second template and word are required with a conjunction!' });
  }

  if (!templates.includes(template1)
    || !Object.keys(words).includes(category1)
    || !words[category1].includes(word1)) {
    return res.status(400).json({ error: 'First half uses a template or word not found in pre-defined sets.' });
  }

  if (conjunction && !conjunctions.includes(conjunction)) {
    return res.status(400).json({ error: 'The conjunction is not found in pre-defined set of conjunctions.' });
  }

  if (conjunction
    && (!templates.includes(template2)
    || !Object.keys(words).includes(category2)
    || !words[category2].includes(word2))) {
    return res.status(400).json({ error: 'Second half uses a template or word not found in pre-defined sets.' });
  }

  let content = `${template1.replace('****', word1)}`;
  if (conjunction) {
    content += `\n${conjunction} ${template2.replace('****', word2)}`;
  }
  const data = {
    content,
    owner: req.session.account._id,
  };

  try {
    const newPost = new Post(data);
    await newPost.save();
    return res.status(201).json({ message: 'successfully posted' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured' });
  }
};
// likes a post
const likePost = () => {};

// gets all recent posts
const getRecent = (req, res) => {
  Post.find({}, null, { limit: 50, sort: { createdDate: -1 } }).populate('owner', 'username').select('content likes owner').lean()
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred!' });
      }

      return res.json({ posts: docs });
    });
};
// gets all popular posts
const getPopular = () => {};
// gets all posts from those you follow
const getFollowing = () => {};
// gets all posts you have liked
const getLiked = () => {};

// const getDomos = (req, res) => DomoModel.findByOwner(req.session.account._id, (err, docs) => {
//   if (err) {
//     console.log(err);
//     return res.status(400).json({ error: 'An error occurred!' });
//   }

//   return res.json({ domos: docs });
// });

// const deleteDomo = (req, res) => {
//   if (!req.body.name) {
//     return res.status(400).json({ error: 'Name is required! ' });
//   }

//   DomoModel.deleteByOwnerAndName(req.session.account._id, req.body.name, (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(400).json({ error: 'An error occurred!' });
//     }

//     return res.sendStatus(204);
//   });

//   return false;
// };

module.exports = {
  makePost,
  likePost,
  getRecent,
  getPopular,
  getFollowing,
  getLiked,
};
