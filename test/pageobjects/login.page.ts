import { $ } from '@wdio/globals'
import Page from './page';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputEmail() {
        return $('input[name="userName"]');
    }

    public get inputPassword() {
        return $('input[name="password"]');
    }

    public get btnSubmit() {
        return $('.btn-signIn');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login(username: string, password: string) {
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('sign-in');
    }
}

export default new LoginPage();
