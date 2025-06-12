import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WarehouseLocations from '../pageobjects/warehouseLocations.page'

xdescribe('Warehouse Locations suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it('YUK-81 - Created Warehouse Location not shown in the list of created Warehouse Locations', async () => {
        await WarehouseLocations.open();

        await expect(WarehouseLocations.messageSuccess).not.toBeDisplayed();
        await WarehouseLocations.headerTogglerButton.click();
        await WarehouseLocations.createWarehouseButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const warehouseName = `Test${randomSuffix}`;

        await WarehouseLocations.warehouseNameInputField.setValue(warehouseName);
        await WarehouseLocations.areaInputField.setValue(100);

        await WarehouseLocations.statusSwitch.click();

        await WarehouseLocations.nextButton.click();
        await WarehouseLocations.addressInputField.setValue("Test");
        await WarehouseLocations.countrySelector.selectByVisibleText('India');
        await WarehouseLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WarehouseLocations.citySelector.selectByVisibleText('Sillod');
        await WarehouseLocations.zipCodeInputField.setValue(100);

        await WarehouseLocations.nextButton.click();
        await WarehouseLocations.createWarehouseButton.click();
        await expect(WarehouseLocations.messageSuccess).toBeDisplayedInViewport();

        const elements = WarehouseLocations.listElements;
        const lastElement = elements[await elements.length - 1];
        await lastElement.click();

        await browser.waitUntil(async () => (
            await WarehouseLocations.warehouseLocations.length) > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Warehouse list did not load in time',
            }
        );

        const rows = await WarehouseLocations.warehouseLocations;

        let isFound = false;
        for (const row of rows) {
            const text = await row.getText();
            if (text.includes(warehouseName)) {
                isFound = true;
                break;
            }
        }

        await expect(isFound).toBe(true);
    });
});