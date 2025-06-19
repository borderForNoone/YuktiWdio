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
        await WorkOrder.assignedCrewCard.scrollIntoView();
        await expect(WorkOrder.assignedCrewCard).toBeDisplayed();
        await WorkOrder.removeAsignedCrewButton.scrollIntoView();
        await expect(WorkOrder.removeAsignedCrewButton).toBeDisplayed();
        await WorkOrder.removeAsignedCrewButton.click();
        
        await expect(WorkOrder.removeAsignedCrewButton).not.toBeDisplayed();

        await WorkOrder.saveEditedButton.click();
        await expect(WorkOrder.messageSuccess).toBeDisplayed();
        await WorkOrder.returnToWorkOrdersListButton.click();
        await browser.waitUntil(async () => {
            const orders = await WorkOrder.workOrders;
            return await orders.length > 2;
        }, {
            timeout: 5000,
            interval: 500,
            timeoutMsg: 'Expected more than 2 work orders to be present, but timeout exceeded.'
        });

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
        
        await expect(WorkOrder.firstAssetOption).toBeDisplayed();
        await expect(await WorkOrder.firstAssetOption.getText()).toContain("test");
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
        await WorkOrder.assetOptions[1].click();
        
        await expect(WorkOrder.selectedAssetCard).toBeDisplayed();
        await expect(await WorkOrder.selectedAssetCard.getText()).toContain("test");
    });

    it('YUK-84 - User(Vendor) can select all crews and see their work orders', async () => {
        await WorkOrder.openSwimlane();

        await WorkOrder.projectSelector.selectByVisibleText("test");

        await WorkOrder.swimlaneVendorsInputField.addValue("Anvil Cables");	

        await expect(await WorkOrder.swimlaneVendorsInputField.getAttribute('aria-owns')).not.toBeNull();

        const el = await WorkOrder.swimlaneVendorsInputField;
        const location = await el.getLocation();     
        const size = await el.getSize();             

        const clickX = location.x + size.width / 2;  
        const clickY = location.y + size.height + 5;  

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: clickX, y: clickY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        await browser.releaseActions();

        await browser.waitUntil(async () => {
            if (!(await WorkOrder.swimlaneVendorsInputField.isExisting())) return false;
            const attr = await WorkOrder.swimlaneVendorsInputField.getAttribute('aria-owns');
            return attr === null;
        }, {
            timeout: 5000,
            timeoutMsg: 'aria-owns still exists or element not found'
        });

        const ariaOwns = await WorkOrder.swimlaneVendorsInputField.getAttribute('aria-owns');
        await expect(ariaOwns).toBeNull();

        let found = false;
        for (const crew of await WorkOrder.swimlaneCrews) {
            const text = await crew.getText();
            if (text.includes('Test1')) {
                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error('Expected crew list to contain "Test1", but it was not found.');
        }

        await expect(found).toBe(true);
    });
});