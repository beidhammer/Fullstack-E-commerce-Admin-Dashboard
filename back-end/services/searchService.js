const { Product, Brand, Category } = require('../models');
const { Op } = require('sequelize');

const searchProducts = async (query) => {
  const { name, brand, category, minPrice, maxPrice } = query;

  const whereClause = {
    isdeleted: false,
  };

  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }

  if (minPrice || maxPrice) {
    whereClause.unitprice = {};
    if (minPrice) {
      whereClause.unitprice[Op.gte] = parseFloat(minPrice);
    }
    if (maxPrice) {
      whereClause.unitprice[Op.lte] = parseFloat(maxPrice);
    }
  }

  const includeClause = [];

  if (brand) {
    includeClause.push({
      model: Brand,
      where: { name: { [Op.like]: `%${brand}%` } },
    });
  } else {
    includeClause.push({ model: Brand });
  }

  if (category) {
    includeClause.push({
      model: Category,
      where: { name: { [Op.like]: `%${category}%` } },
    });
  } else {
    includeClause.push({ model: Category });
  }

  const products = await Product.findAll({
    where: whereClause,
    include: includeClause,
  });

  return products;
};

module.exports = {
  searchProducts,
};