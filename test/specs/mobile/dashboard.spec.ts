import languagePage from '../../pageobjects/mobile/language.page';
import workOrdersMobilePage from '../../pageobjects/mobile/workOrders.page';
import DashboardPage from '../../pageobjects/mobile/dashboard.page';

import workOrderPage from '../../pageobjects/workOrder.page';

describe('Dashboard Mobile suite', () => {
    afterEach(async function () {
        // await workOrdersMobilePage.homeFooterIcon.click(); 
    });

    it('TC_08 - Check Average completion time icon in work orders are clickable.', async () => {
        await expect(DashboardPage.averageCompletionTimeIcon).toBeDisplayed();
        
        await DashboardPage.averageCompletionTimeIcon.click();
        await expect(DashboardPage.averageCompletionTimeIcon).not.toBeDisplayed({
            message: 'Should open a average Completion Time page (TC_08)',
        });
    });

    it('YUK-140 - It is not possible to view work orders on the dashboard immediately after the WO is completed. You need to re-enter the application', async () => {
        await workOrderPage.assignWorkOrderToTheCrew(0);
        const complitedWorkOrdersText = await DashboardPage.complitedWorkOrders.getText();
        const complitedWorkOrders = parseInt(complitedWorkOrdersText, 10);

        await languagePage.workOrdersFooterIcon.click();
        await browser.pause(500);

        await workOrdersMobilePage.templateSelector.click();
        await workOrdersMobilePage.scrollTemplatesElement.waitForDisplayed({timeout:5000});
        await workOrdersMobilePage.templatePilotProjectElement.scrollIntoView({scrollableElement: workOrdersMobilePage.scrollTemplatesElement});
        await workOrdersMobilePage.templatePilotProjectElement.click();
        await browser.pause(1000);
   
        await workOrdersMobilePage.workOrders[0].tap();
        await expect(await workOrdersMobilePage.workOrderAssignedStatus.getText()).toEqual("Assigned");
        await workOrdersMobilePage.startWorkOrderButton.click();
        await workOrdersMobilePage.completeFirstAndSecondActivity();
        
        await workOrdersMobilePage.homeFooterIcon.click();
        await expect(parseInt(await DashboardPage.complitedWorkOrders.getText())).toBeGreaterThan(complitedWorkOrders);
    });
});