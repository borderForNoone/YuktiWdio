import Page from './page';

class AccessGroupsPage extends Page {
    public get createNewAccessGroupButton() {
        return $("button.GreenButton");
    }

    public get accessGroupNameInputField() {
        return $('input[name="name"]');
    }

    public get displayCodeInputField() {
        return $('input[name="displayCode"]');
    }

    public get submitButton() {
        return $('button.submit-btn');
    }

    public get itemsPerPageInput() {
        return $('span.ant-select-selection-item');
    }

    public get itemsPerPageDropdownOptions() {
        return $$('div.ant-select-item-option-content');
    }

    public get accessGroups() {
        return $$('tr.ant-table-row');
    }

    public get accessGroupEditButtons() {
        return $$('span.ant-dropdown-trigger');
    }

    public get dropdownEditOption() {
        return $$("span.ant-dropdown-menu-title-content")[0];
    }

    public get editWindow() {
        return $("div.modal-content");
    }

    public open() {
        return super.open('access-groups');
    }
}

export default new AccessGroupsPage();