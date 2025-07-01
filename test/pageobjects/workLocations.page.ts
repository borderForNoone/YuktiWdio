import Page from './page';

class WorkLocationsPage extends Page {
    public get textLable() {
        return $('div h3');
    }

    public get inputField() {
        return $('input[name*="text"]');
    }

    public get templateNameInputField() {
        return $('input[name="name"]');
    }

    public get statusSwitch() {
        return $('label[for="astatus"]');
    }

    public get workLocationGroupTable() {
        return $$("tbody.ant-table-tbody tr.ant-table-row");
    }

    public get workLocationGroupAction() {
        return $$("ul.ant-dropdown-menu.ant-dropdown-menu-root li");
    }

    public get createWorkLocationGroupButton() {
        return $("button.GreenButton");
    }

    public get groupNameInputField() {
        return $('input[name="name"]');
    }
    
    public get groupNameErrorMsg() {
        return $("//input[@name='Name']/following-sibling::span");
    }

    public get textLableBuildingBlock() {
        return $("li.formbuilder-icon-header");
    }

    public get buildingBlockTextLableInputFieldErrorMsg() {
        return $("//div[@name='label']/following-sibling::span");
    }

    public get firsEditBuildingBlockButton() {
        return $('a[title="Edit"]');
    }

    public get buildingBlockLableInputField() {
        return $('div[name="label"]');
    }

    public get buildingBlockLableInputFieldErrorMsg() {
        return $("//div[@name='label']/following-sibling::span");
    }

    public get buildingBlockdisplayDependentOnInputField() {
        return $('input[name="displayDependentOn"]');
    }

    public get buildingBlockdisplayDependentOnInputFieldErrorMsg() {
        return $("//input[@name='displayDependentOn']/following-sibling::span");
    }

    public get dataValidationInputField() {
        return $('input[name="dataValidation"]');
    }

    public get dataValidationInputFieldErrorMsg() {
        return $("//input[@name='dataValidation']/following-sibling::span");
    }

    public get textInputFieldBuildingBlock() {
        return $("li.formbuilder-icon-text");
    }

    public get placeholderInputFieldBuildingBlock() {
        return $('input[name="placeholder"]');
    }

    public get placeholderInputFieldBuildingBlockErrorMsg() {
        return $("//input[@name='placeholder']/following-sibling::span");
    }

    public get nameInputFieldBuildingBlock() {
        return $('.input-wrap input[name="name"]');
    }

    public get nameInputFieldBuildingBlockErrorMsg() {
        return $('//div[@class="input-wrap"]//input[@name="name"]/following-sibling::span');
    }

    public get valueInputFieldBuildingBlock() {
        return $('input[name="value"]');
    }

    public get valueInputFieldBuildingBlockErrorMsg() {
        return $('//input[@name="value"]/following-sibling::span');
    }

    public get displayDependentFieldBuildingBlock() {
        return $('input[name="displayDependentOn"]');
    }

    public get displayDependentFieldBuildingBlockErrorMsg() {
        return $('//input[@name="displayDependentOn"]/following-sibling::span');
    }

    public get requiredDependentOnFieldBuildingBlock() {
        return $('input[name="requiredDependentOn"]');
    }

    public get requiredDependentOnFieldBuildingBlockErrorMsg() {
        return $('//input[@name="requiredDependentOn"]/following-sibling::span');
    }

    public get minLengthFieldBuildingBlock() {
        return $('input[name="minLength"]');
    }

    public get minLengthFieldBuildingBlockErrorMsg() {
        return $('//input[@name="minLength"]/following-sibling::span');
    }

    public get maxLengthFieldBuildingBlock() {
        return $('input[name="maxLength"]');
    }

    public get maxLengthFieldBuildingBlockErrorMsg() {
        return $('//input[@name="maxLength"]/following-sibling::span');
    }

    public get checkboxGroupBlock() {
        return $("li.formbuilder-icon-checkbox-group");
    }

    public get requiredCheckboxGroupBlock() {
        return $('inpt[name="required"]');
    }

    public get radioGroupBlock() {
        return $("li.formbuilder-icon-radio-group");
    }

    public get firstOptionInputBlock() {
        return $('input[value="Option 1"]');
    }

    public get firstOptionInputBlockErrorMsg() {
        return $('//input[@value="Option 1"]/following-sibling::span');
    }

     public get secondOptionInputBlock() {
        return $('input[value="Option 2"]');
    }

    public get secondOptionInputBlockErrorMsg() {
        return $('//input[@value="Option 2"]/following-sibling::span');
    }
    
    public get imageBuildingBlock() {
        return $("li.formbuilder-icon-image");
    }

    public get aIMeterPhotoBlock() {
        return $('li[data-type="ai-meter-reading"]');
    }

    public get editAIReadingInputBlock() {
        return $('input[name="dataEditAIReadingAfterX"]');
    }

    public get editAIReadingInputBlockErrorMsg() {
        return $('//input[@name="dataEditAIReadingAfterX"]/following-sibling::span');
    }
    
    public get saveButton() {
        return $("button.lightBlueButton");
    }
    
    public get workLocationEditButtons() {
        return $$("span.ant-dropdown-trigger");
    }

    public get dropdownEditOption() {
        return $(".ant-dropdown-menu-title-content");
    }
    
    public get workLocations() {
        return $$("tr.ant-table-row");
    }
    
    public get searchPanel() {
        return $("#inputSearch");
    }
    
    public get createWorkLocationButton() {
        return $("button.GreenButton");
    }

    public get createWorkLocationTemplateButton() {
        return $("button.GreenButton");
    }

    public get contactNameInputField() {
        return $('input[name="contactName"]');
    }

    public get contactNameErrorMsg() {
        return $("//input[@name='contactName']/following-sibling::span");
    }

    public get phoneInputField() {
        return $('input[name="contactPhone"]');
    }

    public get phoneInputFieldErrorMsg() {
        return $("//input[@name='contactPhone']/following-sibling::span");
    }

    public get emailInputField() {
        return $('input[name="contactEmail"]');
    }

    public get emailInputFieldErrorMsg() {
        return $("//input[@name='contactEmail']/following-sibling::span");
    }

    public get zipInputField() {
        return $("//input[@name='zipCode']");
    }
    
    public get zipInputFieldErrorMsg() {
        return $("//input[@name='zipCode']/following-sibling::span");
    }

    public get addressInputFieldErrorMsg() {
        return $("//input[@name='address']/following-sibling::span");
    }

    public get locationIdentifierInputField() {
        return $('input[name="locationIdentifier"]');
    }

    public get locationIdentifierInputFieldErrorMsg() {
        return $("//input[@name='locationIdentifier']/following-sibling::span");
    }

    public get worklocationGroupSelector() {
        return $('select[name="workLocationGroupId"]');
    }

    public get nextButton() {
        return $('div.create-work-location button.GreenButton');
    }

     public get addressInputField() {
        return $('textarea[name="address"]');
    }

    public get countrySelector() {
        return $('select[name="countryId"]');
    }

    public get stateSelector() {
        return $('select[name="stateId"]');
    }

    public get citySelector() {
        return $('select[name="cityId"]');
    }

    public get zipCodeInputField() {
        return $('input[name="zipCode"]');
    }

    public get workLocationTemplateSelector() {
        return $('select[name="workLocationElements"]');
    }

    public get barcodeInputField() {
        return $('input[name*="barcode"]');
    }

    public get workLocationTemplatesEditIcons() {
        return $$('.edit-icon');
    }

    public get workLocationTemplatesDeleteIcons() {
        return $$('.delete-icon');
    }

    public get accessGroupSelector() {
        return $('div.selectMenu select.form-control');
    }

    public get cancelButton() {
        return $('.lightBlueButton');
    }

    public get editWorkLocationTemplateButtons() {
        return $$('.edit-icon');
    }

    public open() {
        return super.open('work-locations');
    }

    public openWorkLocationGroups() {
        return super.open('work-locations-groups');
    }

    public openWorkLocationTemplates() {
        return super.open('wl-templates');
    }
}

export default new WorkLocationsPage();