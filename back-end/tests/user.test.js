const request = require('supertest');
const app = require('../app');
const db = require('../models');

describe('User API', () => {
  let createdUser;

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        firstname: 'Test',
        lastname: 'User',
        username: 'testuser123',
        email: 'test@example.com',
        password: 'securepassword'
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('test@example.com');
    createdUser = res.body;
  });

  it('should fetch a single user by id', async () => {
    const res = await request(app)
      .get(`/users/${createdUser.id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should update the user', async () => {
    const res = await request(app)
      .put(`/users/${createdUser.id}`)
      .send({
        firstname: 'Updated',
        lastname: 'User'
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.firstname).toBe('Updated');
    expect(res.body.lastname).toBe('User');
  });

  it('should delete the user', async () => {
    await request(app)
      .delete(`/users/${createdUser.id}`)
      .expect(204);

    await request(app)
      .get(`/users/${createdUser.id}`)
      .expect(404);
  });
});