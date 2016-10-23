"use strict";
/**
 * Import interfaces
 */
import IWindow from "../../interfaces/IWindow";
/**
 * Declare window interface
 */
declare var window: IWindow;

/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";
/**
 * The GlobalStorage
 */
export default class GlobalStorage implements IStorage {
    /**
     * The hash needs for splitting scopes storage
     */
    private hash: string;
    /**
     * Link to global storage
     */
    private globalStorage: Object;

    /**
     * The constructor should accept a hash to separate the scopes of storage
     * @param hash {string}
     */
    constructor(hash?: string) {
        this.hash = hash || location.hostname;

        if (!window.globalStorage) {
            window.globalStorage = {};
        }
        if (!window.globalStorage[document.domain]) {
            window.globalStorage[document.domain] = {};
        }
        this.globalStorage = window.globalStorage[document.domain];
    }

    /**
     * The method returns the flag whether supported this storage type or not
     * @returns {boolean}
     */
    public isSupported(): boolean {
        return (typeof this.globalStorage === "object");
    }

    /**
     * The method sets the value and returns true if it has been set
     * @param checkSupport {boolean}
     * @param key {string}
     * @param value {string}
     * @return {boolean}
     */
    public setItem(checkSupport: boolean, key: string, value: string): boolean {
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
                 * Set value
                 * @type {string}
                 */
                this.globalStorage[localKey] = value;
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
                let localKey: string = this.hash + "_" + key;
                /**
                 * Get value
                 */
                let value: string = this.globalStorage[localKey];
                /**
                 * If value exist, return it
                 */
                if (value) {
                    return value;
                } else {
                    return false;
                }
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
                 * The hash needs for splitting scopes storage
                 * @type {string}
                 */
                let localKey: string = this.hash + "_" + key;
                /**
                 * Clean value and remove
                 * @type {boolean}
                 */
                this.globalStorage[localKey] = false;
                delete this.globalStorage[localKey];
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
                let localArrKeys: Array<string> = Object.keys(this.globalStorage);
                /**
                 * Iterate through the globalStorage
                 */
                for (let key of localArrKeys) {
                    /**
                     * If the key contains hash add it to the list
                     */
                    if (key.indexOf(this.hash) === 0) {
                        /**
                         * Add key to the list
                         */
                        arrKeys.push(key.substr(this.hash.length + 1));
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
