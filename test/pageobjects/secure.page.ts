import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get messageSuccess () {
        return $('.ant-message-success');
    }
}

export default new SecurePage();
