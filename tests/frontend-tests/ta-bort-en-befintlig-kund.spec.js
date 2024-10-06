import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test('Alla fält ska rensas när man klickar på delete', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByLabel('Id', { exact: true }).fill('5');

    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByLabel('Id', { exact: true })).toHaveText('');
});

test('Om kunden med angivet id inte finns, ska ett felmeddelande presenteras ovan knappen för delete efter att man klickat', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Get the text from the label before 
    const del = await page.getByText('Id', { exact: true }).textContent();

    // delete once to ensure that the id does not exist anymore
    await await page.getByText('Id', { exact: true }).fill('10');
    await page.getByRole('button', { name: 'Delete' }).click();

    // delete the id that does not exist anymore
    await await page.getByText('Id', { exact: true }).fill('10');
    await page.getByRole('button', { name: 'Delete' }).click();

    // Get the text from the label after deleting the non-existent id
    const delAfter = await page.getByText('Id', { exact: true }).textContent();

    // Since I dont have the complete requirement, I am guessing that the error message will appear on the same label which is above the input field.
    // which means the labels should have additional text plus the original text.
    expect(delAfter.length).toBeGreaterThan(del.length);
});