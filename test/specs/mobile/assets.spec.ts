import LanguagePage from '../../pageobjects/mobile/language.page';
import WorkOrdersPage from '../../pageobjects/mobile/workOrders.page';
import DashboardPage from '../../pageobjects/mobile/dashboard.page';
import AssetPage from '../../pageobjects/mobile/assets.page';

describe('Assets Mobile suite', () => {
    afterEach(async function () {
        await DashboardPage.homeFooterIcon.click(); 
    });

    it('YUK-142 - A mobile user cannot see the asset assigned to him', async () => {
        await DashboardPage.assetsFooterIcon.waitForDisplayed({ timeout: 5000 });
        await DashboardPage.assetsFooterIcon.click();
        
        await AssetPage.installedAssetsTab.waitForDisplayed({ timeout: 5000 });
        await AssetPage.installedAssetsTab.click();

        await AssetPage.waitUntilElementsMoreThan(AssetPage.assets, 1);
    });
});