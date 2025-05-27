const { sequelize } = require('../models');

const searchProducts = async (query) => {
  const { name, brand, category } = query;

  if (!name && !brand && !category) {
    throw new Error('At least one search parameter (name, brand, category) must be provided.');
  }

  let sql = `
  SELECT DISTINCT
    products.id, products.name, products.description, products.unitprice, products.quantity,
    products.imgurl, 
    brands.name AS brand,
    categories.name AS category
  FROM products
  INNER JOIN brands ON products.brand_id = brands.id
  INNER JOIN categories ON products.category_id = categories.id
  WHERE products.isdeleted = false
`;

  const replacements = {};

  if (name) {
    sql += ` AND LOWER(products.name) LIKE LOWER(:name)`;
    replacements.name = `%${name}%`;
  }

  if (brand) {
    sql += ` AND LOWER(brands.name) LIKE LOWER(:brand)`;
    replacements.brand = `%${brand}%`;
  }

  if (category) {
    sql += ` AND LOWER(categories.name) LIKE LOWER(:category)`;
    replacements.category = `%${category}%`;
  }

  console.log('SQL:', sql);
  console.log('Replacements:', replacements);

  const results = await sequelize.query(sql, {
  replacements,
  type: sequelize.QueryTypes.SELECT,
});

  return results;
};

module.exports = {
  searchProducts
};
