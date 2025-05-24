const axios = require('axios');
const db = require('../models');
const bcrypt = require('bcryptjs');

const { Role, Membership, User, Product, Brand, Category } = db;

exports.initializeDatabase = async (req, res) => {
  try {
    console.log('Starting database-init');

    // 1. Roles
    console.log('Adding roles');
    await Role.bulkCreate([
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' }
    ], { ignoreDuplicates: true });

    // 2. Membership
    console.log('Adding memberships');
    const memberships = [
      { name: 'Bronze', discount_percent: 0 },
      { name: 'Silver', discount_percent: 15, min_quantity: 15, max_quantity: 30 },
      { name: 'Gold', discount_percent: 30, min_quantity: 30 }
    ];
    
    for (const m of memberships) {
      await db.Membership.findOrCreate({
        where: { name: m.name },
        defaults: m
      });
    }

    // 3. Admin-user
    console.log('Adding adminuser');
    const hashedPassword = await bcrypt.hash('P@ssword2023', 10);
    await User.findOrCreate({
      where: { email: 'admin@noroff.no' },
      defaults: {
        firstname: 'Admin',
        lastname: 'Support',
        username: 'Admin',
        password: hashedPassword,
        address: 'Online',
        phone: '911',
        role_id: 1,
        membership_id: 1
      }
    });

    // 4. GET products from Noroff API
    console.log('GET products from external API');
    const response = await axios.get('http://backend.restapi.co.za/items/products');
    const products = response.data.data;

    console.log(`Antall produkter hentet: ${products.length}`);

    // 5. Add Brands and Categories
    console.log('Add Brands and Categories');
    const brandSet = new Set();
    const categorySet = new Set();
    products.forEach(p => {
      if (p.brand) brandSet.add(p.brand);
      if (p.category) categorySet.add(p.category);
    });

    await Brand.bulkCreate(Array.from(brandSet).map(name => ({ name })), { ignoreDuplicates: true });
    await Category.bulkCreate(Array.from(categorySet).map(name => ({ name })), { ignoreDuplicates: true });

    // 6. Saving products
    console.log('Saving products');
    for (let p of products) {
      const brand = await Brand.findOne({ where: { name: p.brand } });
      const category = await Category.findOne({ where: { name: p.category } });

      await Product.create({
        name: p.name,
        description: p.description,
        unitprice: p.price,
        quantity: p.quantity,
        imgurl: p.imgurl || p.image || null,
        brand_id: brand ? brand.id : null,
        category_id: category ? category.id : null
      });
    }

    console.log('Database-init complete');
    res.json({ message: 'Database initialized successfully' });

  } catch (error) {
    console.error('Error during database initialize:', error.message);
    res.status(500).json({
      error: 'Init error. Check API-connection or database.',
      details: error.message
    });
  }
};
