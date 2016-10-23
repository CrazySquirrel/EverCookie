"use strict";
/**
 * Class for working with cookie
 */
export default class Cookie {
    /**
     * The method returns the flag whether supported this storage type or not
     * @returns {boolean}
     */
    public static isSupported(): boolean {
        return (
            typeof document === "object" &&
            typeof document.cookie === "string"
        );
    }

    /**
     * The method sets the value and returns true if it has been set
     * @param checkSupport {boolean}
     * @param key {string}
     * @param value {string}
     * @param expires {number}
     * @param path {string}
     * @param domain {string}
     * @param secure {boolean}
     * @return {boolean}
     */
    public static setItem(checkSupport: boolean,
                          key: string,
                          value: string,
                          expires: number = 30,
                          path: string = "/",
                          domain: string = location.hostname,
                          secure: boolean = (location.protocol === "https:")): boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || Cookie.isSupported()) {
                /**
                 * Save cookies for 30 days
                 * @type {Date}
                 */
                let date: Date = new Date();
                date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
                let exp: string = date.toUTCString();
                /**
                 * Encode value for store
                 * @type {string}
                 */
                value = encodeURIComponent(value);
                /**
                 * Writing value to the document cookie storage
                 * @type {string}
                 */
                document.cookie = (
                    key + "=" +
                    value +
                    ((exp) ? "; expires=" + exp : "") +
                    ((path) ? "; path=" + path : "") +
                    ((domain) ? "; domain=" + domain : "") +
                    ((secure) ? "; secure" : "")
                );
                /**
                 * If all ok return true
                 */
                return Cookie.getItem(checkSupport, key) === value;
            } else {
                /**
                 * If cookie does not supported return false
                 */
                return false;
            }
        } catch (e) {
            /**
             * If something goes wrong return false
             */
            return false;
        }
    }

    /**
     * The method reads the value and returns it or returns false if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {string|boolean}
     */
    public static getItem(checkSupport: boolean, key: string): string|boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || Cookie.isSupported()) {
                /**
                 * Get the array from document cookie split by ;
                 * @type {string[]}
                 */
                let arrCookie: Array<string> = document.cookie.split(";");
                /**
                 * Iterate through the cookies
                 */
                for (let i of arrCookie) {
                    /**
                     * Trim and split each cookie by = for key value pare
                     * @type {string[]}
                     */
                    let v: Array<string> = i.trim().split("=", 2);
                    /**
                     * If it is correct cookie key return the value
                     */
                    if (v[0] === key) {
                        /**
                         * If the value was found return the value
                         */
                        return decodeURIComponent(v[1]);
                    }
                }
                /**
                 * If the value was not found return false
                 */
                return false;
            } else {
                /**
                 * If cookie does not supported return false
                 */
                return false;
            }
        } catch (e) {
            /**
             * If something goes wrong return false
             */
            return false;
        }
    }

    /**
     * The method removes the value and return true if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {boolean}
     */
    public static removeItem(checkSupport: boolean, key: string): boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || Cookie.isSupported()) {
                /**
                 * Set empty overdue value by key
                 */
                Cookie.setItem(checkSupport, key, "", -1);
                /**
                 * If all ok return true
                 */
                return (Cookie.getItem(checkSupport, key) === false);
            } else {
                /**
                 * If cookie does not supported return false
                 */
                return false;
            }
        } catch (e) {
            /**
             * If something goes wrong return false
             */
            return false;
        }
    }

    /**
     * The method returns the array of string of available keys
     * @param checkSupport {boolean}
     * @returns {string[]}
     */
    public static getKeys(checkSupport: boolean): Array<string> {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || Cookie.isSupported()) {
                /**
                 * The array of available keys
                 * @type {Array}
                 */
                let arrKeys: Array<string> = [];
                /**
                 * Get the array from document cookie split by ;
                 * @type {string[]}
                 */
                let arrCookie: Array<string> = document.cookie.split(";");
                /**
                 * Iterate through the cookies
                 */
                for (let i of arrCookie) {
                    /**
                     * Trim and split each cookie by = for key value pare
                     * @type {string[]}
                     */
                    let v: Array<string> = i.trim().split("=", 2);
                    /**
                     * Add key to the list
                     */
                    arrKeys.push(v[0]);
                }
                return arrKeys;
            } else {
                /**
                 * If cookie does not supported return false
                 */
                return [];
            }
        } catch (e) {
            /**
             * If something goes wrong return false
             */
            return [];
        }
    }

    /**
     * The method cleans the storage and return true if it is empty
     * @param checkSupport {boolean}
     * @returns {boolean}
     */
    public static clear(checkSupport: boolean): boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || Cookie.isSupported()) {
                let arrKeys = Cookie.getKeys(checkSupport);
                if (arrKeys) {
                    for (let i of arrKeys) {
                        Cookie.removeItem(checkSupport, i);
                    }
                }
                /**
                 * If all ok return true
                 */
                return (Cookie.getKeys(checkSupport).length === 0);
            } else {
                /**
                 * If cookie does not supported return false
                 */
                return true;
            }
        } catch (e) {
            /**
             * If something goes wrong return false
             */
            return false;
        }
    }
}
