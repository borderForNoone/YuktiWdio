import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import UsersManagementPage from '../pageobjects/usersManagement.page'

describe('Project suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it('YUK-79 - Unable to create a new mobile user(or crew) for the vendor', async () => {
        await UsersManagementPage.openMobileUsersPage();

        await UsersManagementPage.createNewCrewButton.click();
        await expect(UsersManagementPage.vendorInputField).toBeDisplayed();
        await expect(UsersManagementPage.vendorInputField).toHaveText("Anvil Cables");
    });

    it('YUK-74 - Validation for Crew name does not show the error immediately', async () => {
        await UsersManagementPage.open();

        await UsersManagementPage.createNewCrewButton.click();
        await UsersManagementPage.nameInputField.setValue("Test");
        await UsersManagementPage.vendorSelector.selectByVisibleText("Test");
        await UsersManagementPage.crewSupervisorInputField.click();
        //await UsersManagementPage.crewSupervisorInputField.setValue("Demo Installer");
        await browser.waitUntil(async () => {
            const elements = await UsersManagementPage.itemOptions;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected more than 2 item Options'
        });

        for (const option of await UsersManagementPage.itemOptions) {
            const text = await option.getText();
            if (text.trim() === 'Demo Installer ') {
                await option.click();
                break;
            }
        }

        await UsersManagementPage.crewInputField.click();

        for (const option of await UsersManagementPage.itemOptions) {
            const text = await option.getText();
            if (text.trim() === 'Damodar Pandey') {
                await option.click();
                break;
            }
        }
    });

    it('YUK-75 - The fields are circled in red if user just starts creating a new crew', async () => {
        await UsersManagementPage.open();

        await UsersManagementPage.createNewCrewButton.click();
        await UsersManagementPage.crewInputField.waitForDisplayed({ timeout: 5000 });
        await expect(UsersManagementPage.crewSupervisorError).not.toBeDisplayed();
        await expect(UsersManagementPage.crewError).not.toBeDisplayed();
    });
});