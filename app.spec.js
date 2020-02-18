const supertest = require('supertest');
const app = require('./app');
const req = supertest(app);

describe('GET /posts', ()=> {
  it('should have status code of 200', async () => {
    const res = await req.get('/posts');
    expect(res.status).toBe(200);
  });

  it ('should return an array of posts', async() => {
    const res = await req.get('/posts');
    expect(Array.isArray(res.body)).toBe(true);
  });

  it ('post should have properties, title & content', async() => {    
    const res = await req.get('/posts');
    const postID = Math.floor(Math.random() * res.body.length);
    expect(res.body[postID]).toHaveProperty('title');
    expect(res.body[postID]).toHaveProperty('content');
  })
});

describe('GET post/:id', () => {
  it('should return status code of 200', async () => {
    const res = await req.get('/post/0');
    expect(res.status).toBe(200);
  });

  it('should return an object', async () => {
    const res = await req.get('/post/0');
    expect(typeof res.body).toBe('object');
  });

  it('retrieved post should have title and content properties', async ()=> {
    const res = await req.get('/post/0');    
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('content');
  });
});


describe('POST /posts', () => {
  it ('should create a post', async ()=> {
    const res = await req.post('/posts')
    .send({
      title: 'New post',
      content: 'New post content'
    })
    .set('Accept', 'application/json')    
    

    expect(res.status).toBe(200);
  });

  it ('should return the post that was created', async ()=> {
    const userPost = {
      title: 'New post created',
      content: 'New post content created'
    }
    const res = await req.post('/posts')
    .send(userPost)
    .set('Accept', 'application/json')   
    

    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('content');
    expect(res.body.title).toBe(userPost.title);
    expect(res.body.content).toBe(userPost.content);
  });
});

describe('PUT /post/:id', () => {
  it ('should update a post and return status code of 200 if post exists', async ()=> {
    const userPost = {
      title: 'New post created',
      content: 'New post content created'
    };   

    const initialPostRes = await req.post('/posts')
    .send(userPost)
    .set('Accept', 'application/json');        
    
    const updatedUserPost =  Object.assign(initialPostRes.body, {
      title: 'Post title updated',
      content: 'Post content updated'
    });       
    const res = await req.put(`/post/${updatedUserPost.id}`)    
    .send(updatedUserPost)
    .set('Accept', 'application/json');        
    expect(res.status).toBe(200);    

  });

  it ('should update a post and return updated post', async ()=> {
    const userPost = {
      title: 'New post created',
      content: 'New post content created'
    };   

    const initialPostRes = await req.post('/posts')
    .send(userPost)
    .set('Accept', 'application/json');        
    
    const updatedUserPost =  Object.assign(initialPostRes.body, {
      title: 'Post title updated',
      content: 'Post content updated'
    });       
    const res = await req.put(`/post/${updatedUserPost.id}`)    
    .send(updatedUserPost)
    .set('Accept', 'application/json');  
    const returnedPost = res.body;
    expect(returnedPost).toHaveProperty('title');
    expect(returnedPost).toHaveProperty('content');  
    expect(returnedPost).toHaveProperty('id');
    expect(returnedPost.title).toBe(updatedUserPost.title);  
    expect(returnedPost.content).toBe(updatedUserPost.content);  
    expect(returnedPost.id).toBe(initialPostRes.body.id);  

  });

   it ('should return status code of 500 if attempting to update non-existant post', async ()=> {
    const userPost = {
      title: 'New post created',
      content: 'New post content created',
      id: '234234134'
    };   
    
    const res = await req.put(`/post/-1`)
    .send(userPost)
    .set('Accept', 'application/json');        

    expect(res.status).toBe(500);    
  });

  it ('should return error if attempting to update non-existant post', async ()=> {
    const userPost = {
      title: 'New post created',
      content: 'New post content created',
      id: '234234134'
    };   
    
    const res = await req.put(`/post/-1`)
    .send(userPost)
    .set('Accept', 'application/json');        

    expect(res.body).toHaveProperty('error');        
  });
 
});

describe('DELETE post/:id', () => {
  it('should delete an existing post', async ()=> {
    const postsRes = await req.get('/posts');
    const posts = postsRes.body;
    const randomPostIndex= Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomPostIndex];
    
    const res = await req.delete(`/post/${randomPost.id}`);
    expect(res.status).toBe(200);
  });

  it('should delete an existing post', async ()=> {
    const postsRes = await req.get('/posts');
    const posts = postsRes.body;
    const randomPostIndex= Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomPostIndex];
    
    const res = await req.delete(`/post/${randomPost.id}`);
    expect(res.status).toBe(200);
  });

  it('should return the deleted post', async ()=> {
    const postsRes = await req.get('/posts');
    const posts = postsRes.body;
    const randomPostIndex= Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomPostIndex];
    
    const res = await req.delete(`/post/${randomPost.id}`);
    const returnedPost = res.body;
    expect(returnedPost).toHaveProperty('title');
    expect(returnedPost).toHaveProperty('content');  
    expect(returnedPost).toHaveProperty('id');
    expect(returnedPost.title).toBe(randomPost.title);  
    expect(returnedPost.content).toBe(randomPost.content);  
    expect(returnedPost.id).toBe(randomPost.id);
    
  });
});

