import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import AssetsManagementPage from '../pageobjects/assetsManagement.page'
import WorkOrder from '../pageobjects/workOrder.page'

describe('Assets management suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it.skip('YUK-69 - User(Vendor) can create new Asset(meter)', async () => {
        await AssetsManagementPage.open();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await AssetsManagementPage.serialNumberInputField.setValue(randomName);
        await AssetsManagementPage.assetLevelSelector.selectByVisibleText("Level 1");
        await AssetsManagementPage.assetNameInputField.addValue("test");
        await AssetsManagementPage.assetTypeSelector.selectByVisibleText("N/A");
        await AssetsManagementPage.providedBySelector.selectByVisibleText("N/A");
        await AssetsManagementPage.servicedBySelector.selectByVisibleText("N/A");
        await AssetsManagementPage.warehouseSelector.selectByVisibleText("Test1");

        await AssetsManagementPage.nextButton.click();
        await AssetsManagementPage.createButton.click();
        await expect(AssetsManagementPage.messageSuccess).toBeDisplayed();
    });

    it('YUK-28 - Status of Asset does not change after WO assignment, for crew where asset is specified', async () => {
        await AssetsManagementPage.open();

        await AssetsManagementPage.searchInputField.setValue("Test123456");
        for (let i = 0; i < await AssetsManagementPage.assets.length; i++) {
            const order = AssetsManagementPage.assets[i];
            const text = await order.getText();

            await expect(text).toContain("Test123456");
        }

        await WorkOrder.open();
        await WorkOrder.projectSelector.selectByVisibleText("test");

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

        await WorkOrder.assetInputField.waitForDisplayed({ timeout: 5000 });

        await WorkOrder.assetInputField.addValue("Test123456");
        await WorkOrder.assetInputField.click();
        await WorkOrder.assetOptions[1].click();
        
        await expect(WorkOrder.selectedAssetCard).toBeDisplayed();
        await WorkOrder.saveEditedButton.click();
        await expect(WorkOrder.messageSuccess).toBeDisplayed();

        await AssetsManagementPage.open();
        await browser.waitUntil(async () => {
            const elements = await AssetsManagementPage.assets;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least one Asset present'
        });

        await AssetsManagementPage.searchInputField.setValue("Test123456");
        await browser.waitUntil(async () => {
            const elements = await WorkOrder.workOrderEditButtons;
            return await elements.length < 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected one asset present'
        });

        for (let i = 0; i < await AssetsManagementPage.assets.length; i++) {
            const order = AssetsManagementPage.assets[i];
            const text = await order.getText();
            
            if (text.includes('Test123456')) {
                await expect(text).toContain("Issued");

                break; 
            }
        }
    });

    it('YUK-36 - Cant create Asset for created Warehouse with existing name', async () => {
        await AssetsManagementPage.open();

        await AssetsManagementPage.createNewAssetButton.click();

        await AssetsManagementPage.serialNumberInputField.setValue("Test");
        await AssetsManagementPage.assetLevelSelector.selectByVisibleText("Level 1");
        await AssetsManagementPage.assetNameInputField.addValue("test");
        await AssetsManagementPage.assetTypeSelector.selectByVisibleText("N/A");
        await AssetsManagementPage.providedBySelector.selectByVisibleText("N/A");
        await AssetsManagementPage.servicedBySelector.selectByVisibleText("N/A");
        await AssetsManagementPage.warehouseSelector.selectByVisibleText("Test123");

        await AssetsManagementPage.nextButton.click();
        await AssetsManagementPage.createButton.click();
        await AssetsManagementPage.messageError.waitForDisplayed({ timeout: 5000 });
        const text = await AssetsManagementPage.messageError.getText();
        const trimmed = text.trim();

        if (trimmed.length <= 0) {
            throw new Error('Expected error message to be present in messageError element, but it was empty.');
        }
        await expect(text.trim().length).toBeGreaterThan(0);
    });

    it('YUK-27 - Asset types have the same code', async () => {
        await AssetsManagementPage.openAssetTypes();

        await browser.waitUntil(async () => {
            const elements = await WorkOrder.workOrderEditButtons;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected more than 2 assets present'
        });

        for (let i = 1; i < await AssetsManagementPage.assets.length; i++) {
            const asset = AssetsManagementPage.assets[i];
            const text = await asset.getText();

            await expect(text).not.toContain("ASK000000003");
        }
    });

    it('YUK-64 - Can create new Supplier with existing name', async () => {
        await AssetsManagementPage.openSuppliers();

        await browser.waitUntil(async () => {
            const elements = await AssetsManagementPage.suppliers;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected more than 2 suppliers present'
        });

        for (let i = 3; i < await AssetsManagementPage.suppliers.length; i++) {
            const supplier = AssetsManagementPage.suppliers[i];
            const text = await supplier.getText();

            await expect(text).not.toContain("test");
        }
    });
});