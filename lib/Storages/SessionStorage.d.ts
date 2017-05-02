/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";
/**
 * The SessionStorage
 */
export default class SessionStorage implements IStorage {
    regValidKey: RegExp;
    /**
     * The hash needs for splitting scopes storage
     */
    private hash;
    /**
     * The constructor should accept a hash to separate the scopes of storage
     * @param hash {string}
     */
    constructor(hash?: string);
    /**
     * The method returns the flag whether supported this storage type or not
     * @returns {boolean}
     */
    isSupported(): boolean;
    /**
     * The method sets the value and returns true if it has been set
     * @param checkSupport {boolean}
     * @param key {string}
     * @param value {string}
     * @return {boolean}
     */
    setItem(checkSupport: boolean, key: string, value: string): boolean;
    /**
     * The method reads the value and returns it or returns false if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {string|boolean}
     */
    getItem(checkSupport: boolean, key: string): string | boolean;
    /**
     * The method removes the value and return true if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {boolean}
     */
    removeItem(checkSupport: boolean, key: string): boolean;
    /**
     * The method returns the array of string of available keys
     * @param checkSupport {boolean}
     * @returns {string[]}
     */
    getKeys(checkSupport?: boolean): Array<string>;
    /**
     * The method cleans the storage and return true if it is empty
     * @param checkSupport {boolean}
     * @returns {boolean}
     */
    clear(checkSupport?: boolean): boolean;
}
