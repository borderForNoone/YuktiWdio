import Page from './page';

class UsersManagementPage extends Page {
    public get createNewCrewButton() {
        return $('button.GreenButton');
    }

    public get nameInputField() {
        return $('input[name="name"]');
    }

    public get vendorSelector() {
        return $('select[name="vendorId"]');
    }

    public get crewSupervisorInputField() {
        return $('input[placeholder="Search Supervisor"]');
    }

    public get crewSupervisorError() {
        return $('span.error input[placeholder="Search Supervisor"]');
    }

    public get firstSupervisor() {
        return $$('div.ant-select-item-option-content div')[0];
    }

    public get itemOptions() {
        return $$('div.ant-select-item-option-content div');
    }

    public get crewInputField() {
        return $('input[placeholder="Search crew to add"]');
    }

    public get crewError() {
        return $('span.error input[placeholder="Search crew to add"]');
    }

    public get statusSwitch() {
        return $('label[for="astatus"]');
    }

    public get addNewMobileUser() {
        return $('button.GreenButton');
    }

    public get vendorInputField() {
        return $('input[aria-autocomplete="list"]');
    }

    public open () {
        return super.open('user-management/crew');
    }

    public openMobileUsersPage () {
        return super.open('user-management/mobile-user');
    }
}

export default new UsersManagementPage();