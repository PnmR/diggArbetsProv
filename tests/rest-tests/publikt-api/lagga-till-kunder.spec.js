const { test, expect } = require('@playwright/test');

test('Ska ta emot JSON med följande attribut: name, address, phone, email', async ({ request }) => {
  // post rest call
  const resp = await request.post('/digg/users', {
    data: {
      name: 'request checker1',
      address: '85356 Sundsvall',
      phone: '244-897-8765',
      email: 'mail@mail.com'
    }
  });

  expect(resp.ok).toBeTruthy();
});

test('Ska inte acceptera att klient försöker sätta id via attributlistan', async ({ request }) => {
  // post rest call
  const resp = await request.post('/digg/users', {
    data: {
      id: 123,
      name: 'request attributlistan',
      address: '85356 Sundsvall',
      phone: '244-897-8765',
      email: 'mail@mail.com'
    }
  });

  expect(resp.status()).toBe(400);
  expect(resp.statusText()).toMatch('Bad Request');
});