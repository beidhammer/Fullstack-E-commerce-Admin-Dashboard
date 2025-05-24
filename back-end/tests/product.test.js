const request = require('supertest');
const app = require('../app');

let token;
let categoryId;
let brandId;
let productId;

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/auth/login')
    .send({
      emailOrUsername: 'admin@example.com',
      password: 'password123'
    });

  token = loginRes.body.data.token;
});

describe('Full Product CRUD Flow', () => {
  it('should create a category TEST_CATEGORY', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_CATEGORY' })
      .expect(201);

    categoryId = res.body.id;
    expect(res.body.name).toBe('TEST_CATEGORY');
  });

  it('should create a brand TEST_BRAND', async () => {
    const res = await request(app)
      .post('/brands')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_BRAND' })
      .expect(201);

    brandId = res.body.id;
    expect(res.body.name).toBe('TEST_BRAND');
  });

  it('should create a product TEST_PRODUCT', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TEST_PRODUCT',
        quantity: 10,
        unitprice: 99.99,
        imgurl: 'http://example.com/image.jpg',
        description: 'Product for testing',
        category_id: categoryId,
        brand_id: brandId
      })
      .expect(201);

    productId = res.body.id;
    expect(res.body.name).toBe('TEST_PRODUCT');
    expect(res.body.category_id).toBe(categoryId);
    expect(res.body.brand_id).toBe(brandId);
  });

  it('should fetch TEST_PRODUCT with brand and category', async () => {
    const res = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.name).toBe('TEST_PRODUCT');
    expect(res.body.category_id).toBe(categoryId);
    expect(res.body.brand_id).toBe(brandId);
  });

  it('should rename TEST_CATEGORY to TEST_CATEGORY2', async () => {
    const res = await request(app)
      .put(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_CATEGORY2' })
      .expect(200);

    expect(res.body.name).toBe('TEST_CATEGORY2');
  });

  it('should rename TEST_BRAND to TEST_BRAND2', async () => {
    const res = await request(app)
      .put(`/brands/${brandId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TEST_BRAND2' })
      .expect(200);

    expect(res.body.name).toBe('TEST_BRAND2');
  });

  it('should fetch product again with updated brand and category', async () => {
    const res = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.name).toBe('TEST_PRODUCT');
    expect(res.body.category.name).toBe('TEST_CATEGORY2');
    expect(res.body.brand.name).toBe('TEST_BRAND2');
  });

  it('should delete TEST_PRODUCT', async () => {
    await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});