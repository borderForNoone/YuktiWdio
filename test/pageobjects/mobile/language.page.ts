import Page from './page';

class LanguagePage extends Page {
    public get chooseEnglishButton() {
        return $('//android.view.ViewGroup[@resource-id="btnEnglish"]');
    }

    public get continueButton() {
        return $('//android.view.ViewGroup[@resource-id="btnContinue"]');
    }

    public get skipButton() {
        return $('//android.widget.TextView[@text="Skip"]');
    }
}

export default new LanguagePage();