import Page from './page';

class WorkLocationsPage extends Page {
    public get createWorkLocationButton() {
        return $("button.GreenButton");
    }

    public get cotactNameInputField() {
        return $('input[name="contactName"]');
    }

    public get phoneInputField() {
        return $('input[name="contactPhone"]');
    }

    public get locationIdentifierInputField() {
        return $('input[name="locationIdentifier"]');
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

    public open() {
        return super.open('work-locations');
    }
}

export default new WorkLocationsPage();