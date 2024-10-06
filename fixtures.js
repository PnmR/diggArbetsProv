const { test: base } = require('@playwright/test');

exports.test = base.extend({
    contextOptions: async ({ baseURL }, use) => {
        await use({ baseURL: 'http://localhost:8080' })
    },
    forEachTest: [async ({ request }, use) => {
        // This code runs before every test.
        const res = await request.get('/digg/users');
        console.log("resetting users before test ....");
        console.log(res.statusText());

        await use();
        // This code runs after every test.

    }, { auto: true }]  // automatically starts for every test.
});