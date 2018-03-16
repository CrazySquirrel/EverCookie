"use strict";
require("./index.html");

let EverCookie = require("../../lib/EverCookie.ts");

let LocalEverCookie = new EverCookie("test");

window.document.write("<b>EverCookie set</b>: " + LocalEverCookie.setItem(true, "test", "test") + "<br/>");
window.document.write("<b>EverCookie get</b>: " + LocalEverCookie.getItem(true, "test") + "<br/>");
window.document.write("<b>EverCookie get keys</b>: " + LocalEverCookie.getKeys(true) + "<br/>");
window.document.write("<b>EverCookie remove item</b>: " + LocalEverCookie.removeItem(true, "test") + "<br/>");
window.document.write("<b>EverCookie clear</b>: " + LocalEverCookie.clear(true) + "<br/>");
window.document.write("<b>EverCookie destroy</b>: " + LocalEverCookie.destroy() + "<br/>");
window.document.write("<b>EverCookie stop</b>: " + LocalEverCookie.stop() + "<br/>");
window.document.write("<b>EverCookie start</b>: " + LocalEverCookie.start() + "<br/>");
