import Page from './page';

class AssetsPage extends Page {
    public get complitedWorkOrders() {
        return $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[5]/android.widget.TextView[1]');
    }

    public get continueButton() {
        return $('//android.view.ViewGroup[@resource-id="btnContinue"]');
    }

    public get skipButton() {
        return $('//android.widget.TextView[@text="Skip"]');
    }

    public get assets() {
        return $$("//*[contains(@text, 'Test')]");
    }

    public get installedAssetsTab() {
        return $('//android.widget.TextView[@text="Installed"]');
    }
}

export default new AssetsPage();