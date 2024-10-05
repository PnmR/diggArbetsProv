const { test, expect } = require('@playwright/test');

test('Ska ta emot JSON med följande attribut: name, address, phone, email', async ({ request }) => {
  // patch rest call
  const resp = await request.patch('/digg/users/123', {
    data: {
      name: 'testa uppdatera2'
    }
  });

  expect(resp.ok()).toBeTruthy();
  expect(isJSON(resp)).toBeTruthy();
});

function isJSON(p) {
  try {
    JSON.parse(p)
  }
  catch (e) {
    return false;
  }
  return true;
}