"use strict";
/**
 * Import interfaces
 */
import IError from "../interfaces/IError";
import IWindow from "../interfaces/IWindow";
/**
 * Declare window interface
 */
declare var window: IWindow;
declare var Error: IError;

/**
 * Import subclasses
 */
import UtilsBrowser from "./UtilsBrowser";
import UtilsCookie from "./UtilsCookie";
import UtilsDocument from "./UtilsDocument";
import UtilsDOM from "./UtilsDOM";
import UtilsScreen from "./UtilsScreen";
import UtilsSystem from "./UtilsSystem";
import UtilsUser from "./UtilsUser";
import UtilsWindow from "./UtilsWindow";

import Logger from "./Logger";
/**
 * Global Utils class
 */
class Utils {
    public static Browser;
    public static Cookie;
    public static DOM;
    public static Document;
    public static Screen;
    public static System;
    public static User;
    public static Window;

    /**
     * @deprecated Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.
     */
    public static getBoundingClientRect(domNode: any, domDocument: Document = document, showForce: boolean = false): {
        bottom: number,
        height: number,
        left: number,
        right: number,
        top: number,
        width: number
    } {
        Logger.log(401, "Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");

        return Utils.DOM.getBoundingClientRect(domNode, domDocument, showForce);
    };

    /**
     * @deprecated Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.
     */
    public static findElementPosition(domNode: any, showForce: boolean = false) {
        Logger.log(401, "Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.");

        return Utils.DOM.findElementPosition(domNode, showForce);
    }

    /**
     * Transfer static methods into the object
     * @param realObject
     */
    public static implementationStaticMethods(realObject: Object): void {
        let staticClass = realObject.constructor;
        let methods = Object.keys(staticClass);
        if (methods.length > 0) {
            for (let method of methods) {
                if (typeof realObject[method] === "undefined") {
                    realObject[method] = (...args) => {
                        Logger.log(401, "That method was deprecated and soon will be removed. Please use " + staticClass.name + "." + method + " method.");

                        return staticClass[method](...args);
                    };
                }
            }
        }
    }

    /**
     * Get call stack trace
     * @return Array<Object>
     */
    public static stack(): Array<Object> {
        let e: IError = new Error();
        return (
                e &&
                e.stack &&
                e.stack.split("\n").slice(5).map(
                    (s) => {
                        let match;
                        if (!s) {
                            return {};
                        }
                        match = (/^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/ig).exec(s);
                        if (match) {
                            if (match[1]) {
                                match[1] = (/([^\/<]+)/ig).exec(match[1]);
                                if (match[1]) {
                                    match[1] = match[1][0];
                                }
                            }
                            return {
                                column: match[4] || "",
                                file: match[2] || "",
                                line: match[3] || "",
                                method: match[1] || "",
                            };
                        }
                        match = (/^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/ig).exec(s);
                        if (match) {
                            return {
                                column: match[5] || "",
                                file: match[3] || "",
                                line: match[4] || "",
                                method: (match[1] + ":" + match[2]) || "",
                            };
                        }
                        match = (/^(.*)@(.*):([0-9]+):([0-9]+)$/ig).exec(s);
                        if (match) {
                            return {
                                column: match[4] || "",
                                file: match[2] || "",
                                line: match[3] || "",
                                method: match[1] || "",
                            };

                        }
                        match = (/^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/ig).exec(s);
                        if (match) {
                            return {
                                column: match[4] || "",
                                file: match[2] || "",
                                line: match[3] || "",
                                method: match[1] || "",
                            };
                        }
                        match = (/^\s+at\s(.*):([0-9]+):([0-9]+)$/ig).exec(s);
                        if (match) {
                            return {
                                column: match[3] || "",
                                file: match[1] || "",
                                line: match[2] || "",
                                method: "",
                            };
                        }
                        return s;
                    }
                )
            ) ||
            [];
    }

    /**
     * Get random ID
     * @return {string}
     */
    public static getUID(): string {
        return Math.random().toString(36).substring(2);
    }
}
Utils.Browser = UtilsBrowser;
Utils.Cookie = UtilsCookie;
Utils.DOM = UtilsDOM;
Utils.Document = UtilsDocument;
Utils.Screen = UtilsScreen;
Utils.System = UtilsSystem;
Utils.User = UtilsUser;
Utils.Window = UtilsWindow;

window.Utils = Utils;

export default Utils;
