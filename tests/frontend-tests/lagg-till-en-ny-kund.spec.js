const { test, expect } = require('@playwright/test');

test('Obligatoriska fält ska vara markerade', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const markedFields = await page.locator('label').filter({ hasText: '*' }).all();
    expect(markedFields.length).not.toBe(0);
});

test('Om något obligatoriskt fält inte är ifyllt när man klickar på create, ska ett felmeddelande presenteras ovan rutan för det saknade fältet', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Get the text from the marked label
    let markedFields = [];
    for (const markedField of await page.locator('label').filter({ hasText: '*' }).all())
        markedFields.push(await markedField.textContent());

    await page.getByRole('button', { name: 'Create' }).click();

    // Get the text from the marked label again, after clicking
    let markedFieldsAfterCreate = [];
    for (const markedField of await page.locator('label').filter({ hasText: '*' }).all())
        markedFieldsAfterCreate.push(await markedField.textContent());

    // Since I dont have the complete requirement, I am guessing that the error message will appear on the same label which is above the input field.
    // which means the labels should have additional text plus the original text.
    for (let i = 0; i < markedFields.length; i++) {
        if (markedFieldsAfterCreate[i].includes(markedFields[i])) {
            expect(markedFieldsAfterCreate[i].length).toBeGreaterThan(markedFields[i].length);
        }
    }
});

test('Alla fält ska rensas när man klickar på ‘create’', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByLabel('Name *').fill('raat paryo');
    await page.getByLabel('Address').fill('Sundsvall');
    await page.getByLabel('Phone').fill('0766666');
    await page.getByLabel('Email').fill('myemail@c.com');

    await page.getByRole('button', { name: 'Create' }).click();

    for (const field of await page.getByRole('textbox').all()) {
        await expect(field).toHaveText('');
    }
});