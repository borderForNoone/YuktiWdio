import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WorkLocations from '../pageobjects/workLocations.page'

xdescribe('Work locations suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it('YUK-110 - User(Vendor) can create new work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.cotactNameInputField.setValue(randomName);
        await WorkLocations.phoneInputField.setValue("123");
        await WorkLocations.locationIdentifierInputField.setValue("1234567890");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await WorkLocations.addressInputField.setValue("Test");

        await WorkLocations.countrySelector.selectByVisibleText('India');
        await WorkLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WorkLocations.citySelector.selectByVisibleText('Sillod');
        await WorkLocations.zipCodeInputField.setValue("100");
    
        while (!(await WorkLocations.workLocationTemplateSelector.isDisplayed())) {
            await expect(WorkLocations.nextButton).toBeClickable();
            await WorkLocations.nextButton.click();

            await browser.pause(500);
        }

        await WorkLocations.workLocationTemplateSelector.selectByVisibleText('Test_3_6_25');
        await WorkLocations.nextButton.click();

        await WorkLocations.accessGroupSelector.selectByVisibleText('test');
        await WorkLocations.nextButton.click();
        await expect(WorkLocations.createWorkLocationButton).toBeDisplayed();
    });
});