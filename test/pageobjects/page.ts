import type { ChainablePromiseArray } from 'webdriverio';

export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public async open(path: string) {
        await browser.url(`/${path}`);
    }

    /**
     * define selectors using getter methods
     */
    public get messageSuccess() {
        return $('.ant-message-success');
    }

    public get messageError() {
        return $("div.ant-message-error");
    }

    public get navbatWarehouseLocationsButton() {
        return $('[href="/wh-locations"]');
    }

    public get headerTogglerButton() {
        return $("button.c-header-toggler");
    }

    public get projectSelector() {
        return $("select.form-control");
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
}
