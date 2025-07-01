import languagePage from '../../pageobjects/mobile/language.page';
import workOrdersMobilePage from '../../pageobjects/mobile/workOrders.page';
import dashboardPage from '../../pageobjects/mobile/dashboard.page';

import WorkOrderPage from '../../pageobjects/workOrder.page';

describe('Work orders Mobile suite', () => {
    afterEach(async function () { 
    });

    it('TC_01 - Assined to te WO project is not visible', async () => {
        await dashboardPage.workOrdersFooterIcon.click();
        await workOrdersMobilePage.templateSelector.click();
        await workOrdersMobilePage.scrollTemplatesElement.waitForDisplayed({timeout:5000});
        await workOrdersMobilePage.templateTestElement.scrollIntoView({scrollableElement: workOrdersMobilePage.scrollTemplatesElement});
        await workOrdersMobilePage.templateTestElement.click();
        await browser.pause(500);

        await workOrdersMobilePage.workOrders[0].tap();
        try {
            await expect(workOrdersMobilePage.projectTab).toBeDisplayed({
                message: "Assigned project is not visible (TC_01)"
            });
        } catch (error) {
            await workOrdersMobilePage.backButton.click();
            await browser.pause(1000);
            await workOrdersMobilePage.homeFooterIcon.click();

            throw error;
        }
    });

    it('YUK-147 - WOs for the same location and Warehouse marked as Unassigned', async () => {
        await WorkOrderPage.assignWorkOrderToTheCrew(7);

        await languagePage.workOrdersFooterIcon.click();
        await $("//*[contains(@text, 'Test1234')]").scrollIntoView();

        const workOrders = await workOrdersMobilePage.workOrders;
        await workOrders[await workOrders.length - 1].tap();
        
        await browser.pause(1000);
        try {
            await expect(workOrdersMobilePage.workOrderAssignedStatus).toBeDisplayed({
                message: "wo is assigned (TC_01)"
            });
        } catch (error) {
            await workOrdersMobilePage.backButton.click();
            await browser.pause(1000);
            await workOrdersMobilePage.homeFooterIcon.click();

            throw error;
        }
    });

    it('YUK-145, YUK-144 - The application stops working after the test Template WO completed with empty fields', async () => {
        // await WorkOrderPage.assignWorkOrderToTheCrew(7);

        await languagePage.workOrdersFooterIcon.click();

        await workOrdersMobilePage.workOrders[0].tap();
        await expect(await workOrdersMobilePage.workOrderAssignedStatus.getText()).toEqual("Assigned");
        await workOrdersMobilePage.startWorkOrderButton.click();
        await workOrdersMobilePage.firstActivity.waitForDisplayed({ timeout: 5000 });
        await workOrdersMobilePage.firstActivity.click();
        await workOrdersMobilePage.nextButton.waitForDisplayed({ timeout: 5000 });
        await workOrdersMobilePage.nextButton.click();
        await workOrdersMobilePage.submitWorkorderButton.waitForDisplayed({ timeout: 5000 });
        await workOrdersMobilePage.submitWorkorderButton.click();
        await workOrdersMobilePage.doneButton.waitForDisplayed({ timeout: 5000 });
        await workOrdersMobilePage.doneButton.click();
        
        await browser.pause(4000);
        await expect(workOrdersMobilePage.workOrders[0]).toBeDisplayed({
            message: 'The application should work after the WO completed with empty fields'
        });
    });


});