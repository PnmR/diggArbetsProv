const { test, expect } = require('@playwright/test');

test('Obligatoriska fält ska vara markerade', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    // await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByText('Name *')).toContainText('*');
});