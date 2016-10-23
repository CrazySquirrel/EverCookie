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
 * Class for working with window
 */
export default class Window {
    /**
     * Get window height
     * @returns {number}
     */
    public static getHeight(objWindow: IWindow = window): number {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    /**
     * Get window width
     * @returns {number}
     */
    public static getWidth(objWindow: IWindow = window): number {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    /**
     * Get window sizes
     * @return {{height: number, width: number}}
     */
    public static getSizes(objWindow: IWindow = window): {
        height: number,
        width: number
    } {
        return ({
            height: Window.getHeight(objWindow),
            width: Window.getWidth(objWindow),
        });
    }
}
