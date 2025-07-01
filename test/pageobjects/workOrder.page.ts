import Page from './page';
import LoginPage from './login.page';

class WorkOrderPage extends Page {
    public get workOrders() {
        return $$("tr.ant-table-row");
    }

    public get workOrderEditButtons() {
        return $$("span.ant-dropdown-trigger");
    }

    public get dropdownEditOption() {
        return $$("span.ant-dropdown-menu-title-content")[0];
    }
    
    public get createNewOrderButton() {
        return $("button.GreenButton");
    }

    public get workOrdetTemplates() {
        return $$("div.location-template-card");
    }

    public get nextButton() {
        return $("button.GreenButton");
    }

    public get publishButton() {
        return $("button.GreenButton");
    }

    public get workOrderNameInputField() {
        return $('input[name="workorderName"]');
    }

    public get projectNameSelector() {
        return $('select[name="projectId"]');
    }

    public get assignWorkLocationInputField() {
        return $('input[placeholder="Search Work location to add"]');
    }

    public get workLocationFirstDropdownOption() {
        return $$('.ant-select-item-option-content div')[0];
    }

    public get vendorInputField() {
        return $('#react-select-2-input');
    }

    public get crewInputField() {
        return $('#react-select-3-input');
    }

    public get lastCrewDropdowmOption() {
        return $$('//div[@id="react-select-3-listbox"]/*')[2];
    }

    public get warehouseSelector() {
        return $('select[name="warehouseId"]');
    }

    public get assignedCrewCard() {
        return $('div.crewCard');
    }

    public get removeAsignedCrewButton() {
        return $('div.crewCard img[alt="cross"]');
    }

    public get saveEditedButton() {
        return $('button.lightBlueButton');
    }

    public get returnToWorkOrdersListButton() {
        return $('li.breadcrumb-item a');
    }

    public get assetInputField() {
        return $('input[placeholder="Search Assets"]');
    }

    public get assetOptions() {
        return $$('div.ant-select-item-option-content');
    }

    public get firstAssetOption() {
        return $$('div.ant-select-item-option-content')[0];
    }

    public get selectedAssetCard() {
        return $('div.innerCard');
    }

    public get swimlaneVendorsInputField() {
        return $('input[id*="react-select"]');
    }

    public get swimlaneCrews() {
        return $$('label.ant-checkbox-wrapper');
    } 

    public open() {
        return super.open('work-order/list-view');
    }

    public openSwimlane() {
        return super.open('work-order/swim-lane');
    }

    public async assignWorkOrderToTheCrew(templateIndex: number): Promise<void> {
        const { remote } = await import('webdriverio');

        const webBrowser = await remote({
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
                }
            }
        });

        await webBrowser.setWindowSize(1920, 1080);
        await webBrowser.url(`${process.env.BASE_URL}/work-order/list-view`);

        const userInput = webBrowser.$('input[name="userName"]');
        const passwordInput = webBrowser.$('input[name="password"]');
        const loginButton = webBrowser.$('.btn-signIn');

        await userInput.setValue(`${process.env.EMAIL}`);
        await passwordInput.setValue(`${process.env.PASSWORD}`);
        await loginButton.click();

        await webBrowser.waitUntil(async () => {
            return !(await userInput.isDisplayed());
        }, {
            timeout: 10000,
            timeoutMsg: 'Login form did not disappear',
        });

        await webBrowser.url(`${process.env.BASE_URL}/work-order/list-view/create`);

        const workOrdetTemplates = webBrowser.$$('div.location-template-card');
        const nextButton = webBrowser.$('button.GreenButton');
        const workOrderName = webBrowser.$('input[name="workorderName"]');
        const projectNameSelector = webBrowser.$('select[name="projectId"]');
        const assignWorkLocationInputField = webBrowser.$('input[placeholder="Search Work location to add"]');
        const workLocationFirstDropdownOption = webBrowser.$$('.ant-select-item-option-content div')[0];
        const warehouseSelector = webBrowser.$('select[name="warehouseId"]');
        const vendorInputField = webBrowser.$('#react-select-2-input');
        const crewInputField = webBrowser.$('#react-select-3-input');
        const lastCrewDropdownOption = webBrowser.$$('//div[@id="react-select-3-listbox"]//*')[2];
        const publishButton = webBrowser.$("button.GreenButton");
        const successMsg = webBrowser.$('.ant-message-success');
        
        await browser.pause(1000);

        await workOrdetTemplates[templateIndex].click();
        await nextButton.click();
        await workOrderName.setValue("Test1234");
        await projectNameSelector.selectByVisibleText('test');
        await assignWorkLocationInputField.setValue('yu30');
        await workLocationFirstDropdownOption.click();
        await warehouseSelector.selectByVisibleText('Silchar Store');
        await vendorInputField.click();
        await vendorInputField.setValue('Anvil Cables');
        await vendorInputField.click();
        await webBrowser.keys('Enter');

        await crewInputField.setValue('demo123');
        await crewInputField.click();
        await webBrowser.keys('Enter');

        await publishButton.click();

        await expect(successMsg).toBeDisplayed();
        await webBrowser.deleteSession();
    }
}

export default new WorkOrderPage();