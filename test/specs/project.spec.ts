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

    it.skip('YUK-54 - A newly created project appears in the top panel only after refreshing the page.', async () => {
        await ProjectPage.open();

        await expect(ProjectPage.createProjectButton).toBeDisplayed();
        await ProjectPage.createProjectButton.click();

        await ProjectPage.projectNameInputField.setValue("Test");
        await ProjectPage.totalWorkordersInputField.setValue("Test");
        await ProjectPage.startDate.setValue("");
    });

    it.skip('YUK-56 - If I click in the middle of the window to select a date, the calendar does not appear, I have to click on the small icon', async () => {
        await ProjectPage.open();

        await browser.waitUntil(async () => {
            const elements = await ProjectPage.projectEditButtons;
            return await elements.length > 2;
        }, {
            timeout: 5000,
            timeoutMsg: 'Expected at least two edit button to be present'
        });

        for (let i = 0; i < await ProjectPage.projects.length; i++) {
            const order = ProjectPage.projects[i];
            const text = await order.getText();

            if (text.includes('Test123')) {
                await ProjectPage.projectEditButtons[i].moveTo();

                await ProjectPage.dropdownEditOption.click();

                break; 
            }
        }

        await ProjectPage.startDate.addValue("22.22.2222");
        await expect(ProjectPage.startDate);
    });
});