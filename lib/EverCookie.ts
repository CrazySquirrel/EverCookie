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

declare let module: any;
/**
 * Import Animation frame
 */
declare let require: any;
import AnimationFrame from "AnimationFrame/lib/AnimationFrame";

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

  public regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");

  /**
   * The hash needs for splitting scopes storage
   */
  private hash: string;

  /**
   * Different types of stores
   */
  private stores: any[];

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
      this.start();
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
  public setItem(checkSupport: boolean = true,
                 key: string,
                 value: string) {
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
       * Validate input data
       */
      if (
          typeof checkSupport === "boolean" &&
          (
              typeof key === "string" &&
              this.regValidKey.test(key)
          ) &&
          (
              typeof value === "string" &&
              (value === "" || this.regValidKey.test(value))
          )
      ) {
        /**
         * If that store is supported
         */
        if (!checkSupport || this.isSupported()) {
          /**
           * Initialise store result array
           * @type {Array}
           */
          const arResults: boolean[] = [];
          /**
           * Iterate through all supported stores
           */
          for (let j = 0; j < this.stores.length; j++) {
            const store = this.stores[j];
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
      } else {
        /**
         * If input data is not valid
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
  public getItem(checkSupport: boolean = true,
                 key: string) {
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
       * Validate input data
       */
      if (
          typeof checkSupport === "boolean" &&
          (
              typeof key === "string" &&
              this.regValidKey.test(key)
          )
      ) {
        /**
         * If that store is supported
         */
        if (!checkSupport || this.isSupported()) {
          /**
           * Initialise temporary store result array
           * @type {string[]}
           */
          const localArrResults: string[] = [];
          /**
           * Iterate through all supported stores
           */
          for (let j = 0; j < this.stores.length; j++) {
            const store = this.stores[j];
            const value = store.getItem(false, key);
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
          const arResults: any = {};
          let numMax = 0;
          /**
           * Looking for the most frequently mentioned result
           */
          for (let j = 0; j < localArrResults.length; j++) {
            const i = localArrResults[j];
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
      } else {
        /**
         * If input data is not valid
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
  public removeItem(checkSupport: boolean = true,
                    key: string) {
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
       * Validate input data
       */
      if (
          typeof checkSupport === "boolean" &&
          (
              typeof key === "string" &&
              this.regValidKey.test(key)
          )
      ) {
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
          for (let j = 0; j < this.stores.length; j++) {
            const store = this.stores[j];
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
      } else {
        /**
         * If input data is not valid
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
  public getKeys(checkSupport: boolean = true) {
    /**
     * Set result flag as true
     * @type {Object}
     */
    let booResult: any = {};
    /**
     * Stop self refresh process
     * @type {boolean}
     */
    this.stopRefresh = true;
    try {
      /**
       * Validate input data
       */
      if (
          typeof checkSupport === "boolean"
      ) {
        /**
         * If that store is supported
         */
        if (!checkSupport || this.isSupported()) {
          /**
           * Iterate through all supported stores
           */
          for (let j = 0; j < this.stores.length; j++) {
            const store = this.stores[j];
            const value: string[] = store.getKeys(false);
            if (value.length > 0) {
              for (let x = 0; x < value.length; x++) {
                const i = value[x];
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
      } else {
        /**
         * If input data is not valid
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
  public clear(checkSupport: boolean = true): boolean {
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
       * Validate input data
       */
      if (
          typeof checkSupport === "boolean"
      ) {
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
          for (let j = 0; j < this.stores.length; j++) {
            const store = this.stores[j];
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
      } else {
        /**
         * If input data is not valid
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
      const arrKeys: string[] = this.getKeys(false);
      for (let i = 0; i < arrKeys.length; i++) {
        const key = arrKeys[i];
        const value = this.getItem(false, key);
        /**
         * Iterate through all supported stores
         */
        for (let j = 0; j < this.stores.length; j++) {
          const store = this.stores[j];
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
    this.stop();

    this.refresh = () => {
      return null;
    };
    this.stores = [];

    return true;
  }

  /**
   * Start watching data on every frame tick
   */
  public start(): boolean {
    this.refreshID = AnimationFrame.subscribe(this, this.refresh);
    return true;
  }

  /**
   * Stop watching data on every frame tick
   */
  public stop(): boolean {
    AnimationFrame.unsubscribe(this.refreshID);
    this.stopRefresh = true;
    return true;
  }
}

module.exports = EverCookie;
