const UserPost = require('./models/userPost');

const createPost = (req, res)=> {  
  UserPost.create({
    title: req.body.title,
    content: req.body.content
  })
  .then(userPost => res.status(200).json(userPost))
  .catch(err => res.status(500).send({error: 'Unable to create post'}));  
}

const getAllPosts = (req, res) => {
  UserPost.findAll()
  .then(posts => res.status(200).json(posts))
  .catch(err => console.log(err));  
}

const getPost =  (req, res) => { 
  UserPost.findByPk(req.params.id)
  .then(post => {
    if (post) return res.status(200).send(post);
    res.status(500).send({error: "Post not found"});
  })
  .catch(err => res.status(500).send({error: "Post not found"}));  
}

const updatePost = (req, res) => {  
  UserPost.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    { where: {id: req.params.id}})
  .then( _ => UserPost.findByPk(req.params.id))
  .then(post => {
    if (post) return res.status(200).send(post);
    res.status(500).send({error: "Post not found, unable to update"});
  })
  .catch(err => res.status(500).send({error: "Post not found, unable to update"}));  
}

const deletePost = (req, res) => {  
  const { id } = req.params;
  UserPost.findByPk(id)
  .then(post => {    
    post.destroy();    
  })
  .then(result => {
    console.log(result);
    res.status(200).send({success: true});
  })
  .catch(err => res.status(500).send({error: "Post not found, unable to delete"}));  
}

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
}