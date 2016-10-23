"use strict";
/**
 * The IAnimationFrame interface
 */
interface IAnimationFrame {
    /**
     * Subscribe method to watch
     * @param context
     * @param callback
     * @param params
     * @return {boolean|string}
     */
    subscribe(context: Object,
              callback: Function,
              params: Array<any>,
              ID?: string): boolean|string;

    /**
     * Unsubscribe method by ID
     * @param ID
     */
    unsubscribe(ID: string): void;
}
/**
 * Export the IAnimationFrame interface
 */
export default IAnimationFrame;
