"use strict";
/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";
/**
 * The DOMStorage
 */
export default class DOMStorage implements IStorage {

  public regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");

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
          this.domStorage.load(this.hash);
          const value: string = this.domStorage.getAttribute(localKey);
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
           * Get the array from document cookie split by ;
           * @type {string[]}
           */
          const localArrKeys: any[] = this.domStorage.XMLDocument.documentElement.attributes;
          /**
           * Iterate through the globalStorage
           */
          for (let i = 0; i < localArrKeys.length; i++) {
            const key: string = localArrKeys[i].name;
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
