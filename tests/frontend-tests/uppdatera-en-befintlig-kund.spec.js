const { test, expect } = require('@playwright/test');
const exp = require('constants');

test('Alla fält ska rensas när man klickar på ‘update’', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByLabel('Name *').fill('raat paryo');
    await page.getByLabel('Address').fill('Sundsvall');
    await page.getByLabel('Phone').fill('0766666');
    await page.getByLabel('Email').fill('myemail@c.com');
    await page.getByLabel('Id (for update)').fill('4');

    await page.getByRole('button', { name: 'Update' }).click();

    for (const field of await page.getByRole('textbox').all()) {
        await expect(field).toHaveText('');
    }
});

test('Om kunden med angivet id inte finns, ska ett felmeddelande presenteras ovan knappen för ‘update’ efter att man klickat', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Get the text from the label before 
    const update = await page.getByText('Id (for update)').textContent();

    // delete once to ensure that the id does not exist anymore
    await await page.getByText('Id', { exact: true }).fill('10');
    await page.getByRole('button', { name: 'Delete' }).click();

    // delete the id that does not exist anymore
    await await page.getByText('Id (for update)').fill('10');
    await page.getByRole('button', { name: 'Update' }).click();

    // Get the text from the label after deleting the non-existent id
    const updateAfter = await page.getByText('Id (for update)').textContent();

    // Since I dont have the complete requirement, I am guessing that the error message will appear on the same label which is above the input field.
    // which means the labels should have additional text plus the original text.
    expect(updateAfter.length).toBeGreaterThan(update.length);
});