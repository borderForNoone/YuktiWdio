import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/login.page'
import DashboardPage from '../../pageobjects/dashboard.page'
import WorkLocations from '../../pageobjects/workLocations.page'

const randomSuffix = Math.floor(Math.random() * 100000); 
const randomName = `Test${randomSuffix}`;

describe('Work locations e2e tests suite', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
        await expect(DashboardPage.messageSuccess).toBeExisting();
        await expect(DashboardPage.messageSuccess).toHaveText(
            expect.stringContaining('Login successfully.')
        );
    });

    it('YUK-110 - User(Vendor) can create new work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.phoneInputField.setValue(`${process.env.PHONE}`);
        await WorkLocations.locationIdentifierInputField.setValue(randomName);
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
        await expect(WorkLocations.createWorkLocationButton).toBeDisplayed();
        await WorkLocations.createWorkLocationButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-107 - User(Vendor) can edit created work location', async () => {
        await WorkLocations.open();

        await expect(WorkLocations.searchPanel).toBeDisplayed();
        await WorkLocations.searchPanel.addValue("Test71924");
        await browser.keys('Enter');

        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) === 1,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations list did not load in time',
            }
        );

        await WorkLocations.workLocationEditButtons[0].moveTo();
        await WorkLocations.dropdownEditOption.click();

        await 
        await WorkLocations.contactNameInputField.setValue(randomName + "123");
        await WorkLocations.phoneInputField.addValue(`${process.env.PHONE}`);


        await WorkLocations.saveButton.click();
        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-159 - User(Vendor) can create new Location Group', async () => {
        await WorkLocations.openWorkLocationGroups();

        await WorkLocations.createWorkLocationGroupButton.click();
        await WorkLocations.groupNameInputField.setValue(randomName);

        await WorkLocations.createWorkLocationGroupButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-160 - User(Vendor) can edit created work location group', async () => {
        await WorkLocations.openWorkLocationGroups();

        await browser.waitUntil(async () => (
            await WorkLocations.workLocations.length) > 2,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations groups list did not load in time',
            }
        );
        await WorkLocations.workLocationEditButtons[1].moveTo();
        await WorkLocations.dropdownEditOption.click();

        await WorkLocations.groupNameInputField.setValue(randomName + "213");

        await WorkLocations.saveButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-109 - User(Vendor) can create new Location Template', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await WorkLocations.createWorkLocationTemplateButton.click();
        await WorkLocations.templateNameInputField.setValue(randomName);
        await WorkLocations.statusSwitch.click();
        await WorkLocations.textLableBuildingBlock.click();
        await WorkLocations.textInputFieldBuildingBlock.click();
        await WorkLocations.createWorkLocationTemplateButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-52 - User(Vendor) can edit his work location template', async () => {
        await WorkLocations.openWorkLocationTemplates();

        await browser.waitUntil(async () => (
            await WorkLocations.editWorkLocationTemplateButtons.length) > 15,
            {
                timeout: 5000,
                timeoutMsg: 'work Locations edit buttons list did not load in time',
            }
        );
        await WorkLocations.editWorkLocationTemplateButtons[19].click();

        await WorkLocations.templateNameInputField.setValue(randomName + "123");
        await WorkLocations.createWorkLocationTemplateButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-131 - User(Vendor) can see created new Work Location Group when creating a new work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();
        await WorkLocations.contactNameInputField.setValue(randomName);
        await WorkLocations.phoneInputField.setValue(`${process.env.PHONE}`);
        await WorkLocations.locationIdentifierInputField.setValue(randomName);
        await WorkLocations.worklocationGroupSelector.selectByVisibleText(randomName);
        await WorkLocations.nextButton.click();
        await expect(WorkLocations.addressInputField).toBeDisplayed();
    });

    it('YUK-156 - User(Vendor) can create Work location with barcode template', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        await WorkLocations.contactNameInputField.setValue(randomName + "123");
        await WorkLocations.phoneInputField.setValue(`${process.env.PHONE}`);
        await WorkLocations.locationIdentifierInputField.setValue(randomName + "123");
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

        await WorkLocations.workLocationTemplateSelector.selectByVisibleText('Barcode');
        await WorkLocations.barcodeInputField.setValue(1234);

        await WorkLocations.nextButton.click();
        await WorkLocations.accessGroupSelector.selectByVisibleText('test');
        await expect(WorkLocations.createWorkLocationButton).toBeDisplayed();
        await WorkLocations.createWorkLocationButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-132 - User(Vendor) can see correct field and lable for work location template(Text input), when creating a work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        await WorkLocations.contactNameInputField.setValue(randomName + "12");
        await WorkLocations.phoneInputField.setValue(`${process.env.PHONE}`);
        await WorkLocations.locationIdentifierInputField.setValue(randomName + "12");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await WorkLocations.addressInputField.setValue(randomName + "12");

        await WorkLocations.countrySelector.selectByVisibleText('India');
        await WorkLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WorkLocations.citySelector.selectByVisibleText('Sillod');
        await WorkLocations.zipCodeInputField.setValue("100");
    
        while (!(await WorkLocations.workLocationTemplateSelector.isDisplayed())) {
            await expect(WorkLocations.nextButton).toBeClickable();
            await WorkLocations.nextButton.click();

            await browser.pause(500);
        }

        await WorkLocations.workLocationTemplateSelector.selectByVisibleText('a');
        await expect(WorkLocations.textLable).toHaveText(/Text Label/);
        await expect(WorkLocations.inputField).toBeDisplayed();
        await WorkLocations.nextButton.click();
        
        await WorkLocations.accessGroupSelector.selectByVisibleText('test');
        await expect(WorkLocations.createWorkLocationButton).toBeDisplayed();
        await WorkLocations.createWorkLocationButton.click();

        await expect(WorkLocations.messageSuccess).toBeDisplayed();
    });

    it('YUK-148 - User(Vendor) can upload img in created template with img while creating a work location', async () => {
        await WorkLocations.open();

        await WorkLocations.createWorkLocationButton.click();

        await WorkLocations.contactNameInputField.setValue(randomName + "12345");
        await WorkLocations.phoneInputField.setValue(`${process.env.PHONE}`);
        await WorkLocations.locationIdentifierInputField.setValue(randomName + "12345");
        await WorkLocations.worklocationGroupSelector.selectByVisibleText('Default');
        await WorkLocations.nextButton.click();

        await WorkLocations.addressInputField.setValue(randomName + "12345");

        await WorkLocations.countrySelector.selectByVisibleText('India');
        await WorkLocations.stateSelector.selectByVisibleText('Maharashtra');
        await WorkLocations.citySelector.selectByVisibleText('Sillod');
        await WorkLocations.zipCodeInputField.setValue("100");
    
        while (!(await WorkLocations.workLocationTemplateSelector.isDisplayed())) {
            await expect(WorkLocations.nextButton).toBeClickable();
            await WorkLocations.nextButton.click();

            await browser.pause(500);
        }

        await WorkLocations.workLocationTemplateSelector.selectByVisibleText('Img');
        await browser.pause(1000);
        await expect(WorkLocations.nextButton).toBeDisplayedInViewport({message: "Application stops working"});
    });
});