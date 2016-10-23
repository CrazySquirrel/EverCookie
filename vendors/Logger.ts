"use strict";
/**
 * Import interfaces
 */
import IWindow from "../Interfaces/IWindow";
/**
 * Declare window interface
 */
declare var window: IWindow;
declare var require: any;
declare var process: any;

const MD5 = require("crypto-js/md5");

/**
 * Import Animation frame
 */
import AnimationFrame from "./AnimationFrame";

import Utils from "./Utils";

const STATUSES: any = {
    600: "Some uncaught error",

    503: "Attempt reattach the scripts to the non-object",
    502: "Block doesn't exist",
    501: "Banner place doesn't exist",
    500: "Some caught error",

    401: "Deprecated call",
    400: "Some warning",

    300: "Some info",

    200: "Some log",

    101: "Entry point",
    100: "Some debug",

    0: "Something",
};

class Logger {
    public static eventListenerAdded: boolean = false;

    public static arrLog: Array<any> = [];
    public static arrSended: Array<any> = [];

    public static projectName: string = "#PACKAGE_NAME#";
    public static projectVersion: string = "#PACKAGE_VERSION#";

    /**
     * Log method
     * @param status
     * @param message
     * @param properties
     */
    public static log(status?: number,
                      message?: string,
                      properties?: any): void {
        status = status || 101;
        message = message || STATUSES[status] || "";
        properties = properties || {};

        if (status >= 400) {
            let logObj = {
                date: new Date(),
                location: location.href,
                projectName: Logger.projectName,
                projectVersion: Logger.projectVersion,
                stack: Utils.stack(),
                user: Utils.User.getInfo(),
                message,
                properties,
                status,
            };

            Logger.arrLog.push(logObj);
        }
    }

    public static showMessange(status: number = 0, message: string = ""): void {
        let messangeLavel = "debug";
        if (status >= 200 && status < 300) {
            messangeLavel = "log";
        } else if (status >= 300 && status < 400) {
            messangeLavel = "info";
        } else if (status >= 400 && status < 500) {
            messangeLavel = "warn";
        } else if (status >= 500) {
            messangeLavel = "error";
        }
        if (
            typeof window.Debug === "object" &&
            typeof window.Debug.console === "object" &&
            typeof window.Debug.console[messangeLavel] === "function"
        ) {
            window.Debug.console[messangeLavel](message);
        } else if (
            typeof console === "object" &&
            typeof console[messangeLavel] === "function"
        ) {
            console[messangeLavel](message);
        }
    }

    /**
     * Log send watcher
     */
    public static watch() {
        if (Logger.arrLog.length > 0 && Logger.arrLog.length < 100) {
            for (let l of Logger.arrLog) {
                let data = encodeURIComponent(JSON.stringify(l));
                let uid = MD5(JSON.stringify({
                    message: l.message,
                    projectName: l.projectName,
                    projectVersion: l.projectVersion,
                    status: l.status,
                })).toString();
                if (Logger.arrSended.indexOf(uid) === -1) {
                    Logger.arrSended.push(uid);
                    if (process.env.NODE_ENV === "production") {
                        let i = new Image();
                        /**
                         * TODO: Use your logger url
                         */
                        //i.src = "<Your logger url>?uid=" + uid + "&data=" + data;
                    } else {
                        Logger.showMessange(l.status, l);
                    }
                }
            }
            Logger.arrLog = [];
        }
    }
}
/**
 * Add logger to global error event
 */
if (!window.eventListenerAdded) {
    let errorHandler = window.onerror;

    window.onerror = (errorMsg, url, lineNumber, column, errorObj) => {
        if (typeof errorHandler === "function") {
            errorHandler(errorMsg, url, lineNumber, column, errorObj);
        }
        Logger.log(
            600,
            errorMsg,
            {
                column,
                errorObj,
                lineNumber,
                url,
            }
        );
    };

    window.eventListenerAdded = true;
}
/**
 * Subscribe logger to watcher
 */
AnimationFrame.subscribe({}, Logger.watch, []);
/**
 * Return logger
 */
export default Logger;
