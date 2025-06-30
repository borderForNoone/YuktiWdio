import LanguagePage from '../../pageobjects/mobile/language.page';
import WorkOrdersPage from '../../pageobjects/mobile/workOrders.page';
import DashboardPage from '../../pageobjects/mobile/dashboard.page';

describe('Dashboard Mobile suite', () => {
    afterEach(async function () {
        await LanguagePage.homeFooterIcon.click(); 
    });

    it.skip('should launch the app and show the main screen', async () => {
        await LanguagePage.chooseEnglishButton.click();
        await LanguagePage.continueButton.click();

        await browser.pause(3000);
    });

    it('YUK-140 - It is not possible to view work orders on the dashboard immediately after the WO is completed. You need to re-enter the application', async () => {
        //await WorkOrderPage.assignWorkOrderToTheCrew();
        const complitedWorkOrdersText = await DashboardPage.complitedWorkOrders.getText();
        const complitedWorkOrders = parseInt(complitedWorkOrdersText, 10);

        await LanguagePage.workOrdersFooterIcon.click();
   
        await browser.pause(500);
        await WorkOrdersPage.workOrders[0].tap();
        await expect(await WorkOrdersPage.workOrderStatus.getText()).toEqual("Assigned");
        await WorkOrdersPage.startWorkOrderButton.click();
        await WorkOrdersPage.compliteFirstAndSecondActivity();
        
        await WorkOrdersPage.homeFooterIcon.click();
        await expect(parseInt(await DashboardPage.complitedWorkOrders.getText())).toBeGreaterThan(complitedWorkOrders);
    });
});