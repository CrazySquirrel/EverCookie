"use strict";
/**
 * The IDebug interface
 */
interface IDebug {
    /**
     * The flag of use custom debug or not
     */
    use: boolean;

    /**
     * Inner messages stack
     */
    arrLog: Array<any>;

    /**
     * Object with default console methods
     */
    console: any;

    /**
     * Hidden DOM element for console writing
     */
    debugConsole: HTMLElement;

    /**
     * Initialize debug method
     */
    initDebugConsole(): void;

    /**
     * Custom error method
     * @param strMessage
     * @param AdditionalMessage
     */
    error(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Custom warn method
     * @param strMessage
     * @param AdditionalMessage
     */
    warn(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Custom info method
     * @param strMessage
     * @param AdditionalMessage
     */
    info(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Custom log method
     * @param strMessage
     * @param AdditionalMessage
     */
    log(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Custom debug method
     * @param strMessage
     * @param AdditionalMessage
     */
    debug(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Method for searching log messages by filter
     * @param strMode
     * @param strMessage
     * @param strStackMethod
     * @param strStackFile
     */
    getLogRects(strMode?: string, strMessage?: string, strStackMethod?: string, strStackFile?: string): Array<any>;

    /**
     * Method for searching log messages by ID
     * @param ID
     */
    getLogRectByID(ID: number): any;

    /**
     * Method for clear log stack
     */
    clearLog(): void;

    /**
     * Inner method for writing messages to log stack
     * @param mode
     * @param strMessage
     */
    write(mode: string, strMessage: string): void;

    /**
     * Method for substitution of the standard console.error method
     * @param strMessage
     * @param AdditionalMessage
     * @private
     */
    _error(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Method for substitution of the standard console.warn method
     * @param strMessage
     * @param AdditionalMessage
     * @private
     */
    _warn(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Method for substitution of the standard console.info method
     * @param strMessage
     * @param AdditionalMessage
     * @private
     */
    _info(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Method for substitution of the standard console.log method
     * @param strMessage
     * @param AdditionalMessage
     * @private
     */
    _log(strMessage: any, ...AdditionalMessage: Array<any>): void;

    /**
     * Method for substitution of the standard console.debug method
     * @param strMessage
     * @param AdditionalMessage
     * @private
     */
    _debug(strMessage: any, ...AdditionalMessage: Array<any>): void;
}
/**
 * Export the IDebug interface
 */
export default IDebug;
