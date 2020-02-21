const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./db');
const Post = require('./models/post');
const app = express();
const port = 3203;

app.use(bodyParser.json());

const forceSync = process.env.NODE_ENV == "test";
sequelize.sync()
.then(res => {  
  console.log('DB RESPONSE');
  console.log(res);
  app.listen(port, ()=> console.log(`listening on ${port}`));
})
.catch(err => {
  console.log('ERROR');
  console.log(err);
});

// create post
app.post('/post', (req, res)=> {  
  Post.create({
    title: req.body.title,
    content: req.body.content
  })
  .then(post => res.status(200).json(post))
  .catch(err => res.status(500).send({error: err}));  
});

// get posts
app.get('/posts', (req, res) => {
  Post.findAll()
  .then(posts => res.status(200).json(posts))
  .catch(err => console.log(err));  
});

// get post by id
app.get('/post/:id', (req, res) => {
  console.log(req.params.id);  
  Post.findByPk(req.params.id)
  .then(post => {
    if (post) return res.status(200).send(post);
    res.status(500).send({error: "Post not found"});
  })
  .catch(err => res.status(500).send({error: "Post not found"}));  
});

// update post by id
app.put('/post/:id', (req, res) => {
  const { title, content} = req.body;
  const  id  = req.params.id; 
  console.log(id);
  console.log(title, content, id);
  Post.update(
    {
      title, content
    },
    {
      returning: true,       
      plain: true,
      where: {id} 
    })
  .then( _ => Post.findByPk(id))
  .then(post => res.status(200).json(post))
  .catch(err => res.status(500).send({error: "Post not fdfdffound"}));  
}); 

// delete post
app.delete('/posts/:id', (req, res) => {  
  const { id } = req.params;
  Post.findByPk(id)
  .then(post => {    
    post.destroy();    
  })
  .then(result => {
    console.log(result);
    res.status(200).send({success: true});
  })
  .catch(err => res.status(500).send({error: "Post not del found"}));  
});

module.exports = app;

