import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

describe('Login suite', () => {
    it('YUK-117 - Login valid', async () => {
        await LoginPage.open();

        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(SecurePage.messageSuccess).toBeExisting()
        await expect(SecurePage.messageSuccess).toHaveText(
        expect.stringContaining('Login successfully.'));
    });
});

