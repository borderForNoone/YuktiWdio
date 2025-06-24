import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WorkLocations from '../pageobjects/workLocations.page'

describe('Work locations suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it.skip('YUK-110 - User(Vendor) can create new work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.phoneInputField.setValue("123");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await WorkLocations.addressInputField.setValue(randomName);

        await WorkLocations.countrySelector.selectByVisibleText('India');
        await WorkLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WorkLocations.citySelector.selectByVisibleText('Sillod');
        await WorkLocations.zipCodeInputField.setValue("100");
    
        while (!(await WorkLocations.workLocationTemplateSelector.isDisplayed())) {
            await expect(WorkLocations.nextButton).toBeClickable();
            await WorkLocations.nextButton.click();

            await browser.pause(500);
        }

        await WorkLocations.workLocationTemplateSelector.selectByVisibleText('Test_3_6_25');
        await WorkLocations.nextButton.click();

        await WorkLocations.accessGroupSelector.selectByVisibleText('test');
        await WorkLocations.nextButton.click();
        await expect(WorkLocations.createWorkLocationButton).toBeDisplayed();
        await WorkLocations.createWorkLocationButton.click();

        await expect(WorkLocations.messageSuccess).toHaveText("Successs");
    });

    it('YUK-136 - Can create Work Location with the same Location Identifier', async () => {
        await WorkLocations.open();

        await expect(WorkLocations.searchPanel).toBeDisplayed();
        await WorkLocations.searchPanel.addValue("CRYS35727");
        await browser.keys('Enter');

        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) > 1,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations list did not load in time',
            }
        );

        await expect(WorkLocations.workLocations[0]).toHaveText(/CRYS35727/);
        await expect(WorkLocations.workLocations[1]).not.toHaveText(/CRYS35727/);
    });

    it('YUK-130 - User does not see error message for verification when creating a new work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.phoneInputField.setValue("123");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await WorkLocations.addressInputField.setValue(randomName);

        await WorkLocations.countrySelector.selectByVisibleText('India');
        await WorkLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WorkLocations.citySelector.selectByVisibleText('Sillod');
        await WorkLocations.zipCodeInputField.setValue("100");
    
        while (!(await WorkLocations.workLocationTemplateSelector.isDisplayed())) {
            await expect(WorkLocations.nextButton).toBeClickable();
            await WorkLocations.nextButton.click();

            await browser.pause(500);
        }

        await WorkLocations.workLocationTemplateSelector.selectByVisibleText('Test_3_6_25');
        await WorkLocations.nextButton.click();

        await WorkLocations.accessGroupSelector.selectByVisibleText('test');
        await WorkLocations.nextButton.click();
        await expect(WorkLocations.createWorkLocationButton).toBeDisplayed();
        await WorkLocations.createWorkLocationButton.click();

        await WorkLocations.messageError.waitForDisplayed({ timeout: 5000 });
        await WorkLocations.messageError.waitForDisplayed({ timeout: 5000 });
        const errorText = await WorkLocations.messageError.getText();
        expect(errorText).not.toBe('Validation Failed.');
    });

    it('YUK-134 - Phone validation does not work when creating a Work Location', async () => {
        await WorkLocations.open();

        await expect(WorkLocations.searchPanel).toBeDisplayed();
        await WorkLocations.searchPanel.addValue("Test");
        await browser.keys('Enter');

        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) === 1,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations list did not load in time',
            }
        );

        for (let i = 0; i < await WorkLocations.workLocations.length; i++) {
            const order = WorkLocations.workLocations[i];
            const text = await order.getText();

            if (text.includes('Test_DTR_Sudipda')) {
                await WorkLocations.workOrderEditButtons[i].moveTo();

                await WorkLocations.dropdownEditOption.click();

                break; 
            }
        }

        await WorkLocations.phoneInputField.addValue("1");
        await WorkLocations.saveButton.click();
        await expect(WorkLocations.messageError).toBeDisplayed();
    });

    it('TC_105 - Check building block "text label" in Work Location Template', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuidingBlockButton.click();
        const longText = 'A'.repeat(51); 
        await WorkLocations.buildingBlockLableInputField.setValue(longText);

        const value = await WorkLocations.buildingBlockLableInputField.getText();
    
        let text = '';
        text = JSON.stringify(value);

        await expect(text.length).toBeLessThanOrEqual(30);
    });

    it('TC_109 - Check work locations Search bar ', async () => {
        await WorkLocations.open();

        await expect(WorkLocations.searchPanel).toBeDisplayed();

        const longText = 'A'.repeat(70);
        await WorkLocations.searchPanel.addValue(longText);

        const value = await WorkLocations.searchPanel.getValue();

        console.log('Input value length:', value.length);
        console.log('Input value:', value);

        await expect(value.length).toBeLessThanOrEqual(60);
    });

    it('TC_115, TC_116, TC_119 - Check Contact name ', async () => {
        await WorkLocations.open();
        
        await WorkLocations.createWorkLocationButton.click();

        await WorkLocations.contactNameInputField.setValue("123");
        await expect(await WorkLocations.contactNameInputField.getValue()).toBe('');

        await WorkLocations.contactNameInputField.setValue("@@@");
        await expect(await WorkLocations.contactNameInputField.getValue()).toBe('');

        await WorkLocations.contactNameInputField.setValue(111);

        await expect(await WorkLocations.contactNameInputField.getValue()).toBe('');
    });

    it('TC_122, TC_123, TC_125, TC_126 - Check Phone field ', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.phoneInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for 1-digit phone number (TC_122)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.createWorkLocationButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');


        await WorkLocations.phoneInputField.setValue("@@@");
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.phoneInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for symbol-only phone input (TC_123)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.createWorkLocationButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');


        await WorkLocations.phoneInputField.setValue("@@@");
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.phoneInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for symbol-only phone input (TC_123)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.createWorkLocationButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');


        await WorkLocations.phoneInputField.setValue("ttyth");
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.phoneInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown character as phone input (TC_125)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.createWorkLocationButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');


        await WorkLocations.phoneInputField.setValue("12596867867867687686787876876465");
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.phoneInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for more than 20 symbol as phone input (TC_126)',
        });
    });

    it('TC_127 - Check Email Field ', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue("a");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.emailInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a email value (TC_127)',
        });
    });
});