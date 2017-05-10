"use strict";
/**
 * Import interfaces
 */
import IWindow from "../../interfaces/IWindow";
/**
 * Declare window interface
 */
declare let window: IWindow;

/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";
/**
 * The SessionStorage
 */
export default class SessionStorage implements IStorage {

  public regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");

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
    return (typeof window.sessionStorage !== "undefined");
  }

  /**
   * The method sets the value and returns true if it has been set
   * @param checkSupport {boolean}
   * @param key {string}
   * @param value {string}
   * @return {boolean}
   */
  public setItem(checkSupport: boolean = true,
                 key: string,
                 value: string): boolean {
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
           * The hash needs for splitting scopes storage
           * @type {string}
           */
          const localKey: string = this.hash + "_" + key;
          /**
           * Set value
           * @type {string}
           */
          window.sessionStorage.setItem(localKey, value);
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
      } else {
        /**
         * If input data is not valid
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
  public getItem(checkSupport: boolean = true,
                 key: string): string|boolean {
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
           * The hash needs for splitting scopes storage
           * @type {string}
           */
          const localKey: string = this.hash + "_" + key;
          /**
           * Get value
           */
          const value: string = window.sessionStorage.getItem(localKey);
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
  public removeItem(checkSupport: boolean = true,
                    key: string): boolean {
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
           * The hash needs for splitting scopes storage
           * @type {string}
           */
          const localKey: string = this.hash + "_" + key;
          /**
           * Clean value and remove
           * @type {boolean}
           */
          window.sessionStorage.removeItem(localKey);
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
      } else {
        /**
         * If input data is not valid
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
  public getKeys(checkSupport: boolean = true): string[] {
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
           * The array of available keys
           * @type {Array}
           */
          const arrKeys: string[] = [];
          /**
           * Iterate through the SessionStorage
           */
          for (let i = 0; i < window.sessionStorage.length; i++) {
            if (window.sessionStorage.key(i).indexOf(this.hash) === 0) {
              arrKeys.push(window.sessionStorage.key(i).substr(this.hash.length + 1));
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
      } else {
        /**
         * If input data is not valid
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
  public clear(checkSupport: boolean = true): boolean {
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
          const arrKeys = this.getKeys(checkSupport);
          if (arrKeys) {
            for (let j = 0; j < arrKeys.length; j++) {
              const i = arrKeys[j];
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
      } else {
        /**
         * If input data is not valid
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
}
