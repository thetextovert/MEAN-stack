//here we create our express app
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const router = require('./Routes/router');
const app = express(); //express app created
//creating connection with mongodbATLAS
mongoose.connect("mongodb://ishani:fJHzqjA6yDgg97Vg@cluster0-shard-00-00-asi4q.mongodb.net:27017,cluster0-shard-00-01-asi4q.mongodb.net:27017,cluster0-shard-00-02-asi4q.mongodb.net:27017/blog-post-db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => { console.log('DB Connection Successfull'); })
  .catch((error) => {
    console.log('DB connection failed');
    console.log(error)
  });



//middle ware created. We can have multiple middleware as per our convinience
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS")

  next();
})//this middleware is created to ignore CORS error
app.use("/api/posts", router);//routing related code should appear after the middleware handling CORS

//api requests
// app.get('/api/posts', (req, res, next) => {

//   Post.find().then((document) => {
//     console.log("from get method" + document);
//     res.status(200).json({
//       message: 'server successfully fetched posts',
//       posts: document
//     });
//   })

//   // next(); //imp to call next because it will not let you proceed
// });

// app.post('/api/addposts', (req, res, next) => {
//   // const post = req.body;
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save();//mongoose save feature will save this post as document in posts colleoction (automatically generate corresponding to Post model)
//   res.status(201).json({
//     message: 'data posted successfully',
//     id: post._id
//   });
// });

// app.put('/api/addposts/:id', (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({ _id: req.params.id }, post)
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({ message: "post updated" });
//     })
//     .catch((err)=>{
//       console.log(err);
//     })

// });




// app.delete('/api/addposts/:id', (req, res, next) => {
//   const id = req.params.id;
//   Post.deleteOne({ _id: id }, (err) => {
//     if (err) console.log(err);
//     res.status(201).json({ message: "post deleted" });

//   });
// });

module.exports = app;
