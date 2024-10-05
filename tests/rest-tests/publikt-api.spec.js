const { test, expect } = require('@playwright/test');

test('Ska returnera JSON med en lista på kunder', async ({ request }) => {
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users').then(res => res.json());

  expect(resp.length).toBeGreaterThan(1);
  expect(resp[0]).toHaveProperty('name');
});