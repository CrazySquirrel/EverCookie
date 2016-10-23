"use strict";
/**
 * Class for working with DOM
 */
export default class DOM {
    /**
     * Get element sizes and position
     * @param domNode
     * @param domDocument
     * @param showForce
     * @return {{bottom: number, height: number, left: number, right: number, top: number, width: number}}
     */
    public static getBoundingClientRect(domNode: any, domDocument: Document = document, showForce: boolean = false): {
        bottom: number,
        height: number,
        left: number,
        right: number,
        top: number,
        width: number
    } {
        if (typeof domNode === "string") {
            domNode = domDocument.getElementById(domNode);
        }
        let styles;
        if (showForce) {
            styles = getComputedStyle(domNode);
            if (styles && styles.display === "none") {
                domNode.style.display = "block";
            }
        }
        let objRet = {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
        };
        if (domNode) {
            /**
             * If default method is supported than use it
             */
            if (domNode.getBoundingClientRect) {
                objRet = domNode.getBoundingClientRect();
                /**
                 * IE hack
                 */
                objRet = {
                    bottom: objRet.bottom,
                    height: objRet.height || domNode.clientHeight,
                    left: objRet.left,
                    right: objRet.right,
                    top: objRet.top,
                    width: objRet.width || domNode.clientWidth,
                };
            } else {
                /**
                 * Write the element in a temporary variable
                 */
                let domElement = domNode;
                /**
                 * Calculated basic parameters of the element
                 * @type {Object}
                 */
                let objCoordinates = {
                    height: domElement.offsetHeight,
                    width: domElement.offsetWidth,
                    x: 0,
                    y: 0,
                };
                /**
                 * Are passed on to all parents and take into account their offsets
                 */
                while (domElement) {
                    objCoordinates.x += domElement.offsetLeft;
                    objCoordinates.y += domElement.offsetTop;
                    domElement = domElement.offsetParent;
                }
                /**
                 *
                 * @type {Object}
                 */
                objRet = {
                    bottom: objCoordinates.y + objCoordinates.height,
                    height: objCoordinates.height,
                    left: objCoordinates.x,
                    right: objCoordinates.x + objCoordinates.width,
                    top: objCoordinates.y,
                    width: objCoordinates.width,
                };
            }
        }
        if (showForce && domNode) {
            domNode.style.display = "";
        }
        /**
         * Return size and position of the element
         */
        return objRet;
    };

    /**
     * Find element position
     * @param domNode
     * @param showForce
     * @return {{top: number, left: number}}
     */
    public static findElementPosition(domNode: any, showForce: boolean = false) {
        let left = 0;
        let top = 0;
        while (domNode) {
            let styles;
            if (showForce) {
                styles = getComputedStyle(domNode);
                if (styles && styles.display === "none") {
                    domNode.style.display = "block";
                }
            }

            left += domNode.offsetLeft;
            top += domNode.offsetTop;
            domNode = domNode.offsetParent;

            if (showForce && domNode) {
                domNode.style.display = "";
            }
        }
        return {
            top,
            left,
        };
    }

    /**
     * Add event listener
     * @param obj
     * @param name
     * @param func
     */
    public static addEvent(obj: any, name: string, func: Function): void {
        if (obj.addEventListener) {
            obj.addEventListener(name, func, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + name, func);
        }
    }

    /**
     * Remove event listener
     * @param obj
     * @param name
     * @param func
     */
    public static removeEvent(obj: any, name: string, func: Function): void {
        if (obj.removeEventListener) {
            obj.removeEventListener(name, func, false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + name, func);
        }
    }

    /**
     * Check if element has class name
     * @param element
     * @param className
     * @return {boolean}
     */
    public static hasClassName(element: HTMLElement, className: string): boolean {
        return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
    }

    /**
     * Add class name
     * @param element
     * @param className
     * @return {HTMLElement}
     */
    public static addClassName(element: HTMLElement, className: string): HTMLElement {
        if (!DOM.hasClassName(element, className)) {
            let cl = element.className;
            element.className = cl ? cl + " " + className : className;
        }
        return element;
    }

    /**
     * Remove class name
     * @param element
     * @param className
     * @return {HTMLElement}
     */
    public static removeClassName(element: HTMLElement, className: string): HTMLElement {
        let classes = element.className.split(" ");
        for (let i = classes.length - 1; i >= 0; i--) {
            if (classes[i] === className) {
                classes.splice(i, 1);
            }
        }
        element.className = classes.join(" ");
        return element;
    }

    /**
     * Toggle class name
     * @param element
     * @param className
     * @param toggle
     * @return {HTMLElement}
     */
    public static toggleClassName(element: HTMLElement, className: string, toggle: boolean): HTMLElement {
        if (toggle) {
            DOM.addClassName(element, className);
        } else {
            DOM.removeClassName(element, className);
        }
        return element;
    }

    /**
     * Replace class name
     * @param element
     * @param oldClassName
     * @param newClassName
     * @return {HTMLElement}
     */
    public static replaceClass(element: HTMLElement, oldClassName: string, newClassName: string): HTMLElement {
        DOM.removeClassName(element, oldClassName);
        DOM.addClassName(element, newClassName);
        return element;
    }

    /**
     * Get element by tag name and index
     * @param tn
     * @param context
     * @param index
     * @return {Node}
     */
    public static getElementByTagName(tn: string, context: Document, index: number): Node {
        let cont = (context || document);
        let els: NodeList = cont.getElementsByTagName(tn);
        if (null == index || isNaN(index)) {
            return undefined;
        } else {
            return els[index];
        }
    }
}
