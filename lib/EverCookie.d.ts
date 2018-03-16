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
/**
 * EverCookie storage
 */
export default class EverCookie implements IStorage {
    regValidKey: RegExp;
    /**
     * The hash needs for splitting scopes storage
     */
    private hash;
    /**
     * Different types of stores
     */
    private stores;
    /**
     * Self refresh flag
     */
    private stopRefresh;
    /**
     * Refresh animation frame ID
     */
    private refreshID;
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
     * @returns {boolean}
     */
    setItem(checkSupport: boolean, key: string, value: string): boolean;
    /**
     * The method reads the value and returns it or returns false if the value does not exist
     * @param checkSupport {boolean}
     * @param key {string}
     * @returns {string|boolean}
     */
    getItem(checkSupport: boolean, key: string): string | false;
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
    getKeys(checkSupport?: boolean): string[];
    /**
     * The method cleans the storage and return true if it is empty
     * @param checkSupport {boolean}
     * @returns {boolean}
     */
    clear(checkSupport?: boolean): boolean;
    /**
     * Self refresh
     */
    refresh(): void;
    /**
     * Stop every cookie
     */
    destroy(): boolean;
    /**
     * Start watching data on every frame tick
     */
    start(): boolean;
    /**
     * Stop watching data on every frame tick
     */
    stop(): boolean;
}
