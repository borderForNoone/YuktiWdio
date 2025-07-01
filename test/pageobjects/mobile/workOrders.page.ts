import Page from './page';

class WorkOrdersPage extends Page {
    public get workOrders() {
        return $$('//android.widget.ScrollView/android.view.ViewGroup/*');
    }

    public get openedSection() {
        return $('//android.widget.TextView[@text="Open"]');
    }
    
    public get completedSection() {
        return $('//android.widget.TextView[@text="Completed"]');
    }

    public get workOrderAssignedStatus() {
        return $('//android.widget.TextView[@text="Assigned"]');
    }

    public get startWorkOrderButton() {
        return $('//android.widget.TextView[@text="Start Workorder"]');
    }

    public get firstActivity() {
        return $$('//android.widget.TextView[@text="1 task"]')[0];
    }

    public get uploadPhotoInput() {
        return $('//android.widget.TextView[@text="Upload"]');
    }

    public get takePhotoButton() {
        return $('//android.widget.ImageView[@content-desc="Shutter"]');
    }

    public get confirmPhotoButton() {
        return $('//android.widget.ImageButton[@content-desc="Done"]');
    }


    public get meterStatusRunning() {
        return $('//android.widget.TextView[@text="Running"]');
    }

    public get optionRfAvailable() {
        return $('//android.widget.TextView[@text="Yes"]');
    }

    public get meterBoxStatus() {
        return $('//android.widget.TextView[@text="Installed with box"]');
    }

    public get meterReadingInputField() {
        return $("//android.widget.TextView[@text='Meter Reading (kWh)*']/following-sibling::android.widget.EditText");
    }

    public get nearbyMeterNumberInputField() {
        return $("//android.widget.TextView[@text='Nearby Meter No*']/following-sibling::android.widget.EditText");
    }

    public get nearbyMeterMakeInputField() {
        return $("//android.widget.TextView[@text='Nearby Meter Make*']/following-sibling::android.widget.EditText");
    }

    public get rfAvailableInNearbyMeter() {
        return $('//android.widget.TextView[@text="Is RF Available in nearby meter?*"]/following-sibling::android.view.ViewGroup[1]');
    }

    public get meterNumberCorrect() {
        return $('//android.widget.TextView[@text="Is Meter number correct?*"]/following-sibling::android.view.ViewGroup[1]');
    }

    public get smartMeterType() {
        return $('//android.widget.TextView[@text="Meter Type*"]/following-sibling::android.view.ViewGroup[1]');
    }

    public get meterSinglePhase() {
        return $('//android.widget.TextView[@text="Meter Phase*"]/following-sibling::android.view.ViewGroup[1]');
    }

    public get consumerNumberText() {
        return $('//android.widget.TextView[@text="Consumer Number"]');
    }



    public get secondActivity() {
        return $$('//android.widget.TextView[@text="1 task"]')[1];
    }

    public get nextButton() {
        return $('//android.widget.TextView[@text="Next"]');
    }

    public get submitWorkorderButton() {
        return $('//android.widget.TextView[@text="Submit Workorder"]');
    }

    public get doneButton() {
        return $('//android.widget.TextView[@text="Done"]');
    }


    public get templateSelector() {
        return $('//android.widget.HorizontalScrollView/following-sibling::android.view.ViewGroup[1]/*/*/*[2]');
    }

    public get scrollTemplatesElement() {
        return $('//android.widget.ScrollView');
    }

    public get templateTestElement() {
        return $('//android.widget.TextView[@text="Test"]');
    }

    public get templatePilotProjectElement() {
        return $('//android.widget.TextView[@text="Pilot Project Survey"]');
    }

    public get projectTab() {
        return $("//*[contains(@text, 'Project')]");
    }



    public async completeFirstAndSecondActivity(): Promise<void> {
        await this.firstActivity.waitForDisplayed({ timeout: 5000 });
        await this.firstActivity.click();

        await this.uploadPhotoInput.click();
    
        await $('//android.widget.FrameLayout[@resource-id="com.android.camera2:id/mode_options_overlay"]').waitForDisplayed({ timeout: 20000 });
        await browser.pause(3000);
        await this.takePhotoButton.click();

        await browser.pause(3000);
        await this.confirmPhotoButton.waitForDisplayed({ timeout: 20000 });
        await this.confirmPhotoButton.click();

        await this.meterStatusRunning.waitForDisplayed({ timeout: 20000 });
        await browser.pause(2000);
        await this.meterStatusRunning.scrollIntoView();
        await this.meterStatusRunning.click();

        await this.optionRfAvailable.scrollIntoView();
        await this.optionRfAvailable.click();

        await this.meterBoxStatus.scrollIntoView();
        await this.meterBoxStatus.click();

        await this.meterReadingInputField.scrollIntoView();
        await this.meterReadingInputField.setValue("Test");

        await this.nearbyMeterNumberInputField.scrollIntoView();
        await this.nearbyMeterNumberInputField.setValue("Test");

        await this.nearbyMeterMakeInputField.scrollIntoView();
        await this.nearbyMeterMakeInputField.setValue("Test");

        await this.rfAvailableInNearbyMeter.scrollIntoView();
        await this.rfAvailableInNearbyMeter.click();

        await this.meterNumberCorrect.scrollIntoView();
        await this.meterNumberCorrect.click();

        await this.smartMeterType.scrollIntoView();
        await this.smartMeterType.click();

        await this.meterSinglePhase.scrollIntoView();
        await this.meterSinglePhase.click();

        await this.nextButton.click();

        await this.consumerNumberText.waitForDisplayed({ timeout: 5000 });

        await this.nextButton.click();

        await this.submitWorkorderButton.click();
        await this.doneButton.click();
    }
}

export default new WorkOrdersPage();