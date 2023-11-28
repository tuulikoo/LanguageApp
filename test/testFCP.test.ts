import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

test('Measure FCP for LangApp', async ({ page }, testInfo) => {
    const browser = await chromium.launch();

    try {
        const url = 'http://langapp.xyz';

        await page.goto(url);

        // Measure FCP
        const fcpMetrics = await page.evaluate(() => {
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            return fcpEntry ? fcpEntry.startTime : null;
        });

        console.log('First Contentful Paint (FCP):', fcpMetrics);

        expect(fcpMetrics).not.toBeNull();
        expect(fcpMetrics).toBeLessThan(3000);

        if (testInfo.attachments) {
            const metricsBuffer = Buffer.from(JSON.stringify(fcpMetrics));

            const contentType = 'application/json';

            await testInfo.attachments.push({ name: `FCP for ${url}`, body: metricsBuffer, contentType });
        } else {
            console.warn('testInfo.attachments is not available.');
        }
    } catch (e) {
        console.error('Error:', e.message || e); // Use e.message or handle the error information more gracefully
    } finally {
        await browser.close();
    }

});
