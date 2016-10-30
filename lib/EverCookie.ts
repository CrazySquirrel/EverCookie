"use strict";
/**
 * + Standard HTTP Cookies
 * - DO: Flash Local Shared Objects
 * - DO: Silverlight Isolated Storage
 * - DO: CSS History Knocking
 * - DO: Storing cookies in HTTP ETags (Backend server required)
 * - DO: Storing cookies in Web cache (Backend server required)
 * - DO: HTTP Strict Transport Security (HSTS) Pinning
 * - DO: window.name caching
 * + Internet Explorer userData storage
 * + HTML5 Session Storage
 * + HTML5 Local Storage
 * + HTML5 Global Storage
 * - DO: HTML5 Database Storage via SQLite
 * - DO: HTML5 Canvas - Cookie values stored in RGB data of auto-generated,
 *         force-cached PNG images (Backend server required)
 * - DO: HTML5 IndexedDB
 * - DO: Java JNLP PersistenceService
 * - DO: Java exploit CVE-2013-0422 - Attempts to escape the applet sandbox
 *         and write cookie data directly to the user"s hard drive.
 */
/**
 * Import interfaces
 */
import IStorage from "../interfaces/IStorage";

declare var module: any;
/**
 * Import Animation frame
 */
declare var require: any;
let AnimationFrame = require("AnimationFrame");
/**
 * Import storages
 */
import Cookies from "./Storages/Cookies";
import DOMStorage from "./Storages/DOMStorage";
import GlobalStorage from "./Storages/GlobalStorage";
import LocalStorage from "./Storages/LocalStorage";
import SessionStorage from "./Storages/SessionStorage";
/**
 * EverCookie storage
 */
export default class EverCookie implements IStorage {
    /**
     * The hash needs for splitting scopes storage
     */
    private hash: string;
    /**
     * Different types of stores
     */
    private stores: Array<any>;
    /**
     * Self refresh flag
     */
    private stopRefresh: boolean;
    /**
     * Refresh animation frame ID
     */
    private refreshID: any;

    /**
     * The constructor should accept a hash to separate the scopes of storage
     * @param hash {string}
     */
    constructor(hash?: string) {
        /**
         * Generate hash
         * @type {string}
         */
        this.hash = hash || location.hostname;
        /**
         * Initialise stores
         * @type {Array}
         */
        this.stores = [];
        if (typeof Cookies !== "undefined") {
            this.stores.push(new Cookies(this.hash));
        }
        if (typeof GlobalStorage !== "undefined") {
            this.stores.push(new GlobalStorage(this.hash));
        }
        if (typeof LocalStorage !== "undefined") {
            this.stores.push(new LocalStorage(this.hash));
        }
        if (typeof SessionStorage !== "undefined") {
            this.stores.push(new SessionStorage(this.hash));
        }
        if (typeof DOMStorage !== "undefined") {
            this.stores.push(new DOMStorage(this.hash));
        }
        for (let i = 0; i < this.stores.length; i++) {
            if (!this.stores[i].isSupported()) {
                this.stores.splice(i, 1);
            }
        }
        /**
         * Set self refresh flag
         * @type {boolean}
         */
        this.stopRefresh = false;
        /**
         * Self refresh
         */
        if (this.isSupported()) {
            this.refreshID = AnimationFrame.subscribe(this, this.refresh, []);
        }
    }

    /**
     * The method returns the flag whether supported this storage type or not
     * @returns {boolean}
     */
    public isSupported() {
        return (this.stores && this.stores.length > 0);
    }

    /**
     * The method sets the value and returns true if it has been set
     * @param checkSupport {boolean}
     * @param key {string}
     * @param value {string}
     * @returns {boolean}
     */
    public setItem(checkSupport: boolean, key: string, value: string) {
        /**
         * Set result flag as true
         * @type {boolean}
         */
        let booResult: boolean = true;
        /**
         * Stop self refresh process
         * @type {boolean}
         */
        this.stopRefresh = true;
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * Initialise store result array
                 * @type {Array}
                 */
                let arResults: Array<boolean> = [];
                /**
                 * Iterate through all supported stores
                 */
                for (let store of this.stores) {
                    /**
                     * Write store operation result to result array
                     */
                    arResults.push(store.setItem(false, key, value));
                }
                /**
                 * If there exist result and one of them is true, it is means, that value was set
                 * @type {boolean}
                 */
                booResult = (arResults.length > 0 && arResults.indexOf(true) !== -1);
            } else {
                /**
                 * If stores does not supported, value can be set
                 * @type {boolean}
                 */
                booResult = false;
            }
        } catch (e) {
            /**
             * If something goes wrong, value can be set
             * @type {boolean}
             */
            booResult = false;
        }
        /**
         * Start self refresh process
         * @type {boolean}
         */
        this.stopRefresh = false;
        /**
         * Return set item status
         */
        return booResult;
    }

    /**
     * The method reads the value and returns it or returns false if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {string|boolean}
     */
    public getItem(checkSupport: boolean, key: string) {
        /**
         * Set result flag as true
         * @type {boolean|string}
         */
        let booResult: boolean|string = false;
        /**
         * Stop self refresh process
         * @type {boolean}
         */
        this.stopRefresh = true;
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * Initialise temporary store result array
                 * @type {string[]}
                 */
                let localArrResults: Array<string> = [];
                /**
                 * Iterate through all supported stores
                 */
                for (let store of this.stores) {
                    let value = store.getItem(false, key);
                    /**
                     * If store has this value
                     */
                    if (value) {
                        /**
                         * Write store operation result to result array
                         */
                        localArrResults.push(value);
                    }
                }
                /**
                 * Initialise store result array
                 * @type {Object}
                 */
                let arResults: Object = {};
                let numMax = 0;
                /**
                 * Looking for the most frequently mentioned result
                 */
                for (let i of localArrResults) {
                    if (!arResults[i]) {
                        arResults[i] = 0;
                    }
                    arResults[i]++;
                    if (arResults[i] > numMax) {
                        numMax = arResults[i];
                        booResult = i;
                    }
                }
            } else {
                /**
                 * If stores does not supported, value can be set
                 * @type {boolean}
                 */
                booResult = false;
            }
        } catch (e) {
            /**
             * If something goes wrong, value can be set
             * @type {boolean}
             */
            booResult = false;
        }
        /**
         * Start self refresh process
         * @type {boolean}
         */
        this.stopRefresh = false;
        /**
         * Return set item status
         */
        return booResult;
    }

    /**
     * The method removes the value and return true if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {boolean}
     */
    public removeItem(checkSupport: boolean, key: string) {
        /**
         * Set result flag as true
         * @type {boolean}
         */
        let booResult: boolean = true;
        /**
         * Stop self refresh process
         * @type {boolean}
         */
        this.stopRefresh = true;
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * Initialise store result counter
                 * @type {number}
                 */
                let arResult: number = 0;
                /**
                 * Iterate through all supported stores
                 */
                for (let store of this.stores) {
                    /**
                     * If store supported (Not required, the stores is checked during initialization)
                     */
                    arResult += 1 * store.removeItem(false, key);
                }
                /**
                 * If removed count equal to stores count
                 * @type {boolean}
                 */
                booResult = (arResult === this.stores.length);
            } else {
                /**
                 * If stores does not supported, value can be set
                 * @type {boolean}
                 */
                booResult = false;
            }
        } catch (e) {
            /**
             * If something goes wrong, value can be set
             * @type {boolean}
             */
            booResult = false;
        }
        /**
         * Start self refresh process
         * @type {boolean}
         */
        this.stopRefresh = false;
        /**
         * Return set item status
         */
        return booResult;
    }

    /**
     * The method returns the array of string of available keys
     * @param checkSupport {boolean}
     * @returns {string[]}
     */
    public getKeys(checkSupport: boolean) {
        /**
         * Set result flag as true
         * @type {Object}
         */
        let booResult: Object = {};
        /**
         * Stop self refresh process
         * @type {boolean}
         */
        this.stopRefresh = true;
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * Iterate through all supported stores
                 */
                for (let store of this.stores) {
                    let value: Array<string> = store.getKeys(false);
                    if (value.length > 0) {
                        for (let i of value) {
                            booResult[i] = true;
                        }
                    }
                }
            } else {
                /**
                 * If stores does not supported, value can be set
                 * @type {Object}
                 */
                booResult = {};
            }
        } catch (e) {
            /**
             * If something goes wrong, value can be set
             * @type {Object}
             */
            booResult = {};
        }
        /**
         * Start self refresh process
         * @type {boolean}
         */
        this.stopRefresh = false;
        /**
         * Return set item status
         */
        return Object.keys(booResult);
    }

    /**
     * The method cleans the storage and return true if it is empty
     * @param checkSupport {boolean}
     * @returns {boolean}
     */
    public clear(checkSupport: boolean): boolean {
        /**
         * Set result flag as true
         * @type {boolean}
         */
        let booResult: boolean = true;
        /**
         * Stop self refresh process
         * @type {boolean}
         */
        this.stopRefresh = true;
        try {
            /**
             * If that store is supported
             */
            if (!checkSupport || this.isSupported()) {
                /**
                 * Initialise store result counter
                 * @type {number}
                 */
                let arResult: number = 0;
                /**
                 * Iterate through all supported stores
                 */
                for (let store of this.stores) {
                    arResult += 1 * store.clear(false);
                }
                /**
                 * If removed count equal to stores count
                 * @type {boolean}
                 */
                booResult = (arResult === this.stores.length);
            } else {
                /**
                 * If stores does not supported, value can be set
                 * @type {boolean}
                 */
                booResult = false;
            }
        } catch (e) {
            /**
             * If something goes wrong, value can be set
             * @type {boolean}
             */
            booResult = false;
        }
        /**
         * Start self refresh process
         * @type {boolean}
         */
        this.stopRefresh = false;
        /**
         * Return set item status
         */
        return booResult;
    }

    /**
     * Self refresh
     */
    public refresh(): void {
        if (!this.stopRefresh) {
            let arrKeys: Array<string> = this.getKeys(false);
            for (let key of arrKeys) {
                let value = this.getItem(false, key);
                /**
                 * Iterate through all supported stores
                 */
                for (let store of this.stores) {
                    if (value !== store.getItem(false, key)) {
                        store.setItem(false, key, value.toString());
                    }
                }
            }
        }
    }

    /**
     * Stop every cookie
     */
    public destroy(): boolean {
        AnimationFrame.unsubscribe(this.refreshID);
        this.stopRefresh = true;
        this.refresh = () => {
            return null;
        };
        this.stores = [];
        return true;
    }
}

module.exports = EverCookie;
