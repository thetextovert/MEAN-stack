const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type:String},
});

module.exports=mongoose.model('Post',postSchema);
//automatically generates a collection names "posts"
