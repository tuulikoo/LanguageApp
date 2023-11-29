import { test, expect } from '@playwright/test';

test('Change password and try logging in', async ({ page }) => {
  await page.goto('http://langapp.xyz/');
  await page.getByRole('button', { name: 'Rekisteröidy' }).click();
  await page.locator('#username').fill('pwTester');
  await page.locator('#email').fill('pw@pwtest.fi');
  await page.locator('#firstName').fill('Pasi');
  await page.locator('#password').fill('Password');
  await page.getByRole('img', { name: 'Finnish Flag' }).click();
  await page.getByRole('button', { name: 'Valitse kaverisi' }).click();
  await page.getByRole('img', { name: 'Avatar' }).nth(3).click();
  await page.getByRole('button', { name: 'Uusi käyttäjä' }).click();

  await page.waitForURL('http://langapp.xyz/Login');

  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();
  await page.getByLabel('Käyttäjänimi').fill('pwTester');
  await page.getByLabel('Salasana').fill('Password');
  await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();

  await page.waitForURL('http://langapp.xyz/MainPage  ');

  await page.getByRole('button', { name: 'pwTester Avatar' }).click();

  await page.waitForURL('http://langapp.xyz/UserPage');
  await page.getByRole('heading', { name: 'Käyttäjätunnuksesi on pwTester' });
  await page.getByRole('button', { name: 'Tee tietoihisi muutoksia tästä' }).click();
  await page.getByRole('button', { name: 'Muuta salasanaa' }).click();

  await page.getByPlaceholder('Enter new password').fill('Newpassword');
  await page.getByRole('button', { name: 'Tallenna' }).click();
  await page.getByRole('button', { name: 'Kirjaudu ulos' }).click();

  await page.waitForURL('http://langapp.xyz/Login');
  //Sleep for 2 seconds
  await page.waitForTimeout(2000);
  await page.getByLabel('Käyttäjänimi').click();
  await page.getByLabel('Käyttäjänimi').fill('pwTester');
  await page.waitForTimeout(1500);
  await page.getByLabel('Salasana').click();
  await page.getByLabel('Salasana').fill('Newpassword');
  await page.waitForTimeout(1500);
  //For whatever reason the test sometimes deletes the username that was already inserted
  await page.getByLabel('Käyttäjänimi').fill('pwTester');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();

  await page.waitForURL('http://langapp.xyz/MainPage');

  await page.getByRole('button', { name: 'pwTester Avatar' }).click();

  await page.waitForURL('http://langapp.xyz/UserPage');
  await expect(page.locator('text=Käyttäjätunnuksesi on pwTester')).toBeVisible();

  await page.getByRole('button', { name: 'Poista tietoni' }).click();
  await page.getByRole('button', { name: 'Kyllä' }).click();
  await page.waitForTimeout(2000);
  await page.waitForURL('http://langapp.xyz/MainPage');

});