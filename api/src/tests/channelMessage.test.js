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
  let channel_id = 0;
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
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'username@test.com',
        password: 'test',
      });

    token = res.body.data.access_token;
    user_id = res.body.data.user_id
  });

  beforeAll(async () => {
    const res = await request(app)
      .post(`/api/user/${user_id}/channel`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'channel__name__test',
        private: false,
      });

    channel_id = res.body.data.id;
  });

  beforeAll(async () => {
    const res = await request(app)
      .post(`/api/user/${user_id}/channel/${channel_id}/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Channel message as a unitTest is cool !',
      });

      message_id = res.body.data.id;
  });

  it('Should return channel messages', async () => {
    const res = await request(app)
      .get(`/api/channel/${channel_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.channel_id).toBe(channel_id.toString());
    expect(res.body.data.messages.length).toBeGreaterThan(0);
  });

  it('Should update message', async () => {
    const res = await request(app)
      .put(`/api/user/${user_id}/channel/${channel_id}/message/${message_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'Update a Channel message is cool !',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.updated).toBe('Update a Channel message is cool !');
  });

  it('Should delete channel message', async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}/channel/${channel_id}/message/${message_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });

  it('Should delete channel', async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}/channel/${channel_id}`)
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
});
