"use strict";
/**
 * The IError interface
 */
interface IError {
    /**
     * Error name
     */
    name: string;
    /**
     * Error message
     */
    message: string;
    /**
     * Error stack call trace
     */
    stack: string;
    /**
     * Error constructor
     * @param message
     */
    new(message?: string): IError;
}
/**
 * Export the IError interface
 */
export default IError;
