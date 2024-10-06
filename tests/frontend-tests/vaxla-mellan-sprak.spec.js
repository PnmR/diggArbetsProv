import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test('Det ska finnas en språkknapp för att växla mellan engelska/svenska', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const sprak = await page.getByRole('button', { name: /Engelska|Svenska/ });

    await expect(sprak).toBeVisible();
});

