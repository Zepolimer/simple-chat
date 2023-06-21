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
 * Security :
 * Check JWT
 * Check user ID sent as param in URL
*/
describe('Handle security exceptions', () => {
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

  it('User - Error 401 : credential error', async () => {
    const res = await request(app)
      .put(`/api/user/${user_id}`)
      .set('Authorization', `Bearer abc123DEF435`)
      .send({
        username: 'username__test',
      });

    expect(res.statusCode).toBe(401);
  });

  it('User - Error 401 : user ID is uncorrect', async () => {
    const res = await request(app)
      .get(`/api/user/2`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(401);
  });

  it('Channel - Error 401 : credential error', async () => {
    const res = await request(app)
      .post(`/api/user/${user_id}/channel`)
      .set('Authorization', `Bearer abc123DEF435`)
      .send({
        name: 'channel__name__test',
        private: false,
      });

    expect(res.statusCode).toBe(401);
  });

  it('Channel - Error 500 : user ID is uncorrect', async () => {
    const res = await request(app)
      .post(`/api/user/2/channel`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'channel__name__test',
        private: false,
      });

    expect(res.statusCode).toBe(500);
  });

  afterAll(async () => {
    const res = await request(app)
      .delete(`/api/user/${user_id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Success');
  });
});