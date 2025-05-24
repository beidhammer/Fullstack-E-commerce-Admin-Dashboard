const db = require('../models');

db.sequelize.sync({ force: true }).then(async () => {
  // Add membership
  const membership = await db.Membership.create({
    id: 2,
    name: 'Standard',
    discount_percent: 10.0,
    min_quantity: 1
  });

  // Add role
  const role = await db.Role.create({
    id: 1,
    name: 'User'
  });

  const newUser = await db.User.create({
    firstname: 'Ola',
    lastname: 'Nordmann',
    username: 'olan',
    email: 'ola@example.com',
    password: 'securepassword',
    address: 'Gate 1, 1234 Oslo',
    phone: '12345678',
    role_id: role.id,
    membership_id: membership.id
  });

  console.log(newUser.toJSON());
});