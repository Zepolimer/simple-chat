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
 * Public endpoint : GET all channels
*/
describe('GET /api/channels', () => {
  it('should return all public channels', async () => {
    const res = await request(app)
      .get('/api/channels');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});


/** 
 * Private endpoints : Channel CRUD
*/
describe('User logged in with JWT', () => {
  let token = '';
  let user_id = 0;
  let channel_id = 0;

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

  it('Should update channel', async () => {
    const res = await request(app)
      .put(`/api/user/${user_id}/channel/${channel_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'update__channel__name__test',
        private: false,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.updated).toBe('update__channel__name__test');
  });

  it('Should return channel informations', async () => {
    const res = await request(app)
      .get(`/api/channel/${channel_id}/info`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.channel.name).toBe('update__channel__name__test');
  });

  it('Should return user channels', async () => {
    const res = await request(app)
      .get(`/api/user/${user_id}/channels`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('Should return channels where user is not a member of them', async () => {
    const res = await request(app)
      .get(`/api/user/${user_id}/channelstojoin`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
    expect(res.body.data.length).toBeGreaterThan(0);
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
