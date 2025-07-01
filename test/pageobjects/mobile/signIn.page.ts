import Page from './page';

class SignInPage extends Page {
    public get phoneInput() {
        return $('//android.widget.EditText[@resource-id="phoneInput"]');
    }

    public get btnNext() {
        return $('//android.view.ViewGroup[@resource-id="btnNext"]');
    }
}

export default new SignInPage();