"use strict";
/**
 * Class for working with screen
 */
export default class Screen {

    /**
     * Get screen info
     * @return {{availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}}
     */
    public static getInfo(): {
        availableSize: {
            height: number,
            width: number
        },
        colorDepth: number,
        pixelRatio: number,
        size: {
            height: number,
            width: number
        }
    } {
        return {
            availableSize: Screen.getAvailableSizes(),
            colorDepth: Screen.getColorDepth(),
            pixelRatio: Screen.getPixelRatio(),
            size: Screen.getSizes(),
        };
    }

    /**
     * Get screen height
     * @returns {number}
     */
    public static getHeight(): number {
        return screen.height;
    }

    /**
     * Get screen width
     * @returns {number}
     */
    public static getWidth(): number {
        return screen.width;
    }

    /**
     * Get screen sizes
     * @return {{height: number, width: number}}
     */
    public static getSizes(): {
        height: number,
        width: number
    } {
        return ({
            height: Screen.getHeight(),
            width: Screen.getWidth(),
        });
    }

    /**
     * Get screen height
     * @returns {number}
     */
    public static getAvailableHeight(): number {
        return screen.availHeight;
    }

    /**
     * Get screen width
     * @returns {number}
     */
    public static getAvailableWidth(): number {
        return screen.availWidth;
    }

    /**
     * Get screen sizes
     * @return {{height: number, width: number}}
     */
    public static getAvailableSizes(): {
        height: number,
        width: number
    } {
        return ({
            height: Screen.getAvailableHeight(),
            width: Screen.getAvailableWidth(),
        });
    }

    /**
     * Get screen pixel ratio
     * @return {number}
     */
    public static getPixelRatio(): number {
        let ratio = 1;

        if (
            typeof window.screen.systemXDPI !== "undefined" &&
            typeof window.screen.logicalXDPI !== "undefined" &&
            window.screen.systemXDPI > window.screen.logicalXDPI
        ) {
            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
        } else if (typeof window.devicePixelRatio !== "undefined") {
            ratio = window.devicePixelRatio;
        }

        return ratio;
    }

    /**
     * Get screen color depth
     * @return {number}
     */
    public static getColorDepth(): number {
        return screen.colorDepth;
    }
}
