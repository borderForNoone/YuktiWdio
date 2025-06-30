import LanguagePage from '../../pageobjects/mobile/language.page';
import WorkOrdersMobilePage from '../../pageobjects/mobile/workOrders.page';
import DashboardPage from '../../pageobjects/mobile/dashboard.page';

import WorkOrderPage from '../../pageobjects/workOrder.page';

describe('Work orders Mobile suite', () => {
    afterEach(async function () {
        await LanguagePage.homeFooterIcon.click(); 
    });

    it('YUK-145 - The application stops working after the WO completed with empty fields', async () => {
        // await WorkOrderPage.assignWorkOrderToTheCrew();

        await LanguagePage.workOrdersFooterIcon.click();
        await browser.pause(1000);

        await WorkOrdersMobilePage.templateSelector.tap();
        await WorkOrdersMobilePage.scrollTemplatesElement.waitForExist({ timeout:5000 })
        
        //await WorkOrdersMobilePage.scrollTemplatesElement.$("//*[contains(@text, 'Test')]").scrollIntoView();
        //await WorkOrdersMobilePage.scrollTemplatesElement.scrollIntoView({scrollableElement: WorkOrdersMobilePage.scrollTemplatesElement});

        await WorkOrdersMobilePage.workOrders[0].tap();
        await expect(await WorkOrdersMobilePage.workOrderStatus.getText()).toEqual("Assigned");
        await WorkOrdersMobilePage.startWorkOrderButton.click();
        await WorkOrdersMobilePage.firstActivity.waitForDisplayed({ timeout: 5000 });
        await WorkOrdersMobilePage.firstActivity.click();
        await WorkOrdersMobilePage.nextButton.waitForDisplayed({ timeout: 5000 });
        await WorkOrdersMobilePage.nextButton.click();
        await WorkOrdersMobilePage.submitWorkorderButton.waitForDisplayed({ timeout: 5000 });
        await WorkOrdersMobilePage.submitWorkorderButton.click();
        await WorkOrdersMobilePage.doneButton.waitForDisplayed({ timeout: 5000 });
        await WorkOrdersMobilePage.doneButton.click();

        await expect(WorkOrdersMobilePage.backButton).toBeDisplayed();
        await WorkOrdersMobilePage.backButton.click();

        
        await expect(await WorkOrdersMobilePage.workOrders[0]).toBeDisplayed({
            message: 'The application should work after the WO completed with empty fields'
        });
    });
});