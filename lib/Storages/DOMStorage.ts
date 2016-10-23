"use strict";
/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";
/**
 * The DOMStorage
 */
export default class DOMStorage implements IStorage {
    /**
     * The hash needs for splitting scopes storage
     */
    private hash: string;
    /**
     * DOM storage element
     */
    private domStorage: any;

    /**
     * The constructor should accept a hash to separate the scopes of storage
     * @param hash {string}
     */
    constructor(hash?: string) {
        this.hash = hash || location.hostname;
        this.domStorage = document.getElementById(this.hash);
        if (!this.domStorage) {
            this.domStorage = document.createElement("div");
            this.domStorage.id = this.hash;
        }
        if (document.body) {
            document.body.appendChild(this.domStorage);
            this.domStorage = document.getElementById(this.hash);

            if (this.isSupported()) {
                this.domStorage.style.behavior = "url(#default#userData)";
            }
        }
    }

    /**
     * The method returns the flag whether supported this storage type or not
     * @returns {boolean}
     */
    public isSupported(): boolean {
        return (
            typeof this.domStorage === "object" &&
            typeof this.domStorage.parentNode === "object" &&
            typeof this.domStorage.addBehavior !== "undefined"
        );
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
                 * Set dom value
                 */
                this.domStorage.setAttribute(localKey, value);
                this.domStorage.save(this.hash);
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
                this.domStorage.load(this.hash);
                let value: string = this.domStorage.getAttribute(localKey);
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
                this.domStorage.removeAttribute(localKey);
                this.domStorage.save(this.hash);
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
                let localArrKeys: Array<Attr> = this.domStorage.XMLDocument.documentElement.attributes;
                /**
                 * Iterate through the globalStorage
                 */
                for (let i = 0; i < localArrKeys.length; i++) {
                    let key: string = localArrKeys[i].name;
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
