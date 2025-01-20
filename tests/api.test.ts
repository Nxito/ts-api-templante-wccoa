import { test, expect } from '@playwright/test';

var token = "Bearer ";
var username = "root";
var password = "";
//
test.describe('Authorization', () => {
  test('POST /login should authorizate and receive the token', async ({ request }) => {
    const response = await request.post('/auth/login',{
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        username,
        password
      }) 
    });
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const body = await response.json();
      expect(body).toHaveProperty('token');
      expect(typeof body.token).toBe('string');
      if(body.token) {token = "Bearer " + body.token}
    
  });
});

test.describe('User Endpoints', () => {
  test('GET /user should show all users', async ({ request }) => {
    const response = await request.get('/v1/users',{headers: {Authorization: token}});
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const body = await response.json();
    body.forEach((item) => {
      expect(item).toHaveProperty('name');
      expect(typeof item.name).toBe('string');
    });
  });
});


test.describe('Products Endpoints', () => {
  test('GET /products should show all products', async ({ request }) => {
    const response = await request.get('/v1/products',{headers: {Authorization: token}});
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const body = await response.json();
    body.forEach((item) => {
      expect(item).toHaveProperty('name');
      expect(typeof item.name).toBe('string');
    });
  });
});