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