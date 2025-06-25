import Page from './page';

class WorkLocationsGroupPage extends Page {

     public get searchPanel() {
        return $("#inputSearch");
    }
    public get saveButton() {
        return $("button.lightBlueButton");
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

    public open() {
        return super.open('work-locations-groups');
    }

}

export default new WorkLocationsGroupPage();