//here we create our express app
const express = require('express');
const bp = require('body-parser');
const Post = require('./Model/post');
const mongoose = require('mongoose');
const app = express(); //express app created
// const connectionString="mongodb+srv://ishani:fJHzqjA6yDgg97Vg@cluster0-asi4q.mongodb.net/test?retryWrites=true&w=majority";
//creating connection with mongodbATLAS
mongoose.connect("mongodb://ishani:fJHzqjA6yDgg97Vg@cluster0-shard-00-00-asi4q.mongodb.net:27017,cluster0-shard-00-01-asi4q.mongodb.net:27017,cluster0-shard-00-02-asi4q.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{ useNewUrlParser: true })
  .then(() => { console.log('DB Connection Successfull'); })
  .catch((error) => { console.log('DB connection failed');
console.log(error) });

  // fJHzqjA6yDgg97Vg

//middle ware created. We can have multiple middleware as per our convinience
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS")

  next();
})//this middleware is created to ignore CORS error

//api requests
app.get('/api/posts', (req, res, next) => {
  const posts = [{
    id: '65sdf',
    title: 'first post',
    content: 'this is the first post from the server'
  },
  {
    id: '6s4df',
    title: 'second post',
    content: 'this is the second post from the server'
  }];

  res.status(200).json({
    message: 'server successfully fetched posts',
    posts: posts
  });
  // next(); //imp to call next because it will not let you proceed
});

app.post('/api/addposts', (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({ message: 'data posted successfully' });
});


module.exports = app;
