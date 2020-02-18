const uuidv4 = require('uuid/v4');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3203;

app.use(bodyParser.json());

const posts = [
  {
    title:'Post1',
    content: 'Post 1 Content'   ,
    id: uuidv4() 
  },
  {
    title:'Post2',
    content: 'Post 2 Content',
    id: uuidv4() 
  },
  {
    title:'Post3',
    content: 'Post 3 Content',
    id: uuidv4()
  }
];

//CREATE
app.post('/posts', (req, res)=> {
  const post = req.body;
  post.id = uuidv4();
  posts.push(post);    
  return res.status(200).json(posts[posts.length-1]);
});

//READ
app.get('/posts', (req, res)=> res.status(200).json(posts));
app.get('/post/:id', (req, res)=> res.status(200).json(posts[req.params.id]));
app.put('/post/:id', (req, res) => { 
  const updatedPost = req.body;  
  const postIndex = posts.findIndex(post => post.id === req.params.id);   
  if (postIndex == -1) return res.status(500).send({error: "Post not found"}); 
  posts[postIndex] = updatedPost;
  return res.status(200).json(posts[postIndex]);
});  

app.delete('/post/:id', (req, res) => {  
  const postIndex = posts.findIndex(post => post.id === req.params.id);   
  if (postIndex == -1) return res.status(500).send({error: "Post not found"});  
  const deletedPost = posts.splice(postIndex, 1);  
  return res.status(200).json(deletedPost[0]);
});

app.listen(port, ()=> console.log(`listening on ${port}`));

module.exports = app;

