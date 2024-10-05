const { test, expect } = require('@playwright/test');

test('Ska returnera 204 No Content', async ({ request }) => {
  // delete rest call
  const resp = await request.delete('/digg/users/123');
  
  expect(resp.status()).toBe(204);
  expect(resp.statusText()).toBe('No Content');
});