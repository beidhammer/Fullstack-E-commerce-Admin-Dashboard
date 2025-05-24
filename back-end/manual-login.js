const request = require('supertest');
const app = require('./app');

(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      emailOrUsername: 'admin@example.com',
      password: 'password123',
    });

  console.log('Login response:', res.body);
})();