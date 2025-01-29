import { test, expect } from '@playwright/test';


test.describe.configure({ mode: "serial" });

//

test.describe('Authorization and routes', async () => {
  var token = "Bearer ";
  var username = "root";
  var password = "";
  // var username = "anxo";
  // var password = "RH1n!bD.";
  console.log("Calling token ...")
  test('POST /login should authorizate and receive the token', async ({ request }) => {
    const response = await request.post('/auth/login', {
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
    if (body.token) {
      token = "Bearer " + body.token;
    }
    console.log("Token Received")
  });

  test.describe('Token exists?', () => {
    expect(token.length).toBeGreaterThan(5)
    console.log("Token exists")
  })

  test.describe('User Endpoints', () => {
    test('GET /user should show all users', async ({ request }) => {
      const response = await request.get('/v1/users', { headers: { Authorization: token } });
      // console.log({ token });
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
      const response = await request.get('/v1/products', { headers: { Authorization: token } });

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');

      const body = await response.json();
      body.forEach((item) => {
        expect(item).toHaveProperty('name');
        expect(typeof item.name).toBe('string');
      });
    });
  });
  test.describe('Check user permisions using counters endpoint', () => {
    test('GET /counters should show all counters', async ({ request }) => {
      const response = await request.get('/v1/counters', { headers: { Authorization: token } });

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');

      const body = await response.json();
      body.forEach((item) => {
        expect(item).toHaveProperty('counter');
        expect(typeof item.counter).toBe('number');
      });
    });
  });
});

