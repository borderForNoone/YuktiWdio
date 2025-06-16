import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import ProjectPage from '../pageobjects/project.page'

describe.skip('Project suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it('YUK-54 - A newly created project appears in the top panel only after refreshing the page.', async () => {
        await ProjectPage.open();

        await expect(ProjectPage.createProjectButton).toBeDisplayed();
        await ProjectPage.createProjectButton.click();

        await ProjectPage.projectNameInputField.setValue("Test");
        await ProjectPage.totalWorkordersInputField.setValue("Test");
        await ProjectPage.startDate.setValue("");
    });
});

