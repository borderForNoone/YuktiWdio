import Page from './page';

class WorkOrderTemplatePage extends Page {
    public get createWorkOrderTemplateButton() {
        return $("button.GreenButton");
    }

    public get templateNameInputField() {
        return $('input[name="workFlowTemplateName"]');
    }

    public get workOrderDescriptionInputField() {
        return $('textarea[placeholder="Enter the address of warehouse"]');
    }

    public get maxTimeInputField() {
        return $('input[name="maximumTime"]');
    }

    public get nextButton() {
        return $('button.GreenButton');
    }

    public get textLableBuildingBlock() {
        return $("li.formbuilder-icon-header");
    }

    public get textInputFieldBuildingBlock() {
        return $("li.formbuilder-icon-text");
    }

    public get imageBuildingBlock() {
        return $("li.formbuilder-icon-image");
    }

    public get activityNameInputField() {
        return $('input[name="activityTemplateName"]');
    }

    public get briefDescriptionInputField() {
        return $('textarea[placeholder="Enter brief description"]');
    }

    public get activityTypeSelector() {
        return $('select[name="activityTypeID"]');
    }

    public get publishButton() {
        return $("button.GreenButton");
    }

    public open() {
        return super.open('workflow-template');
    }
}

export default new WorkOrderTemplatePage();