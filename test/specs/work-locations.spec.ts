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
                await WorkLocations.workLocationEditButtons[i].moveTo();

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
        await WorkLocations.firsEditBuildingBlockButton.click();
        const longText = 'A'.repeat(51); 
        await WorkLocations.buildingBlockLableInputField.setValue(longText);

        const value = await WorkLocations.buildingBlockLableInputField.getText();
    
        let text = '';
        text = JSON.stringify(value);

        await expect(text.length).toBeLessThanOrEqual(30);
    });

    it('TC_109, TC_187 - Check work locations Search bar ', async () => {
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

    it('TC_127, TC_128, TC_129, TC_130, TC_131 - Check Email Field ', async () => {
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

        await WorkLocations.cancelButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue("@@@@@@@");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.emailInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a email @@@@@@@ value (TC_128)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue("1111111");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.emailInputFieldErrorMsg).toBeDisplayed({
            message: 'Email should not accept numeric as input 1111111 (TC_129)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue("weweewe");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.emailInputFieldErrorMsg).toBeDisplayed({
            message: 'Email should not accept only alphabet character as input weweewe (TC_130)',
        });

        await WorkLocations.cancelButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("1245676777");
        await WorkLocations.emailInputField.setValue(" ");
        await WorkLocations.locationIdentifierInputField.setValue("1245676777");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.emailInputFieldErrorMsg).toBeDisplayed({
            message: 'Email should not accept space as input, email accept email type data as input (TC_131)',
        });
    });

    it('TC_133, TC_135 - Check Location identifiers Field ', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();


        const randomSuffix = Math.floor(Math.random() * 100000); 
        const randomName = `Test${randomSuffix}`;
        await WorkLocations.contactNameInputField.setValue(randomName);

        await WorkLocations.phoneInputField.setValue("123");
        await WorkLocations.locationIdentifierInputField.setValue("kbbnmmjjlluiookilllllillooolilo");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await expect(WorkLocations.locationIdentifierInputFieldErrorMsg).toBeDisplayed({
            message: 'Location identifier should not more than 10 symbol (TC_133)',
        });

        await WorkLocations.locationIdentifierInputField.setValue("@@@@");

        await expect(WorkLocations.emailInputFieldErrorMsg).toBeDisplayed({
            message: 'Location identifier should not accept special character as input (TC_135)',
        });
    });

    it('TC_184, TC_185, TC_186 - Check Label field inside text label bulding blocks ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.buildingBlockLableInputField.setValue(" ");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept space as input (TC_184)',
        });

        await WorkLocations.buildingBlockLableInputField.setValue("@@@@@@");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept special character as input (TC_185)',
        });

        await WorkLocations.buildingBlockLableInputField.setValue("q");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept one character as input (TC_186)',
        });
    });

    it('TC_188, TC_189, TC_190 - Check Display Dependent on field inside text label bulding blocks ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.buildingBlockdisplayDependentOnInputField.setValue("text");

        await expect(WorkLocations.buildingBlockdisplayDependentOnInputFieldErrorMsg).toBeDisplayed({
            message: 'Display Dependent on should not accept infinite data as input (TC_188)',
        });

        await WorkLocations.buildingBlockdisplayDependentOnInputField.setValue("@@@@");

        await expect(WorkLocations.buildingBlockdisplayDependentOnInputFieldErrorMsg).toBeDisplayed({
            message: 'Display Dependent on should not accept special character as input (TC_189)',
        });

        await WorkLocations.buildingBlockdisplayDependentOnInputField.setValue(" ");

        await expect(WorkLocations.buildingBlockdisplayDependentOnInputFieldErrorMsg).toBeDisplayed({
            message: 'Display Dependent on should not accept space as input (TC_190)',
        });
    });

    it('TC_57, TC_161, TC_162 - When attempting to edit a work location created by another vendor using default values, an invalid or unclear error message is shown, making it hard to understand the issue. ', async () => {
        await WorkLocations.open();
        
        await expect(WorkLocations.searchPanel).toBeDisplayed();
        await WorkLocations.searchPanel.addValue("CRYS31799");
        await browser.keys('Enter');

        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) === 2,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations list did not load in time',
            }
        );

        await WorkLocations.workLocationEditButtons[0].moveTo();
        await WorkLocations.dropdownEditOption.click();

        await WorkLocations.saveButton.click();
        await WorkLocations.messageError.waitForDisplayed({ timeout: 5000 });
        const errorText = await WorkLocations.messageError.getText();
        await expect(errorText).not.toBe('Validation Failed.');
    });

    it('TC_191, TC_192, TC_193 - Check Data Validation field inside text label bulding blocks', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.dataValidationInputField.setValue(" ");

        await expect(WorkLocations.dataValidationInputFieldErrorMsg).toBeDisplayed({
            message: 'Data Validation should not accept space as input (TC_191)',
        });

        await WorkLocations.dataValidationInputField.setValue("@@@@@@");

        await expect(WorkLocations.dataValidationInputFieldErrorMsg).toBeDisplayed({
            message: 'Display Dependent on should not accept special character as input (TC_192)',
        });

        await WorkLocations.dataValidationInputField.setValue("y");

        await expect(WorkLocations.dataValidationInputFieldErrorMsg).toBeDisplayed({
            message: 'Data Validation should not accept one character as input (TC_193)',
        });
    });

    it('TC_206, TC_207 - Check Label field inside Input field bulding blocks', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.buildingBlockLableInputField.setValue("111");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept numeric data as input (TC_206)',
        });

        await WorkLocations.buildingBlockLableInputField.setValue(" ");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept space as input (TC_207)',
        });
    });

    it('TC_208, TC_211 - Check placeholder field Work location Templates text Input Field building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.placeholderInputFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.placeholderInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Placeholder should not accept space as input (TC_208)',
        });

        await WorkLocations.placeholderInputFieldBuildingBlock.setValue("1323234");

        await expect(WorkLocations.placeholderInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Placeholder should not accept numeric value as input (TC_211)',
        });
    });

    it('TC_212, TC_213 - Check Name field Work location Templates text Input Field building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.nameInputFieldBuildingBlock.setValue("1323234");

        await expect(WorkLocations.nameInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Name should not accept numeric value as input (TC_212)',
        });

        await WorkLocations.nameInputFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.nameInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Name should not accept space as input (TC_213)',
        });
    });

    it('TC_218 - Check Value field Work location Templates text Input Field building block ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.valueInputFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.valueInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Value should not accept space as input (TC_218)',
        });
    });

    it('TC_222 - Check display dependent field Work location Templates text Input Field building block ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.displayDependentFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.displayDependentFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_222)',
        });
    });

    it('TC_225 - Check Required dependent on field Work location Templates text Input Field building block ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.requiredDependentOnFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.requiredDependentOnFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_225)',
        });
    });

    it('TC_229, TC_231 - Check Data Validation field Work location Templates text Input Field building block ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.dataValidationInputField.setValue(" ");

        await expect(WorkLocations.dataValidationInputFieldErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_229)',
        });

        await WorkLocations.dataValidationInputField.setValue("232334344");

        await expect(WorkLocations.dataValidationInputFieldErrorMsg).toBeDisplayed({
            message: 'Should not accept numeric as input (TC_231)',
        });
    });

    it('TC_240, TC_243 - Check Min and Max Length Work location Templates text Input Fields building block ', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.minLengthFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.minLengthFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_240)',
        });

        await WorkLocations.maxLengthFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.maxLengthFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_243)',
        });
    });

    it('TC_281, TC_283 - Check label field Work location Templates Radio Group building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.radioGroupBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.buildingBlockLableInputField.setValue(" ");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept space as input (TC_281)',
        });

        await WorkLocations.buildingBlockLableInputField.setValue("232434");

        await expect(WorkLocations.buildingBlockLableInputFieldErrorMsg).toBeDisplayed({
            message: 'Label should not accept numeric as input (TC_283)',
        });
    });

    it('TC_286, TC_288 - Check Name field Work location Templates Radio Group building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.radioGroupBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.nameInputFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.nameInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_286)',
        });

        await WorkLocations.nameInputFieldBuildingBlock.setValue("232434");

        await expect(WorkLocations.nameInputFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Label should not accept numeric as input (TC_283)',
        });
    });

    it('TC_290, TC_292 - Check Options fields Work location Templates Radio Group building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.radioGroupBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.firstOptionInputBlock.setValue(" ");

        await expect(WorkLocations.firstOptionInputBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_290)',
        });

        await WorkLocations.secondOptionInputBlock.setValue(" ");

        await expect(WorkLocations.secondOptionInputBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_290)',
        });

        await WorkLocations.firstOptionInputBlock.setValue("232434");

        await expect(WorkLocations.firstOptionInputBlockErrorMsg).toBeDisplayed({
            message: 'Label should not accept numeric as input (TC_292)',
        });

        await WorkLocations.secondOptionInputBlock.setValue("232434");

        await expect(WorkLocations.secondOptionInputBlockErrorMsg).toBeDisplayed({
            message: 'Label should not accept numeric as input (TC_292)',
        });
    });

    it('TC_293, TC_294 - Check display dependent on field Work location Templates Radio Group building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.radioGroupBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.displayDependentFieldBuildingBlock.setValue("12232");

        await expect(WorkLocations.displayDependentFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept numeric as input (TC_293)',
        });

        await WorkLocations.displayDependentFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.displayDependentFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_294)',
        });
    });

    it('TC_298 - Check Required dependent on field Work location Templates Radio Group building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.radioGroupBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.requiredDependentOnFieldBuildingBlock.setValue(" ");

        await expect(WorkLocations.requiredDependentOnFieldBuildingBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_298)',
        });
    });

    it('TC_301 - Check Edit AI Reading After X Attempts Work location Templates AI Meter photo building block', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await expect(WorkLocations.createWorkLocationTemplateButton).toBeDisplayed();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await WorkLocations.aIMeterPhotoBlock.click();
        await WorkLocations.firsEditBuildingBlockButton.click();
        await WorkLocations.editAIReadingInputBlock.setValue(" ");

        await expect(WorkLocations.editAIReadingInputBlockErrorMsg).toBeDisplayed({
            message: 'Should not accept space as input (TC_301)',
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
        await WorkLocations.countrySelector.selectByVisibleText('India');
        await WorkLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WorkLocations.citySelector.selectByVisibleText('Sillod');
        await WorkLocations.zipInputField.addValue("@@&%^$%^");
 
        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Invalid Input (TC_142)',
        });
 
        await WorkLocations.zipInputField.setValue("hiuhoi&");
 
        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Max length reached(TC_143)',
        });
 
        await WorkLocations.zipInputField.setValue("hiuhoi");
 
        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Only Numbers Allowed(TC_152)',
        });
 
         await WorkLocations.zipInputField.setValue("2");
 
        await expect(WorkLocations.zipInputFieldErrorMsg).toBeDisplayed({
            message: 'Expected error message to be shown for a zip value for Invalid Zip code(TC_153)',
        });
 
    });
 
    it('TC_158 - Check Worklocation list ', async () => {
        await WorkLocations.open();

        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) > 2,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations list did not load in time',
            }
        );
 
        await expect(WorkLocations.workLocations[3]).toBeDisplayed({
            message: 'Expected work location table to be displayed  (TC_158)',
        });
 
    });
 
    it('TC_167, TC_169, TC_171 - Check Name', async () => {
        await WorkLocations.openWorkLocationGroups();
        await WorkLocations.createWorkLocationGroupButton.click();
        await WorkLocations.groupNameInputField.setValue("7688")
        await expect(WorkLocations.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not a valid name (TC_167)',
        });
 
        await WorkLocations.groupNameInputField.setValue("^*^*")
        await expect(WorkLocations.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not allowed special char (TC_169)',
        });
 
        await WorkLocations.groupNameInputField.setValue("u")
        await expect(WorkLocations.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group name minimum length is 3 char (TC_171)',
        });
    });
 
    it('TC_177, TC_180 - Check Work location Group Templates', async () => {
        await WorkLocations.openWorkLocationGroups();
        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) > 0,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations list did not load in time',
            }
        );
       
        await WorkLocations.workLocationEditButtons[0].moveTo();
        await WorkLocations.dropdownEditOption.click();

        await expect(WorkLocations.workLocationGroupAction).toBeDisplayed({
            message: 'Expected Delete button should be shown (TC_177)',
        });
        await expect(WorkLocations.workLocationGroupAction).toBeDisplayed({
            message: 'Expected Edit button should be shown (TC_180)',
        });
    });
 
    it('TC_182 - Check Error Message Group Templates', async () => {
        await WorkLocations.openWorkLocationGroups();
        await WorkLocations.createWorkLocationGroupButton.click();
        await WorkLocations.groupNameInputField.setValue(" ")
        await expect(WorkLocations.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group show a required message (TC_182)',
        });
 
        await WorkLocations.groupNameInputField.setValue("nkcsd")
        await expect(WorkLocations.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not showing any error message(TC_182)',
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
        await workLocationsGroup.groupNameInputField.setValue("7688")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not a valid name (TC_167)',
        });

        await workLocationsGroup.groupNameInputField.setValue("^*^*")
        await expect(workLocationsGroup.groupNameErrorMsg).toBeDisplayed({
            message: 'Expected work location group not allowed special char (TC_169)',
        });

        await workLocationsGroup.groupNameInputField.setValue("u")
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
        await WorkLocations.firsEditBuildingBlockButton.click();
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
        await WorkLocations.firsEditBuildingBlockButton.click();
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
        await WorkLocations.firsEditBuildingBlockButton.click();
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