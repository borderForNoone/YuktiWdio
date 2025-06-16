import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WorkOrderTemplate from '../pageobjects/workOrderTemplate.page'

describe('Workflow templates suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it.skip('YUK-101 - User(Vendor) can create work order template', async () => {
        await WorkOrderTemplate.open();

        await WorkOrderTemplate.createWorkOrderTemplateButton.click();
        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkOrderTemplate.templateNameInputField.setValue(randomName);
        await WorkOrderTemplate.workOrderDescriptionInputField.setValue("Test");
        await WorkOrderTemplate.maxTimeInputField.setValue("1");
        await WorkOrderTemplate.nextButton.click();

        await WorkOrderTemplate.activityNameInputField.addValue("Test");
        await WorkOrderTemplate.briefDescriptionInputField.addValue("Test");
        await WorkOrderTemplate.activityTypeSelector.selectByVisibleText('New Activity');
        await WorkOrderTemplate.textInputFieldBuildingBlock.click();
        await WorkOrderTemplate.textInputFieldBuildingBlock.click();
        await WorkOrderTemplate.imageBuildingBlock.click();

        await WorkOrderTemplate.publishButton.click();
        await expect(WorkOrderTemplate.messageSuccess).toBeDisplayed();
    });

    it('YUK-91 - User(Vendor) cannot edit created by him work order templates', async () => {
        await WorkOrderTemplate.open();
        await expect(WorkOrderTemplate.createWorkOrderTemplateButton).toBeDisplayed();
        await WorkOrderTemplate.editTemplateButtons[5].waitForDisplayed({ timeout: 5000 });

        await WorkOrderTemplate.waitUntilElementsMoreThan(WorkOrderTemplate.editTemplateButtons, 4);
        
        const buttons = WorkOrderTemplate.editTemplateButtons;
        const lastIndex = await buttons.length - 1;

        await WorkOrderTemplate.clickElementByIndex(buttons, lastIndex);

        await WorkOrderTemplate.saveButton.click();
        await WorkOrderTemplate.errorMsg.waitForExist({ timeout: 5000 });
        await browser.waitUntil(async () => {
            const text = await WorkOrderTemplate.errorMsg.getText();
            return text && text.trim().length > 0;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected error message text to be non-empty'
        });

        const actualText = await WorkOrderTemplate.errorMsg.getText();
        await expect(actualText).not.toEqual("Object reference not set to an instance of an object.");
    });
});