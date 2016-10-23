"use strict";
/**
 * Class for working with user
 */
import UtilsBrowser from "./UtilsBrowser";
import UtilsScreen from "./UtilsScreen";
import UtilsSystem from "./UtilsSystem";

export default class User {
    /**
     * Get user info
     * @return {{browser: {browser: string, mobile: boolean, version: string}, screen: {availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}, system: {name: string, version: string}}}
     */
    public static getInfo(): {
        browser: {
            browser: string,
            mobile: boolean,
            version: string
        },
        screen: {
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
        },
        system: {
            name: string,
            version: string
        }
    } {
        return {
            browser: UtilsBrowser.getInfo(),
            screen: UtilsScreen.getInfo(),
            system: UtilsSystem.getInfo(),
        };
    }
}
