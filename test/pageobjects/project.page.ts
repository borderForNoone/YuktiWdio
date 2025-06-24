import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProjectPage extends Page {
    public get projects() {
        return $$(".ant-table-row");
    }
    
    public get projectEditButtons() {
        return $$("span.ant-dropdown-trigger");
    }

    public get dropdownEditOption() {
        return $$("span.ant-dropdown-menu-title-content")[0];
    }

    public get createProjectButton() {
        return $('button.GreenButton');
    }

    public get projectNameInputField() {
        return $('input[name="projectName"]');
    }

    public get totalWorkordersInputField() {
        return $('input[name="workOrdersCount"]');
    }

    public get startDate() {
        return $('input[name="startDate"]');
    }

    public get createButton() {
        return $('button.GreenButton');
    }

    public open () {
        return super.open('projects');
    }
}

export default new ProjectPage();
