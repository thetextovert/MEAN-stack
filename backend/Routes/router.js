const express = require('express');
const Post = require('../Model/post');
/* Multer adds a body object and a file or files object to the request object.
 The body object contains the values of the text fields of the form,
 the file or files object contains the files uploaded via the form.*/
 const multer=require ('multer');
//  var upload = multer({ dest: 'backend/images' }); // where the media files will be uploaded
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'backend/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpeg')
// The Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
  }
});
var upload = multer({ storage: storage });

const router = express.Router();

//adding all the crud operations here in router file to make the code clear

//api requests
router.get('', (req, res, next) => {

  Post.find().then((document) => {
    // console.log("from get method" + document);
    res.status(200).json({
      message: 'server successfully fetched posts',
      posts: document
    });
  })

  // next(); //imp to call next because it will not let you proceed
});



router.post('',upload.single('image'), (req, res, next) => {
  // const post = req.body;
// creating a url for media files and storing that on db
  const url= req.protocol+"://"+req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath : url+'/images/'+req.file.filename
  });

  post.save().then((createdPost)=>{//mongoose save feature will save this post as document in posts collection (automatically generate corresponding to Post model)
  res.status(201).json({
    message: 'data posted successfully',

    post:{
      ...createdPost,
    id: createdPost._id,
    // imagePath : post.imagePath,
    }
  });
});
});

router.put('/:id',upload.single('image'), (req, res, next) => {
  const url= req.protocol+"://"+req.get('host');
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath : url+'/images/'+req.file.filename
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(() => {
      res.status(201).json({ message: "post updated",
    imagePath: post.imagePath });
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
