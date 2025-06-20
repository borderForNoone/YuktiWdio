import Page from './page';

class LoginPage extends Page {
    public get inputEmail() {
        return $('input[name="userName"]');
    }

    public get inputEmailErrorMsg() {
        return $('input[name="userName"] + span.error-label');
    }

    public get inputPassword() {
        return $('input[name="password"]');
    }

    public get inputtPasswordErrorMsg() {
        return $('span.ant-input-password + span.error-label');
    }

    public get btnSubmit() {
        return $('.btn-signIn');
    }

    public async login(username: string, password: string) {
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public open () {
        return super.open('sign-in');
    }
}

export default new LoginPage();
