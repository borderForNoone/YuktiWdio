import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import WorkLocations from '../pageobjects/workLocations.page'
import workLocationsGroup from '../pageobjects/workLocationsGroup.page';

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

    it('TC_136, TC_137, TC_138, TC_140 - Check Address Field ', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue("abc@gmail.com");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();
        await WorkLocations.addressInputField.setValue("y");
        

        await expect(WorkLocations.addressInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a address for Minimum 10 char allow (TC_136)',
        });

        await WorkLocations.addressInputField.setValue("&");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Minimum 10 char allow(TC_137)',
        });

        await WorkLocations.zipCodeInputField.setValue("4235");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Only Numbers Not Allowed(TC_138)',
        });

        await WorkLocations.zipCodeInputField.setValue("kugiuew buihqwu 876 xhqguygi iygigiquw vyfutfqwui bigyiqwugi bigodugqwou bigqwfiugqif giqwdydiuwyodhqoh");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Max Length reached(TC_140)',
        });

    });


    it('TC_142, TC_143, TC_152, TC_153 - Check Zip code Field ', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue("abc@gmail.com");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();
        await WorkLocations.addressInputField.setValue("abcd");
        await WorkLocations.countrySelector.setValue("India");
        await WorkLocations.stateSelector.setValue("Delhi");
        await WorkLocations.citySelector.setValue("Delhi");
        await WorkLocations.zipCodeInputField.setValue("@@&%^$%^");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Invalid Input (TC_142)',
        });

        await WorkLocations.zipCodeInputField.setValue("hiuhoi&");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Max length reached(TC_143)',
        });

        await WorkLocations.zipCodeInputField.setValue("hiuhoi");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Only Numbers Allowed(TC_152)',
        });

         await WorkLocations.zipCodeInputField.setValue("2");

        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Invalid Zip code(TC_153)',
        });

    });

    it('TC_158 - Check Worklocation list ', async () => {
        await WorkLocations.open();

        await WorkLocations.workLocationTable.length > 0;

        await expect(WorkLocations.workLocationTable).toBeDisplayed({
            message: 'Expected work location table to be displayed  (TC_158)',
        });

    });

    it('TC_162 - Check Search bar', async () => {
        await workLocationsGroup.open();
        await workLocationsGroup.searchPanel.setValue("Default");
        await workLocationsGroup.workLocationGroupTable.length > 0;

        await expect(workLocationsGroup.workLocationGroupTable).toBeDisplayed({
            message: 'Expected work location table to be displayed  (TC_162)',
        });
    });

    it('TC_167, TC_169, TC_171 - Check Name', async () => {
        await workLocationsGroup.open();
        await workLocationsGroup.createWorkLocationGroupButton.click();
        await workLocationsGroup.groupNameErrorMsg.setValue("7688")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not a valid name (TC_167)',
        });

        await workLocationsGroup.groupNameErrorMsg.setValue("^*^*")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not allowed special char (TC_169)',
        });

        await workLocationsGroup.groupNameErrorMsg.setValue("u")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group name minimum length is 3 char (TC_171)',
        });
    });



    it('TC_177, TC_180 - Check Work location Group Templates', async () => {
        await workLocationsGroup.open();
        await workLocationsGroup.workLocationGroupTable.length > 0;
        await workLocationsGroup.workLocationGroupAction.length > 0
       
        await expect(workLocationsGroup.workLocationGroupAction).toBeDisplayed({
            message: 'Expected Delete button should be shown (TC_177)',
        });
        await expect(workLocationsGroup.workLocationGroupAction).toBeDisplayed({
            message: 'Expected Edit button should be shown (TC_180)',
        });
    });



    it('TC_182 - Check Error Message', async () => {
        await workLocationsGroup.open();
        await workLocationsGroup.createWorkLocationGroupButton.click();
        await workLocationsGroup.groupNameErrorMsg.setValue(" ")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group show a required message (TC_182)',
        });

        await workLocationsGroup.groupNameErrorMsg.setValue("nkcsd")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not showing any error message(TC_182)',
        });

    });


    it('TC_249, TC_251 - Check Label field inside text label bulding blocks for checkbox ', async () => {
        await WorkLocations.openWorkLocationTemplates();
 
        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();
 
        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuidingBlockButton.click();
        await WorkLocations.buildingBlockLableInputField.setValue(" ");
 
        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept space as input (TC_249)',
        });

        await WorkLocations.buildingBlockLableInputField.setValue("6869869");
 
        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept space as input (TC_251)',
        });
 
        await WorkLocations.buildingBlockLableInputField.setValue("@@@@@@");
 
        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept only special character as input',
        });
 
        await WorkLocations.buildingBlockLableInputField.setValue("q");
 
        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept one character as input ',
        });
    });
 
    it('TC_254, TC_256 - Check Name field inside text label bulding blocks for checkbox ', async () => {
        await WorkLocations.openWorkLocationTemplates();
 
        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();
 
        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuidingBlockButton.click();
        await WorkLocations.buildingBlockNameInputField.setValue(" ");
 
        await expect(WorkLocations.buildingBlockNameInputFieldErrorMsg).toBeDisplayed({
            message: 'Name should not accept space as input (TC_254)',
        });

        await WorkLocations.buildingBlockNameInputField.setValue("6869869");
 
        await expect(WorkLocations.buildingBlockNameInputFieldErrorMsg).toBeDisplayed({
            message: 'Name should not accept space as input (TC_256)',
        });
 
        await WorkLocations.buildingBlockNameInputField.setValue("@@@@@@");
 
        await expect(WorkLocations.buildingBlockNameInputFieldErrorMsg).toBeDisplayed({
            message: 'Name should not accept only special character as input',
        });
 
        await WorkLocations.buildingBlockNameInputField.setValue("q");
 
        await expect(WorkLocations.buildingBlockNameInputFieldErrorMsg).toBeDisplayed({
            message: 'Name should not accept one character as input ',
        });
    });
    
     it('TC_257 - Check Option field inside text label bulding blocks for checkbox ', async () => {
        await WorkLocations.openWorkLocationTemplates();
 
        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();
 
        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuidingBlockButton.click();
        await WorkLocations.buildingBlockOptionLabelInputField.setValue(" ");
 
        await expect(WorkLocations.buildingBlockOptionLabelErrorField).toBeDisplayed({
            message: 'Option Name should not accept space as input (TC_257)',
        });

        await WorkLocations.buildingBlockOptionLabelInputField.setValue("6869869");
 
        await expect(WorkLocations.buildingBlockOptionLabelErrorField).toBeDisplayed({
            message: 'Option Name should not accept space as input (TC_257)',
        });
 
        await WorkLocations.buildingBlockOptionLabelInputField.setValue("@@@@@@");
 
        await expect(WorkLocations.buildingBlockOptionLabelErrorField).toBeDisplayed({
            message: 'Option Name should not accept only special character as input (TC_257)',
        });
 
        await WorkLocations.buildingBlockOptionLabelInputField.setValue("q");
 
        await expect(WorkLocations.buildingBlockOptionLabelErrorField).toBeDisplayed({
            message: 'Option Name should not accept one character as input (TC_257)',
        });
    });
});