//here we create our express app
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const router = require('./Routes/router');
const app = express(); //express app created
const path=require("path");
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
//path.join is used for connecting backend folders in the url
app.use("/images",express.static(path.join("backend/images")))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS")

  next();
})//this middleware is created to ignore CORS error

//routing related code should appear after the middleware handling CORS
app.use("/api/posts", router);
module.exports = app;
