const { test, expect } = require('@playwright/test');

test('Ska returnera JSON med en lista på kunder', async ({ request }) => {
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users').then(res => res.json());

  expect(resp.length).toBeGreaterThan(1);
  expect(resp[0]).toHaveProperty('name');
});

test('Ska tillhandahålla paginering, dvs acceptera parametrarna page och size enligt /digg/users?page=0&size=10', async ({ request }) => {
  const size = 7;
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users?page=1&size=' + size).then(res => res.json());

  expect(resp.length).toEqual(size);
});

test('Ska returnera en lista på max 10 kunder, om inte klienten anger size', async ({ request }) => {
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users').then(res => res.json());

  expect(resp.length).toEqual(10);
});

test('Ska returnera JSON med den kund vars id överensstämmer med id i path', async ({ request }) => {
  const path = 123;
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users/' + path).then(res => res.json());

  expect(resp.id).toEqual(path);
});

test('Ska returnera 404 Not Found om inte kunden finns', async ({ request }) => {
  const path = 50000000000000000000000000000;
  // get the json representation of the get rest call
  const resp = await request.get('/digg/users/' + path);

  expect(resp.status()).toEqual(404);
  expect(resp.statusText()).toEqual("Not Found");
});