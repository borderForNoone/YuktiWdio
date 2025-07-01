import Page from './page';

class DashboardPage extends Page {
    public get complitedWorkOrders() {
        return $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[5]/android.widget.TextView[1]');
    }

    public get continueButton() {
        return $('//android.view.ViewGroup[@resource-id="btnContinue"]');
    }

    public get skipButton() {
        return $('//android.widget.TextView[@text="Skip"]');
    }

    public get averageCompletionTimeIcon() {
        return $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[8]');
    }
}

export default new DashboardPage();