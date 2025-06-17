import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WorkOrder from '../pageobjects/workOrder.page'

describe('Work orders suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it.skip('YUK-96 - User(Vendor) can create work order', async () => {
        await WorkOrder.open();

        await WorkOrder.createNewOrderButton.click();
        await WorkOrder.workOrdetTemplates[7].click();

        await WorkOrder.nextButton.click();
        await WorkOrder.projectNameSelector.selectByVisibleText('test');
        
    });

    it('YUK-29 - After removing crew and vendor and updating WO, WO status does not change from Assigned', async () => {
        await WorkOrder.open();

        await expect(WorkOrder.projectSelector).toBeDisplayed();
        await WorkOrder.projectSelector.selectByVisibleText('test');

        await browser.waitUntil(async () => {
            const elements = await WorkOrder.workOrderEditButtons;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least one edit button to be present'
        });

        for (let i = 0; i < await WorkOrder.workOrders.length; i++) {
            const order = WorkOrder.workOrders[i];
            const text = await order.getText();

            if (text.includes('Test123')) {
                await WorkOrder.workOrderEditButtons[i].moveTo();

                await WorkOrder.dropdownEditOption.click();

                break; 
            }
        }

        await expect(WorkOrder.projectNameSelector).toBeDisplayed();
        await expect(WorkOrder.assignedCrewCard).toBeDisplayed();
        await WorkOrder.removeAsignedCrewButton.click();
        await expect(WorkOrder.assignedCrewCard).not.toBeDisplayed();

        await WorkOrder.saveEditedButton.click();
        await expect(WorkOrder.messageSuccess).toBeDisplayed();
        await WorkOrder.returnToWorkOrdersListButton.click();

        for (let i = 0; i < await WorkOrder.workOrders.length; i++) {
            const order = WorkOrder.workOrders[i];
            const text = await order.getText();

            if (text.includes('Test123')) {
                await expect(text).toContain("Unassigned");

                break; 
            }
        }
    });

    it('YUK-34 - User(Vendor) cant see Asset name for selected Warehouse when creating a Work order', async () => {
        await WorkOrder.open();

        await expect(WorkOrder.projectSelector).toBeDisplayed();
        await WorkOrder.projectSelector.selectByVisibleText('test');

        await browser.waitUntil(async () => {
            const elements = await WorkOrder.workOrderEditButtons;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least one edit button to be present'
        });

        for (let i = 0; i < await WorkOrder.workOrders.length; i++) {
            const order = WorkOrder.workOrders[i];
            const text = await order.getText();

            if (text.includes('Test123')) {
                await WorkOrder.workOrderEditButtons[i].moveTo();

                await WorkOrder.dropdownEditOption.click();

                break; 
            }
        }

        await WorkOrder.assetInputField.scrollIntoView();
        await WorkOrder.assetInputField.waitForDisplayed({ timeout: 5000 });
        await WorkOrder.assetInputField.click();
        
        await expect(WorkOrder.selectedAssetCard).toBeDisplayed();
        await expect(await WorkOrder.selectedAssetCard.getText()).toContain("test");
    });

    it('YUK-35 - Cant immediately see the available serial numbers for selected warehouse in work order creation', async () => {
        await WorkOrder.open();

        await WorkOrder.createNewOrderButton.click();
        await WorkOrder.workOrdetTemplates[7].click();

        await WorkOrder.nextButton.click();
        await WorkOrder.projectNameSelector.selectByVisibleText('test');
        await WorkOrder.warehouseSelector.selectByVisibleText("Test123");

        await WorkOrder.assetInputField.scrollIntoView();
        await WorkOrder.assetInputField.click();
        await expect(WorkOrder.firstAssetOption).toBeDisplayed();

        await expect(await WorkOrder.firstAssetOption.getText()).toContain("Test123");
    });

    it('YUK-119 - Cant immediately see Asset name for the available serial number for selected warehouse in work order creation', async () => {
        await WorkOrder.open();

        await expect(WorkOrder.projectSelector).toBeDisplayed();
        await WorkOrder.projectSelector.selectByVisibleText('test');

        await browser.waitUntil(async () => {
            const elements = await WorkOrder.workOrderEditButtons;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least one edit button to be present'
        });

        for (let i = 0; i < await WorkOrder.workOrders.length; i++) {
            const order = WorkOrder.workOrders[i];
            const text = await order.getText();

            if (text.includes('Test123')) {
                await WorkOrder.workOrderEditButtons[i].moveTo();

                await WorkOrder.dropdownEditOption.click();

                break; 
            }
        }

        await WorkOrder.assetInputField.scrollIntoView();
        await WorkOrder.assetInputField.waitForDisplayed({ timeout: 5000 });
        await WorkOrder.assetInputField.click();
        await WorkOrder.assetInputField.addValue("Test123");
        await WorkOrder.assetInputField.click();
        await WorkOrder.firstAssetOption.click();
        
        await expect(WorkOrder.selectedAssetCard).toBeDisplayed();
        await expect(await WorkOrder.selectedAssetCard.getText()).toContain("test");
    });

    it.skip('YUK-84 - User(Vendor) can select all crews and see their work orders', async () => {
        await WorkOrder.open();


    });
});