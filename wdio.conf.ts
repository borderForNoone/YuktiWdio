import * as dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: [
        './test/specs/**/*.ts'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: process.env.BASE_URL,
    
    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,
  
    connectionRetryCount: 3,
   
    framework: 'mocha',
  
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
