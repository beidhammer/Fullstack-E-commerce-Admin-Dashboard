const db = require('../models');
const { sequelize } = db;

const searchProducts = async (query) => {
  const { name, brand, category } = query;

  let sql = `
    SELECT 
      products.id, products.name, products.description, products.unitprice, products.quantity,
      products.imgurl, 
      brands.name AS brand,
      categories.name AS category
    FROM products
    LEFT JOIN brands ON products.brand_id = brands.id
    LEFT JOIN categories ON products.category_id = categories.id
    WHERE products.isdeleted = false
  `;

  const replacements = {};

  if (name) {
    sql += ` AND products.name LIKE :name`;
    replacements.name = `%${name}%`;
  }

  if (brand) {
    sql += ` AND brands.name LIKE :brand`;
    replacements.brand = `%${brand}%`;
  }

  if (category) {
    sql += ` AND categories.name LIKE :category`;
    replacements.category = `%${category}%`;
  }

  const [results] = await sequelize.query(sql, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
  });

  return results;
};

module.exports = {
  searchProducts,
};
