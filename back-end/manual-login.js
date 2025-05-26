const request = require('supertest');
const app = require('./app');

(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({
      emailOrUsername: 'admin@noroff.no',
      password: 'P@ssword2023',
    });

  console.log('Login response:', res.body);
})();