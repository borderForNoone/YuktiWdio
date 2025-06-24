import Page from './page';

class AssetsManagementPage extends Page {
    public get createNewAssetButton() {
        return $("button.GreenButton");
    }

    public get serialNumberInputField() {
        return $('input[name="serialNumber"]');
    }

    public get assetLevelSelector() {
        return $('select[name="assetLevelId"]');
    }

    public get assetNameInputField() {
        return $('input[name="assetName"]');
    }

    public get assetTypeSelector() {
        return $('select[name="assetTypeId"]');
    }

    public get providedBySelector() {
        return $('select[name="manufacturerId"]');
    }

    public get servicedBySelector() {
        return $('select[name="supplierId"]');
    }

    public get warehouseSelector() {
        return $('select[name="wareHouseLocationId"]');
    }

    public get nextButton() {
        return $('button.GreenButton');
    }

    public get createButton() {
        return $('button.GreenButton');
    }

    public get searchInputField() {
        return $('#inputSearch');
    }

    public get assets() {
        return $$('tr.ant-table-row');
    } 

    public get suppliers() {
        return $$('tr.ant-table-row');
    } 

    public get supplierNameInputField() {
        return $('input[name="supplierName"]');
    }

    public get supplierAddressInputField() {
        return $('textarea[name="supplierAddress"]');
    }

    public get statusSwitch() {
        return $('label[for="astatus"]');
    }

    public open() {
        return super.open('asset');
    }

    public openAssetTypes() {
        return super.open('assetType');
    }

    public openSuppliers() {
        return super.open('supplier');
    }
}

export default new AssetsManagementPage();