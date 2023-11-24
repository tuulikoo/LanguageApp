import { test } from '@playwright/test';

test('Measure Download and Latency for LangApp', async ({ browser }, testInfo) => {
    let context;

    try {
        context = await browser.newContext();
        const page = await context.newPage();

        const urlsToTest = [
            'http://langapp.xyz',
            'http://langapp.xyz/Login',
            'http://langapp.xyz/Registration',
            'http://langapp.xyz/Flashcards',
            'http://langapp.xyz/Game4',
            'http://langapp.xyz/Story',
            'http://langapp.xyz/Game5'
        ];

        // Loop through each
        for (const url of urlsToTest) {
            try {
                // Navigate to the URL and wait for the 'load' event
                await page.goto(url, { waitUntil: 'load' });

                // Measure Latency and Download
                const metrics = await page.evaluate(() => {
                    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

                    return {
                        latency: navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime,
                        downloadTime: navigationTiming.responseEnd - navigationTiming.requestStart,
                    };
                });

                console.log(`Metrics for ${url}:`);
                console.log('Latency:', metrics.latency, 'ms');
                console.log('Download Time:', metrics.downloadTime);

                // Check if testInfo.attachments is defined before using it
                if (testInfo.attachments) {
                    // Convert the string to a Buffer
                    const metricsBuffer = Buffer.from(JSON.stringify(metrics));

                    // Set the content type for the attachment
                    const contentType = 'application/json';

                    await testInfo.attachments.push({ name: `Network Performance metrics for ${url}`, body: metricsBuffer, contentType });
                } else {
                    console.warn('testInfo.attachments is not available.');
                }
            } catch (error) {
                console.error(`Error measuring metrics for ${url}:`, error);
                // Continue to the next URL even if there's an error
            }
        }
    } catch (error) {
        console.error('Error creating context:', error);
    } finally {
        if (context) {
            await context.close();
        }
    }
});
