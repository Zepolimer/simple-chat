const request = require("supertest");
const {server, app} = require("../index");
const db = require('../models/index');

require("dotenv").config();


/* Connecting to the database before each test. */
beforeEach(async () => {
  await db.sequelize.sync()
  .then(() => { 
    console.log('Synced db.') 
  })
  .catch((err) => { 
    console.log('Error : ' + err.message) 
  });
});


/* Closing database connection after each test. */
afterEach(async () => {
  await server.close();
});


/** 
 * Public endpoint : GET all users
*/
describe('GET /api/users', () => {
  it('Should return all users', async () => {
    const res = await request(app)
      .get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});


/** 
 * Private endpoints : user CRUD
*/
describe('User logged in with JWT', () => {
  let token = '';
  let user_id = 0;

  beforeAll(async () => {
    await request(app)
      .post('/api/register')
      .send({
        username: 'username__test',
        email: 'username@test.com',
        password: 'test',
        firstname: 'first__test',
        lastname: 'last__test',
      });
  });

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'username@test.com',
        password: 'test',
      });

    token = res.body.data.access_token;
    user_id = res.body.data.user_id
  });

  it('Should return user informations', async () => {
    const res = await request(app)
      .get(`/api/user/${user_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });

  it('Should update user informations', async () => {
    const res = await request(app)
      .put(`/api/user/${user_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'update__first__test',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.updated.firstname).toBe('update__first__test');
  });

  it('Should delete user', async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });
});
