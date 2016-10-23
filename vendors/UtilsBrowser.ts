"use strict";
/**
 * Class for working with browser
 */
export default class Browser {
    /**
     * Get browser info
     * @return {{browser: string, mobile: boolean, version: string}}
     */
    public static getInfo(): {
        browser: string,
        mobile: boolean,
        version: string
    } {
        return {
            browser: Browser.getName(),
            mobile: Browser.isMobile(),
            version: Browser.getVersion(),
        };
    }

    /**
     * Get browser name
     * @return {string}
     */
    public static getName(): string {
        let browser;
        if (Browser.isOpera()) {
            browser = "Opera";
        } else if (Browser.isOperaNew()) {
            browser = "Opera";
        } else if (Browser.isMSIE()) {
            browser = "Microsoft Internet Explorer";
        } else if (Browser.isMSIENew()) {
            browser = "Microsoft Internet Explorer";
        } else if (Browser.isChrome()) {
            browser = "Chrome";
        } else if (Browser.isFirefox()) {
            browser = "Firefox";
        } else if (Browser.isSafari()) {
            browser = "Safari";
        } else if (Browser.isOther()) {
            browser = Browser.getOtherName();
        }
        return browser;
    }

    /**
     * Get browser version
     * @return {string}
     */
    public static getVersion(): string {
        let version;
        if (Browser.isOpera()) {
            version = Browser.getOperaVersion();
        } else if (Browser.isOperaNew()) {
            version = Browser.getOperaNewVersion();
        } else if (Browser.isMSIE()) {
            version = Browser.getMSIEVersion();
        } else if (Browser.isMSIENew()) {
            version = Browser.getMSIENewVersion();
        } else if (Browser.isChrome()) {
            version = Browser.getChromeVersion();
        } else if (Browser.isFirefox()) {
            version = Browser.getFirefoxVersion();
        } else if (Browser.isSafari()) {
            version = Browser.getSafariVersion();
        } else if (Browser.isOther()) {
            version = Browser.getOtherVersion();
        }
        return version;
    }

    /**
     * Trim browser version
     * @param version
     * @return {string}
     */
    public static trimVersion(version): string {
        let chars = [";", " ", ")"];
        for (let char of chars) {
            let ix = version.indexOf(char);
            if (ix !== -1) {
                version = version.substring(0, ix);
            }
        }
        return version;
    }

    /**
     * Check if it is mobile
     * @return {boolean}
     */
    public static isMobile(): boolean {
        return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion);
    }

    /**
     * Check if it is opera browser
     * @return {boolean}
     */
    public static isOpera(): boolean {
        return navigator.userAgent.indexOf("Opera") !== -1;
    }

    /**
     * Get opera browser version
     * @return {string}
     */
    public static getOperaVersion(): string {
        let verOffset = navigator.userAgent.indexOf("Opera");
        let version = navigator.userAgent.substring(verOffset + 6);
        verOffset = navigator.userAgent.indexOf("Version");
        if (verOffset !== -1) {
            version = navigator.userAgent.substring(verOffset + 8);
        }
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is opera new browser
     * @return {boolean}
     */
    public static isOperaNew(): boolean {
        return navigator.userAgent.indexOf("OPR") !== -1;
    }

    /**
     * Get opera new browser version
     * @return {string}
     */
    public static getOperaNewVersion(): string {
        let verOffset = navigator.userAgent.indexOf("OPR");
        let version = navigator.userAgent.substring(verOffset + 4);
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is msie browser
     * @return {boolean}
     */
    public static isMSIE(): boolean {
        return navigator.userAgent.indexOf("MSIE") !== -1;
    }

    /**
     * Get msie browser version
     * @return {string}
     */
    public static getMSIEVersion(): string {
        let verOffset = navigator.userAgent.indexOf("MSIE");
        let version = navigator.userAgent.substring(verOffset + 5);
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is msie new browser
     * @return {boolean}
     */
    public static isMSIENew(): boolean {
        return navigator.userAgent.indexOf("Trident/") !== -1;
    }

    /**
     * Get msie new browser version
     * @return {string}
     */
    public static getMSIENewVersion(): string {
        let version = navigator.userAgent.substring(navigator.userAgent.indexOf("rv:") + 3);
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is chrome browser
     * @return {boolean}
     */
    public static isChrome(): boolean {
        return navigator.userAgent.indexOf("Chrome") !== -1;
    }

    /**
     * Get chrome browser version
     * @return {string}
     */
    public static getChromeVersion(): string {
        let verOffset = navigator.userAgent.indexOf("Chrome");
        let version = navigator.userAgent.substring(verOffset + 7);
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is safari browser
     * @return {boolean}
     */
    public static isSafari(): boolean {
        return navigator.userAgent.indexOf("Safari") !== -1;
    }

    /**
     * Get safari browser version
     * @return {string}
     */
    public static getSafariVersion(): string {
        let verOffset = navigator.userAgent.indexOf("Safari");
        let version = navigator.userAgent.substring(verOffset + 7);
        verOffset = navigator.userAgent.indexOf("Version");
        if (verOffset !== -1) {
            version = navigator.userAgent.substring(verOffset + 8);
        }
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is firefox browser
     * @return {boolean}
     */
    public static isFirefox(): boolean {
        return navigator.userAgent.indexOf("Firefox") !== -1;
    }

    /**
     * Get firefox browser version
     * @return {string}
     */
    public static getFirefoxVersion(): string {
        let verOffset = navigator.userAgent.indexOf("Firefox");
        let version = navigator.userAgent.substring(verOffset + 8);
        return Browser.trimVersion(version);
    }

    /**
     * Check if it is other browser
     * @return {boolean}
     */
    public static isOther(): boolean {
        let nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
        let verOffset = navigator.userAgent.lastIndexOf("/");
        return nameOffset < verOffset;
    }

    /**
     * Get other browser name
     * @return {string}
     */
    public static getOtherName(): string {
        let nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
        let verOffset = navigator.userAgent.lastIndexOf("/");
        let browser = navigator.userAgent.substring(nameOffset, verOffset);
        if (browser.toLowerCase() === browser.toUpperCase()) {
            browser = navigator.appName;
        }
        return browser;
    }

    /**
     * Get other browser version
     * @return {string}
     */
    public static getOtherVersion(): string {
        let nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
        let verOffset = navigator.userAgent.lastIndexOf("/");
        let version = navigator.userAgent.substring(verOffset + 1);
        return Browser.trimVersion(version);
    }

    /**
     * Check browser support
     * @return {boolean}
     */
    public static isSupported() {
        return (
            !Browser.isMSIE() ||
            parseInt(Browser.getMSIEVersion(), 10) > 8
        );
    }

    /**
     * Check if it is WebKit browser
     * @return {boolean}
     */
    public static isWebKit(): boolean {
        return navigator.userAgent.indexOf("AppleWebKit/") !== -1;
    }

    /**
     * Check if it is Gecko browser
     * @return {boolean}
     */
    public static isGecko(): boolean {
        return navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") === -1;
    }

    /**
     * Check if it is Android browser
     * @return {boolean}
     */
    public static isAndroid(): boolean {
        return navigator.userAgent.indexOf("Android") > -1;
    }

    /**
     * Check if it is Linux browser
     * @return {boolean}
     */
    public static isLinux(): boolean {
        return navigator.userAgent.indexOf("Linux") > -1;
    }

    /**
     * Check if it is iPad browser
     * @return {boolean}
     */
    public static isTabletPC(): boolean {
        return navigator.userAgent.indexOf("iPad") > -1;
    }
}
