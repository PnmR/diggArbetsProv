import { test } from '../../../fixtures';
import { expect } from '@playwright/test';

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

test('Samtliga attribut ska gå att uppdatera (ej id)', async ({ request }) => {
  const patchData = {
    id: '11',
    name: 'uppdatera samtliga',
    address: '85356 Sundsvall',
    phone: '244-897-8765',
    email: 'mail@mail.com'
  };
  // patch rest call
  const patchResp = await request.patch('/digg/users/123', patchData);

  // get the json representation of the get rest call
  const updatedKund = await (await request.get('/digg/users/123')).json();

  //check that all the attributes of kund is updated beside id
  for (const property in patchData) {
    if (property != 'id')
      expect(updatedKund[property]).toBe(patchData[property]);
    else
      expect(updatedKund[property]).not.toBe(patchData[property]);
  }
});

test('Ska ge ett felsvar om id i body används OCH detta ej överensstämmer med id i pathen', async ({ request }) => {
  const pathID = 12
  // patch rest call
  const resp = await request.patch('/digg/users/' + pathID, {
    data: {
      id: pathID + 5,
      name: 'uppdatera med id olik pathID7',
      address: '85356 Sundsvall',
      phone: '244-897-8765',
      email: 'mail@mail.com'
    }
  });
  expect(resp.status()).toBe(400);
  expect(resp.statusText()).toBe('Bad Request');
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