"use strict";
/**
 * Import interfaces
 */
import IWindow from "../Interfaces/IWindow";
/**
 * Declare window interface
 */
declare var window: IWindow;

/**
 * Class for working with document
 */
export default class Document {
    /**
     * Get document height
     * @returns {number}
     */
    public static getHeight(objWindow: IWindow = window): number {
        return Math.max(
            objWindow.document.body.scrollHeight,
            objWindow.document.documentElement.scrollHeight,
            objWindow.document.body.offsetHeight,
            objWindow.document.documentElement.offsetHeight,
            objWindow.document.body.clientHeight,
            objWindow.document.documentElement.clientHeight
        );
    }

    /**
     * Get document width
     * @returns {number}
     */
    public static getWidth(objWindow: IWindow = window): number {
        return Math.max(
            objWindow.document.body.scrollWidth,
            objWindow.document.documentElement.scrollWidth,
            objWindow.document.body.offsetWidth,
            objWindow.document.documentElement.offsetWidth,
            objWindow.document.body.clientWidth,
            objWindow.document.documentElement.clientWidth
        );
    }

    /**
     * Get document top scroll
     * @param objWindow
     * @return {number}
     */
    public static getScrollTop(objWindow: IWindow = window): number {
        return (
            objWindow.pageYOffset ||
            (
                objWindow.document.documentElement &&
                objWindow.document.documentElement.scrollTop
            ) ||
            (
                objWindow.document.body &&
                objWindow.document.body.scrollTop
            )
        );
    }

    /**
     * Get document left scroll
     * @param objWindow
     * @return {number}
     */
    public static getScrollLeft(objWindow: IWindow = window): number {
        return (
            objWindow.pageXOffset ||
            (
                objWindow.document.documentElement &&
                objWindow.document.documentElement.scrollLeft
            ) ||
            (
                objWindow.document.body &&
                objWindow.document.body.scrollLeft
            )
        );
    }

    /**
     * Get document scrolls
     * @param objWindow
     * @return {{left: number, top: number}}
     */
    public static getScroll(objWindow: IWindow = window): {left: number, top: number} {
        return ({
            left: Document.getScrollLeft(objWindow),
            top: Document.getScrollTop(objWindow),
        });
    }
}
