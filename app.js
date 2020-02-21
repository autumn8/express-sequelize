const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./db');
const app = express();
const port = 3203;
const userPosts = require('./userPosts');

app.use(bodyParser.json());

// create post
app.post('/posts', userPosts.createPost);

// get posts
app.get('/posts', userPosts.getAllPosts);

// get post by id
app.get('/posts/:id', userPosts.getPost);

// update post by id
app.put('/posts/:id', userPosts.updatePost); 

// delete post
app.delete('/posts/:id', userPosts.deletePost); 

sequelize.sync()
.then(res => {    
  app.listen(port, ()=> console.log(`listening on ${port}`));
})
.catch(err => {  
  console.log(err);
});


module.exports = app;

