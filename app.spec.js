const request = require('supertest');
const app = require('./app');

describe('App', async ()=> {
  it('should get posts', () => {
    const response= await.get('posts')
    .expects(200);
    expect(response.body).toBe('Bob');
  })
})