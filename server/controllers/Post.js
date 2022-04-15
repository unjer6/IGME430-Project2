// controllers for post data management (creating, likes, dislikes)
// const models = require('../models');
// const { Post } = models;

// makes a new post
const makePost = () => {};
// deletes a post
const deletePost = () => {};
// likes a post
const likePost = () => {};
// dislikes a post
const dislikePost = () => {};

// gets all recent posts
const getRecent = () => {};
// gets all popular posts
const getPopular = () => {};
// gets all posts from those you follow
const getFollowing = () => {};
// gets all posts you have liked
const getLiked = () => {};

// const makeDomo = async (req, res) => {
//   if (!req.body.name || !req.body.age || !req.body.height) {
//     return res.status(400).json({ error: 'Name, age, and height are required!' });
//   }

//   const domoData = {
//     name: req.body.name,
//     age: req.body.age,
//     height: req.body.height,
//     owner: req.session.account._id,
//   };

//   try {
//     const newDomo = new Domo(domoData);
//     await newDomo.save();
//     return res.status(201)
//      .json({ name: newDomo.name, age: newDomo.age, height: newDomo.height });
//   } catch (err) {
//     console.log(err);
//     if (err.code === 11000) {
//       return res.status(400).json({ error: 'Domo already exists!' });
//     }
//     return res.status(400).json({ error: 'An error occured' });
//   }
// };

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
  deletePost,
  likePost,
  dislikePost,
  getRecent,
  getPopular,
  getFollowing,
  getLiked,
};
