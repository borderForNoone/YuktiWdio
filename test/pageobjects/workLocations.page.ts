import Page from './page';

class WorkLocationsPage extends Page {
    public get textLableBuildingBlock() {
        return $("li.formbuilder-icon-header");
    }

    public get buildingBlockTextLableInputFieldErrorMsg() {
        return $("//div[@name='label']/following-sibling::span");
    }

    public get firsEditBuidingBlockButton() {
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

    public get imageBuildingBlock() {
        return $("li.formbuilder-icon-image");
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

    public get accessGroupSelector() {
        return $('div.selectMenu select.form-control');
    }

    public get cancelButton() {
        return $('.lightBlueButton');
    }

    public open() {
        return super.open('work-locations');
    }

    public openWorkLocationTemplates() {
        return super.open('wl-templates');
    }
}

export default new WorkLocationsPage();