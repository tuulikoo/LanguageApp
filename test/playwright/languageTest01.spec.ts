import { test, expect } from '@playwright/test';


test('simple language test', async ({ page }) => {
  await page.goto('http://langapp.xyz/');
  let locator = page.locator('text=Etusivu');

    // Use expect to check if the located element has the text 'Aloita'
    await expect(locator).toBeVisible();

    await page.getByRole('button', { name: 'fi_FI language' }).click();
    await page.getByRole('img', { name: 'På svenska' }).click();

    locator = page.locator('text=Framsida');
    await expect(locator).toBeVisible();

    await page.getByRole('button', { name: 'sv_SE language' }).click();
    await page.getByRole('img', { name: 'Japaniksi' }).click();
    locator = page.locator('text=ホームページ');
    await expect(locator).toBeVisible();
    
    await page.getByRole('button', { name: 'ja_JP language' }).click();
    await page.getByRole('img', { name: 'Suomeksi' }).click();

    locator = page.locator('text=Kirjaudu sisään');
    await expect(locator).toBeVisible();

    await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();
    locator = page.locator('text=Käyttäjänimi');
    await expect(locator).toBeVisible();

    await page.getByRole('button', { name: 'fi_FI language' }).click();
    await page.getByRole('img', { name: 'På svenska' }).click();
    locator = page.locator('text=Användarnamn');
    await expect(locator).toBeVisible();

    await page.getByRole('button', { name: 'sv_SE language' }).click();
    await page.getByRole('img', { name: 'Japaniksi' }).click();
    locator = page.locator('text=ユーザー名');
    await expect(locator).toBeVisible();
});
