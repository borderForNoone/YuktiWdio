import Page from './page';

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
        return $('select[name="projectId"]');
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

    public open() {
        return super.open('work-order/list-view');
    }
}

export default new WorkOrderPage();