import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WarehouseLocationsPage extends Page {
    public get createWarehouseButton() {
        return $('button.GreenButton');
    }

    public get warehouseNameInputField() {
        return $('input[name="name"]');
    }

    public get areaInputField() {
        return $('input[name="area"]');
    }

    public get statusSwitch() {
        return $('label[for="astatus"]');
    }

    public get nextButton() {
        return $('button.GreenButton');
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

    public get listElements() {
        return $$('li.ant-pagination-item');
    }

    public get warehouseLocations() {
        return $$("tr.ant-table-row");
    }

    public open() {
        return super.open('wh-locations');
    }
}

export default new WarehouseLocationsPage();
