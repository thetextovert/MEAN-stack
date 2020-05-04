const express = require('express');
const Post = require('../Model/post');
/* Multer adds a body object and a file or files object to the request object.
 The body object contains the values of the text fields of the form,
 the file or files object contains the files uploaded via the form.*/
 const multer=require ('multer');
 var upload = multer({ dest: 'backend/images' }); // where the media files will be uploaded
const router = express.Router();

//adding all the crud operations here in router file to make the code clear

//api requests
router.get('', (req, res, next) => {

  Post.find().then((document) => {
    console.log("from get method" + document);
    res.status(200).json({
      message: 'server successfully fetched posts',
      posts: document
    });
  })

  // next(); //imp to call next because it will not let you proceed
});

router.post('',upload.single('image'), (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image : req.file
  });
  post.save();//mongoose save feature will save this post as document in posts collection (automatically generate corresponding to Post model)
  res.status(201).json({
    message: 'data posted successfully',
    id: post._id
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "post updated" });
    })
    .catch((err) => {
      console.log(err);
    })

});




router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id }, (err) => {
    if (err) console.log(err);
    res.status(201).json({ message: "post deleted" });

  });
});

module.exports = router;
