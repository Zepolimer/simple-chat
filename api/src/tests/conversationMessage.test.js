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
 * Private endpoints : Channel Messages CRUD
*/
describe('User logged in with JWT', () => {
  let token = '';
  let user_id = 0;
  let second_user_id = 0;
  let second_user_token = '';
  let conversation_id = 0;
  let message_id = 0;

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
    await request(app)
      .post('/api/register')
      .send({
        username: 'second_username__test',
        email: 'second_username@test.com',
        password: 'test',
        firstname: 'second_first__test',
        lastname: 'second_last__test',
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
    user_id = res.body.data.user_id;
  });

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'second_username@test.com',
        password: 'test',
      });

    second_user_token = res.body.data.access_token;
    second_user_id = res.body.data.user_id;
  });

  beforeAll(async () => {
    const res = await request(app)
      .post(`/api/user/${user_id}/conversation/${second_user_id}`)
      .set('Authorization', `Bearer ${token}`)

    conversation_id = res.body.data.id
  });

  beforeAll(async () => {
    const res = await request(app)
      .post(`/api/user/${user_id}/conversation/${conversation_id}/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'A cool message to my friend !'
      })

    message_id = res.body.data.id;
  });

  it('Should return all messages from user conversation', async () => {
    const res = await request(app)
      .get(`/api/user/${user_id}/conversation/${conversation_id}/message`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });

  it('Should update one message from user conversation', async () => {
    const res = await request(app)
      .put(`/api/user/${user_id}/conversation/${conversation_id}/message/${message_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        message: 'An updated cool message to my friend' 
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.updated).toBe('An updated cool message to my friend');
  });

  it('Should delete one message from user conversation', async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}/conversation/${conversation_id}/message/${message_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });

  it('Should delete this user conversation', async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}/conversation/${conversation_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });

  afterAll(async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });

  afterAll(async () => {
    const res = await request(app)
      .delete(`/api/user/${second_user_id}`)
      .set('Authorization', `Bearer ${second_user_token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });
});
