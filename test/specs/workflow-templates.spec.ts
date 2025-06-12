import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WorkOrderTemplate from '../pageobjects/workOrderTemplate.page'

xdescribe('Workflow templates suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it('YUK-101 - User(Vendor) can create work order template', async () => {
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
});