const { test, expect } = require('@playwright/test');

test('Ska returnera JSON med den kund vars id överensstämmer med id i path', async ({ request }) => {
  const path = 123;
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users/' + path).then(res => res.json());

  expect(resp.id).toEqual(path);
});

test('Ska returnera 404 Not Found om inte kunden finns', async ({ request }) => {
  const path = 50000000000000000000000000000;
  // get rest call
  const resp = await request.get('/digg/users/' + path);

  expect(resp.status()).toEqual(404);
  expect(resp.statusText()).toEqual("Not Found");
});