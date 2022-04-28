const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// PostSchema.static.toAPI = (doc) => ({
//   content: doc.content,
//   likes: doc.likes,
//   dislikes: doc.dislikes,
// });

// PostSchema.statics.findByOwner = (ownerId, callback) => {
//   const search = {
//     owner: mongoose.Types.ObjectId(ownerId),
//   };

//   return PostModel.find(search).select('content likes dislikes').lean().exec(callback);
// };

// PostSchema.statics.deleteByOwnerAndName = (ownerId, name, callback) => {
//   const search = {
//     owner: mongoose.Types.ObjectId(ownerId),
//     name,
//   };

//   return DomoModel.deleteOne(search).exec(callback);
// };

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
