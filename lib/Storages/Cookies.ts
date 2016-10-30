"use strict";
/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";

declare var require: any;
let Utils = require("Utils");

/**
 * The document cookies storage
 */
export default class Cookies implements IStorage {
    /**
     * The hash needs for splitting scopes storage
     */
    private hash: string;

    /**
     * The constructor should accept a hash to separate the scopes of storage
     * @param hash {string}
     */
    constructor(hash?: string) {
        this.hash = hash || location.hostname;
    }

    /**
     * The method returns the flag whether supported this storage type or not
     * @returns {boolean}
     */
    public isSupported(): boolean {
        return Utils.Cookie.isSupported();
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
    public setItem(checkSupport: boolean,
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
            if (!checkSupport || this.isSupported()) {
                /**
                 * The hash needs for splitting scopes storage
                 * @type {string}
                 */
                let localKey: string = this.hash + "_" + key;
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
                    localKey + "=" +
                    value +
                    ((exp) ? "; expires=" + exp : "") +
                    ((path) ? "; path=" + path : "") +
                    ((domain) ? "; domain=" + domain : "") +
                    ((secure) ? "; secure" : "")
                );
                /**
                 * If all ok return true
                 */
                return this.getItem(checkSupport, key) === value;
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
    public getItem(checkSupport: boolean, key: string): string|boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * The hash needs for splitting scopes storage
                 * @type {string}
                 */
                key = this.hash + "_" + key;
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
    public removeItem(checkSupport: boolean, key: string): boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * Set empty overdue value by key
                 */
                this.setItem(checkSupport, key, "", -1);
                /**
                 * If all ok return true
                 */
                return (this.getItem(checkSupport, key) === false);
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
    public getKeys(checkSupport: boolean): Array<string> {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
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
                     * If the key contains hash add it to the list
                     */
                    if (v[0].indexOf(this.hash) === 0) {
                        /**
                         * Add key to the list
                         */
                        arrKeys.push(v[0].substr(this.hash.length + 1));
                    }
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
    public clear(checkSupport: boolean): boolean {
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                let arrKeys = this.getKeys(checkSupport);
                if (arrKeys) {
                    for (let i of arrKeys) {
                        this.removeItem(checkSupport, i);
                    }
                }
                /**
                 * If all ok return true
                 */
                return (this.getKeys(checkSupport).length === 0);
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
