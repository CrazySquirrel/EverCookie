"use strict";
/**
 * Import sub interfaces
 */
import ILocalStorage from "./ILocalStorage";
import ISessionStorage from "./ISessionStorage";
import IDebug from "./IDebug";
/**
 * The storage interface
 */
interface IWindow {
    document: any;
    Utils: any;

    eventListenerAdded: boolean;

    innerHeight: number;
    innerWidth: number;
    pageXOffset: number;
    pageYOffset: number;

    globalStorage: Object;

    onerror: Function;
    requestAnimationFrame: Function;
    webkitRequestAnimationFrame: Function;
    mozRequestAnimationFrame: Function;
    oRequestAnimationFrame: Function;
    msRequestAnimationFrame: Function;

    localStorage: ILocalStorage;
    sessionStorage: ISessionStorage;
    Debug: IDebug;

    setTimeout(callback: Function, time: number): number;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
