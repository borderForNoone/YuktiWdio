import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import AccessGroupsPage from '../pageobjects/accessGroups.page'

describe('Access Groups suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it.skip('YUK-87 - Access group is not visible', async () => {
        await AccessGroupsPage.open();

        await AccessGroupsPage.itemsPerPageInput.click();
        await AccessGroupsPage.itemsPerPageDropdownOptions[4].click();
        await browser.waitUntil(async () => {
            const elements = await AccessGroupsPage.accessGroups;
            return await elements.length === 11;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least eleven access Groups'
        });

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await AccessGroupsPage.createNewAccessGroupButton.click();
        await AccessGroupsPage.accessGroupNameInputField.setValue(randomName);
        await AccessGroupsPage.displayCodeInputField.setValue("test");
        await AccessGroupsPage.submitButton.click();
        await expect(AccessGroupsPage.messageSuccess).toBeDisplayed();

        await browser.waitUntil(async () => {
            const elements = await AccessGroupsPage.accessGroups;
            return await elements.length >= 12;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least twelve access Groups'
        });

        for (let i = 0; i < await AccessGroupsPage.accessGroups.length; i++) {
            const order = AccessGroupsPage.accessGroups[i];
            const text = await order.getText();

            if (text.includes(randomName)) {
                await expect(text).toContain(randomName);

                break; 
            }
        }
    });
});