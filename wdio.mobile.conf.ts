import * as dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',

    specs: [
        './test/specs/mobile/**/*.ts'
    ],

    maxInstances: 1,

    services: [
      ['tesults',
        {
          target: process.env.TESULTS_MOBILE_TOKEN
        }
      ]
    ],

    beforeSuite: async function () {
        await driver.terminateApp('com.wfm', {});
        await driver.activateApp('com.wfm');  
    },

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554', // або назва твого пристрою
        'appium:platformVersion': '11',       // або відповідна версія Android
        //'appium:app': path.join(process.cwd(), './app-release.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.wfm',
        'appium:appActivity': 'com.wfm.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
    }],

    logLevel: 'info',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',

    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    hostname: '127.0.0.1',
    port: 4723, // default Appium port
    path: '/',

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        // grep: /.*YUK-140.*/
    },

    afterTest: async function (test, context, { error, result, duration, passed }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};