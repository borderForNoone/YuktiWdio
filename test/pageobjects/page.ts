/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
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

    public get navbatWarehouseLocationsButton() {
        return $('[href="/wh-locations"]');
    }

    public get headerTogglerButton() {
        return $("button.c-header-toggler");
    }
}
