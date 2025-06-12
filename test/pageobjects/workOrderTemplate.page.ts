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
        return $('div.create-work-location button.GreenButton');
    }

    public open() {
        return super.open('workflow-template');
    }
}

export default new WorkOrderTemplatePage();