import Page from './page';

class WorkLocationsPage extends Page {
    public get textLableBuildingBlock() {
        return $("li.formbuilder-icon-header");
    }

    public get firsEditBuidingBlockButton() {
        return $('a[title="Edit"]');
    }

    public get buildingBlockLableInputField() {
        return $('div[name="label"]');
    }

    public get buildingBlockNameInputField() {
        return $('div[name="name"]');
    }
    public get buildingBlockLableInputFieldErrorMsg() {
        return $("//div[@name='label']/following-sibling::span");
    }
    public get buildingBlockNameInputFieldErrorMsg() {
        return $("//div[@name='name']/following-sibling::span");
    }
    public get textInputFieldBuildingBlock() {
        return $("li.formbuilder-icon-text");
    }

    public get imageBuildingBlock() {
        return $("li.formbuilder-icon-image");
    }
    
    public get saveButton() {
        return $("button.lightBlueButton");
    }
    
    public get workOrderEditButtons() {
        return $$("span.ant-dropdown-trigger");
    }

    public get dropdownEditOption() {
        return $$("span.ant-dropdown-menu-title-content")[0];
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
    public get zipInputFieldErrorMsg() {
        return $("//input[@name='zipCode']/following-sibling::span");
    }
    public get addressInputFieldErrorMsg() {
        return $("//input[@name='address']/following-sibling::span");
    }
    public get locationIdentifierInputField() {
        return $('input[name="locationIdentifier"]');
    }


    public get buildingBlockOptionLabelInputField() {
        return $('input[class="option-label option-attr"]');
    }
    public get buildingBlockOptionValueInputField() {
        return $('input[name="option-value option-attr"]');
    }
    public get buildingBlockOptionLabelErrorField() {
        return $("//input[@name='optionLabel']/following-sibling::span");
    }
    public get buildingBlockOptionValueErrorField() {
        return $("//input[@name='optionValue']/following-sibling::span");
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