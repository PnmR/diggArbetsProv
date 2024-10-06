const { test, expect } = require('@playwright/test');

test('Det ska gå att bläddra fram och tillbaka i resultatet', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('"id": 13')).toBeVisible();

    await page.getByRole('button', { name: 'Prev' }).click();
    await expect(page.getByText('"id": 1')).toBeVisible();
});