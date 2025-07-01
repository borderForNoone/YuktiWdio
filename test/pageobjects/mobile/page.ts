import type { ChainablePromiseArray } from 'webdriverio';
import type { ChainablePromiseElement } from 'webdriverio';

export default class Page {
    public async open(path: string) {
        await browser.url(`/${path}`);
    }

    public get homeFooterIcon() {
        return $("//android.widget.Button[contains(@content-desc, 'DASHBOARD')]");
    }

    public get workOrdersFooterIcon() {
        return $("//android.widget.Button[contains(@content-desc, 'WORK_ORDERS')]");
        
    }

    public get assetsFooterIcon() {
        return $("//android.widget.Button[contains(@content-desc, 'ASSETS')]");
    }

    public get backButton() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup');
    }

    public async clickElementByIndex(
        elements: ChainablePromiseArray,
        index: number
    ): Promise<void> {
        const resolvedElements = await elements;

        if (await resolvedElements.length === 0) {
            throw new Error('No elements found');
        }

        if (index < 0 || index >= await resolvedElements.length) {
            throw new Error(`Index ${index} is out of bounds (0 to ${await resolvedElements.length - 1})`);
        }

        await resolvedElements[index].waitForClickable({ timeout: 5000 });
        await resolvedElements[index].click();
    }

        public async waitUntilElementsMoreThan(
            elements: ChainablePromiseArray,
            count: number,
            timeout = 5000,
            interval = 250
        ): Promise<void> {
            const start = Date.now();

            while (Date.now() - start < timeout) {
                const resolved = await elements;
                if (await resolved.length > count) return;
                await browser.pause(interval);
            }

            throw new Error(`Timed out waiting for elements count > ${count}`);
        }

    public async scrollToElement(element: ChainablePromiseElement): Promise<void> {
        let isElementVisible = false;
        let scrollAttempts = 0;
        const maxScrollAttempts = 10;

        while (!isElementVisible && scrollAttempts < maxScrollAttempts) {
            try {
                if (await element.isDisplayed()) {
                    isElementVisible = true;
                    break;
                }
            } catch (err) {
                
            }

       
            await driver.touchPerform([
                { action: 'press', options: { x: 200, y: 800 }},
                { action: 'wait', options: { ms: 300 }},
                { action: 'moveTo', options: { x: 200, y: 300 }},
                { action: 'release' }
            ]);

            await browser.pause(500);
            scrollAttempts++;
        }

        if (!isElementVisible) {
            throw new Error('Element not visible after scrolling.');
        }
    }
}
