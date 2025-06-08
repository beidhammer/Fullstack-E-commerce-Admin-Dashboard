const request = require('supertest');
const app = require('../app');
jest.setTimeout(20000);
let token;

const testCategory = { name: 'TEST_CATEGORY' };
const testBrand = { name: 'TEST_BRAND' };
const testProduct = {
  name: 'TEST_PRODUCT',
  description: 'Test produkt',
  quantity: 10,
  unitprice: 99.99,
  brand: 'TEST_BRAND',
  category: 'TEST_CATEGORY',
  imgurl: 'http://example.com/img.jpg'
};

describe('CRUD Test Flow', () => {
  let productId;

  beforeAll(async () => {
    // Login as admin
    const response = await request(app)
      .post('/auth/login')
      .send({
        emailOrUsername: 'admin@noroff.no',
        password: 'P@ssword2023'
      });

    token = response.body.data.token;
    expect(token).toBeDefined();
  });

  test('1. Create TEST_CATEGORY', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send(testCategory);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.category.name).toBe(testCategory.name);
    categoryId = res.body.data.category.id;
  });

  test('2. Create TEST_BRAND', async () => {
    const res = await request(app)
      .post('/brands')
      .set('Authorization', `Bearer ${token}`)
      .send(testBrand);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.brand.name).toBe(testBrand.name);
    brandId = res.body.data.brand.id;
  });

  test('3. Create TEST_PRODUCT', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...testProduct,
        brand_id: brandId,
        category_id: categoryId
      });

    console.log('Create product response:', res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.product.name).toBe(testProduct.name);
    productId = res.body.data.product.id;
    expect(productId).toBeDefined();
  });

  test('4. Get TEST_PRODUCT with category and brand', async () => {
    const res = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.product.name).toBe(testProduct.name);
    expect(res.body.data.product.brand.name).toBe(testBrand.name);
    expect(res.body.data.product.category.name).toBe(testCategory.name);
  });

  test('5. Update TEST_CATEGORY to TEST_CATEGORY2', async () => {
    const res = await request(app)
      .put('/categories/2')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_CATEGORY2' });

    console.log('Category response:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.category.name).toBe('TEST_CATEGORY2');
  });

  test('6. Update TEST_BRAND to TEST_BRAND2', async () => {
    const res = await request(app)
      .put('/brands/2')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_BRAND2' });

    console.log('Brand response:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.brand.name).toBe('TEST_BRAND2');
  });

  test('6.5 Update product to point to updated brand and category', async () => {
  const res = await request(app)
    .put(`/products/${productId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      brand_id: 2,
      category_id: 2
    });

  expect(res.statusCode).toBe(200);
});

  test('7. Get updated TEST_PRODUCT with new brand and category', async () => {
    const res = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.product.brand.name).toBe('TEST_BRAND2');
    expect(res.body.data.product.category.name).toBe('TEST_CATEGORY2');
  });

  test('8. Soft delete TEST_PRODUCT', async () => {
    const res = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toMatch(/deleted/i);
  });
});
