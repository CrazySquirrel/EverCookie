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
 * The LocalStorage
 */
export default class LocalStorage implements IStorage {
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
        return (typeof window.localStorage !== "undefined");
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
                window.localStorage.setItem(localKey, value);
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
                let value: string = window.localStorage.getItem(localKey);
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
                window.localStorage.removeItem(localKey);
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
                 * Iterate through the localStorage
                 */
                for (let i = 0; i < window.localStorage.length; i++) {
                    if (window.localStorage.key(i).indexOf(this.hash) === 0) {
                        arrKeys.push(window.localStorage.key(i).substr(this.hash.length + 1));
                    }
                }
                /**
                 * Return keys
                 */
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
