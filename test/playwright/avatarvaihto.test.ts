import { test, expect } from '@playwright/test';

test('test if avatar change persists after logout', async ({ page }) => {
    await page.goto('about:blank');
    await page.goto('http://langapp.xyz/');
    await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();
    await page.getByLabel('Käyttäjänimi').click();
    await page.getByLabel('Käyttäjänimi').fill('testavatar');
    await page.getByLabel('Käyttäjänimi').press('Tab');
    await page.getByLabel('Salasana').fill('moi123');
    await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();
    await page.getByRole('button', { name: 'testavatar Avatar' }).click();

    // Get the initial src attribute of the avatar image
    const initialAvatarSrc = await page.getAttribute('img[alt="testavatar Avatar"]', 'src');

    await page.goto('http://langapp.xyz/UserPage');
    await page.getByRole('button', { name: 'Tee tietoihisi muutoksia tästä' }).click();
    await page.getByRole('button', { name: 'Valitse uusi kaveri' }).click();
    await page.getByRole('img', { name: 'Avatar', exact: true }).nth(2).click();
    await page.getByRole('button', { name: 'Tallenna' }).click();
    await page.goto('http://langapp.xyz/UserPage');
    await page.getByRole('button', { name: 'Kirjaudu ulos' }).click();
    await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();
    await page.getByLabel('Käyttäjänimi').click();
    await page.getByLabel('Käyttäjänimi').fill('testavatar');
    await page.getByLabel('Käyttäjänimi').press('Tab');
    await page.getByLabel('Salasana').fill('moi123');
    await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();
    await page.getByRole('button', { name: 'testavatar Avatar' }).click();
    await page.getByRole('heading', { name: 'Kaverisi on testavatar Avatar' }).click();

    // After changing the avatar, get the updated src attribute
    const updatedAvatarSrc = await page.getAttribute('img[alt="testavatar Avatar"]', 'src');

    // Expect that the avatar source has changed
    expect(initialAvatarSrc).not.toEqual(updatedAvatarSrc);
});
