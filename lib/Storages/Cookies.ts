"use strict";
/**
 * Import the storage interface which must be implemented
 */
import IStorage from "../../interfaces/IStorage";

/**
 * The document cookies storage
 */
export default class Cookies implements IStorage {

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
    return (
        typeof document === "object" &&
        typeof document.cookie === "string"
    );
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
  public setItem(checkSupport: boolean = true,
                 key: string,
                 value: string,
                 expires: number = 30,
                 path: string = "/",
                 domain: string|undefined = undefined,
                 secure: boolean = (location.protocol === "https:")): boolean {
    try {
      if (typeof domain === "undefined") {
        const d = location.hostname.split(".");
        domain = (d.length > 2 ? "." : "") + d.join(".");
      }
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
          ) &&
          (
              typeof expires === "number" &&
              expires < 365
          ) &&
          typeof path === "string" &&
          (
              typeof domain === "string" &&
              domain.indexOf(location.hostname) !== -1
          ) &&
          (
              typeof secure === "boolean" &&
              secure === (location.protocol === "https:")
          )
      ) {
        /**
         * Validate input data
         */
        const a: any = document.createElement("a");
        a.href = "http://" + domain + path;
        if (
            a.hostname === domain ||
            a.path === path
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
             * Save cookies for 30 days
             * @type {Date}
             */
            const date: Date = new Date();
            date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
            const exp: string = date.toUTCString();
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
            return this.getItem(checkSupport, key) === decodeURIComponent(value);
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
          key = this.hash + "_" + key;
          /**
           * Get the array from document cookie split by ;
           * @type {string[]}
           */
          const arrCookie: string[] = document.cookie.split(";");
          /**
           * Iterate through the cookies
           */
          for (let j = 0; j < arrCookie.length; j++) {
            const i = arrCookie[j];
            /**
             * Trim and split each cookie by = for key value pare
             * @type {string[]}
             */
            const v: string[] = i.trim().split("=", 2);
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
           * Set empty overdue value by key
           */
          this.setItem(checkSupport, key, "", -1 * 24 * 60 * 60);
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
          const arrCookie: string[] = document.cookie.split(";");
          /**
           * Iterate through the cookies
           */
          for (let j = 0; j < arrCookie.length; j++) {
            const i = arrCookie[j];
            /**
             * Trim and split each cookie by = for key value pare
             * @type {string[]}
             */
            const v: string[] = i.trim().split("=", 2);
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
