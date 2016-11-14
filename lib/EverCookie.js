(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("EverCookie", [], factory);
	else if(typeof exports === 'object')
		exports["EverCookie"] = factory();
	else
		root["EverCookie"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _AnimationFrame = __webpack_require__(6);
	
	var _AnimationFrame2 = _interopRequireDefault(_AnimationFrame);
	
	var _Cookies = __webpack_require__(7);
	
	var _Cookies2 = _interopRequireDefault(_Cookies);
	
	var _DOMStorage = __webpack_require__(20);
	
	var _DOMStorage2 = _interopRequireDefault(_DOMStorage);
	
	var _GlobalStorage = __webpack_require__(21);
	
	var _GlobalStorage2 = _interopRequireDefault(_GlobalStorage);
	
	var _LocalStorage = __webpack_require__(22);
	
	var _LocalStorage2 = _interopRequireDefault(_LocalStorage);
	
	var _SessionStorage = __webpack_require__(23);
	
	var _SessionStorage2 = _interopRequireDefault(_SessionStorage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	/**
	 * Import storages
	 */
	
	
	/**
	 * EverCookie storage
	 */
	var EverCookie = function () {
	  /**
	   * The constructor should accept a hash to separate the scopes of storage
	   * @param hash {string}
	   */
	  function EverCookie(hash) {
	    _classCallCheck(this, EverCookie);
	
	    /**
	     * Generate hash
	     * @type {string}
	     */
	    this.hash = hash || location.hostname;
	    /**
	     * Initialise stores
	     * @type {Array}
	     */
	    this.stores = [];
	    if (typeof _Cookies2.default !== "undefined") {
	      this.stores.push(new _Cookies2.default(this.hash));
	    }
	    if (typeof _GlobalStorage2.default !== "undefined") {
	      this.stores.push(new _GlobalStorage2.default(this.hash));
	    }
	    if (typeof _LocalStorage2.default !== "undefined") {
	      this.stores.push(new _LocalStorage2.default(this.hash));
	    }
	    if (typeof _SessionStorage2.default !== "undefined") {
	      this.stores.push(new _SessionStorage2.default(this.hash));
	    }
	    if (typeof _DOMStorage2.default !== "undefined") {
	      this.stores.push(new _DOMStorage2.default(this.hash));
	    }
	    for (var i = 0; i < this.stores.length; i++) {
	      if (!this.stores[i].isSupported()) {
	        this.stores.splice(i, 1);
	      }
	    }
	    /**
	     * Set self refresh flag
	     * @type {boolean}
	     */
	    this.stopRefresh = false;
	    /**
	     * Self refresh
	     */
	    if (this.isSupported()) {
	      this.refreshID = _AnimationFrame2.default.subscribe(this, this.refresh, []);
	    }
	  }
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	
	
	  EverCookie.prototype.isSupported = function isSupported() {
	    return this.stores && this.stores.length > 0;
	  };
	  /**
	   * The method sets the value and returns true if it has been set
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @param value {string}
	   * @returns {boolean}
	   */
	
	
	  EverCookie.prototype.setItem = function setItem(checkSupport, key, value) {
	    /**
	     * Set result flag as true
	     * @type {boolean}
	     */
	    var booResult = true;
	    /**
	     * Stop self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = true;
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * Initialise store result array
	         * @type {Array}
	         */
	        var arResults = [];
	        /**
	         * Iterate through all supported stores
	         */
	        for (var _iterator = this.stores, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;
	
	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }
	
	          var store = _ref;
	
	          /**
	           * Write store operation result to result array
	           */
	          arResults.push(store.setItem(false, key, value));
	        }
	        /**
	         * If there exist result and one of them is true, it is means, that value was set
	         * @type {boolean}
	         */
	        booResult = arResults.length > 0 && arResults.indexOf(true) !== -1;
	      } else {
	        /**
	         * If stores does not supported, value can be set
	         * @type {boolean}
	         */
	        booResult = false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong, value can be set
	       * @type {boolean}
	       */
	      booResult = false;
	    }
	    /**
	     * Start self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = false;
	    /**
	     * Return set item status
	     */
	    return booResult;
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  EverCookie.prototype.getItem = function getItem(checkSupport, key) {
	    /**
	     * Set result flag as true
	     * @type {boolean|string}
	     */
	    var booResult = false;
	    /**
	     * Stop self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = true;
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * Initialise temporary store result array
	         * @type {string[]}
	         */
	        var localArrResults = [];
	        /**
	         * Iterate through all supported stores
	         */
	        for (var _iterator2 = this.stores, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;
	
	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }
	
	          var store = _ref2;
	
	          var value = store.getItem(false, key);
	          /**
	           * If store has this value
	           */
	          if (value) {
	            /**
	             * Write store operation result to result array
	             */
	            localArrResults.push(value);
	          }
	        }
	        /**
	         * Initialise store result array
	         * @type {Object}
	         */
	        var arResults = {};
	        var numMax = 0;
	        /**
	         * Looking for the most frequently mentioned result
	         */
	        for (var _iterator3 = localArrResults, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	          var _ref3;
	
	          if (_isArray3) {
	            if (_i3 >= _iterator3.length) break;
	            _ref3 = _iterator3[_i3++];
	          } else {
	            _i3 = _iterator3.next();
	            if (_i3.done) break;
	            _ref3 = _i3.value;
	          }
	
	          var i = _ref3;
	
	          if (!arResults[i]) {
	            arResults[i] = 0;
	          }
	          arResults[i]++;
	          if (arResults[i] > numMax) {
	            numMax = arResults[i];
	            booResult = i;
	          }
	        }
	      } else {
	        /**
	         * If stores does not supported, value can be set
	         * @type {boolean}
	         */
	        booResult = false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong, value can be set
	       * @type {boolean}
	       */
	      booResult = false;
	    }
	    /**
	     * Start self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = false;
	    /**
	     * Return set item status
	     */
	    return booResult;
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  EverCookie.prototype.removeItem = function removeItem(checkSupport, key) {
	    /**
	     * Set result flag as true
	     * @type {boolean}
	     */
	    var booResult = true;
	    /**
	     * Stop self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = true;
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * Initialise store result counter
	         * @type {number}
	         */
	        var arResult = 0;
	        /**
	         * Iterate through all supported stores
	         */
	        for (var _iterator4 = this.stores, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
	          var _ref4;
	
	          if (_isArray4) {
	            if (_i4 >= _iterator4.length) break;
	            _ref4 = _iterator4[_i4++];
	          } else {
	            _i4 = _iterator4.next();
	            if (_i4.done) break;
	            _ref4 = _i4.value;
	          }
	
	          var store = _ref4;
	
	          /**
	           * If store supported (Not required, the stores is checked during initialization)
	           */
	          arResult += 1 * store.removeItem(false, key);
	        }
	        /**
	         * If removed count equal to stores count
	         * @type {boolean}
	         */
	        booResult = arResult === this.stores.length;
	      } else {
	        /**
	         * If stores does not supported, value can be set
	         * @type {boolean}
	         */
	        booResult = false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong, value can be set
	       * @type {boolean}
	       */
	      booResult = false;
	    }
	    /**
	     * Start self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = false;
	    /**
	     * Return set item status
	     */
	    return booResult;
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  EverCookie.prototype.getKeys = function getKeys(checkSupport) {
	    /**
	     * Set result flag as true
	     * @type {Object}
	     */
	    var booResult = {};
	    /**
	     * Stop self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = true;
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * Iterate through all supported stores
	         */
	        for (var _iterator5 = this.stores, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
	          var _ref5;
	
	          if (_isArray5) {
	            if (_i5 >= _iterator5.length) break;
	            _ref5 = _iterator5[_i5++];
	          } else {
	            _i5 = _iterator5.next();
	            if (_i5.done) break;
	            _ref5 = _i5.value;
	          }
	
	          var store = _ref5;
	
	          var value = store.getKeys(false);
	          if (value.length > 0) {
	            for (var _iterator6 = value, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
	              var _ref6;
	
	              if (_isArray6) {
	                if (_i6 >= _iterator6.length) break;
	                _ref6 = _iterator6[_i6++];
	              } else {
	                _i6 = _iterator6.next();
	                if (_i6.done) break;
	                _ref6 = _i6.value;
	              }
	
	              var i = _ref6;
	
	              booResult[i] = true;
	            }
	          }
	        }
	      } else {
	        /**
	         * If stores does not supported, value can be set
	         * @type {Object}
	         */
	        booResult = {};
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong, value can be set
	       * @type {Object}
	       */
	      booResult = {};
	    }
	    /**
	     * Start self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = false;
	    /**
	     * Return set item status
	     */
	    return Object.keys(booResult);
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  EverCookie.prototype.clear = function clear(checkSupport) {
	    /**
	     * Set result flag as true
	     * @type {boolean}
	     */
	    var booResult = true;
	    /**
	     * Stop self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = true;
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * Initialise store result counter
	         * @type {number}
	         */
	        var arResult = 0;
	        /**
	         * Iterate through all supported stores
	         */
	        for (var _iterator7 = this.stores, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
	          var _ref7;
	
	          if (_isArray7) {
	            if (_i7 >= _iterator7.length) break;
	            _ref7 = _iterator7[_i7++];
	          } else {
	            _i7 = _iterator7.next();
	            if (_i7.done) break;
	            _ref7 = _i7.value;
	          }
	
	          var store = _ref7;
	
	          arResult += 1 * store.clear(false);
	        }
	        /**
	         * If removed count equal to stores count
	         * @type {boolean}
	         */
	        booResult = arResult === this.stores.length;
	      } else {
	        /**
	         * If stores does not supported, value can be set
	         * @type {boolean}
	         */
	        booResult = false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong, value can be set
	       * @type {boolean}
	       */
	      booResult = false;
	    }
	    /**
	     * Start self refresh process
	     * @type {boolean}
	     */
	    this.stopRefresh = false;
	    /**
	     * Return set item status
	     */
	    return booResult;
	  };
	  /**
	   * Self refresh
	   */
	
	
	  EverCookie.prototype.refresh = function refresh() {
	    if (!this.stopRefresh) {
	      var arrKeys = this.getKeys(false);
	      for (var _iterator8 = arrKeys, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
	        var _ref8;
	
	        if (_isArray8) {
	          if (_i8 >= _iterator8.length) break;
	          _ref8 = _iterator8[_i8++];
	        } else {
	          _i8 = _iterator8.next();
	          if (_i8.done) break;
	          _ref8 = _i8.value;
	        }
	
	        var key = _ref8;
	
	        var value = this.getItem(false, key);
	        /**
	         * Iterate through all supported stores
	         */
	        for (var _iterator9 = this.stores, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
	          var _ref9;
	
	          if (_isArray9) {
	            if (_i9 >= _iterator9.length) break;
	            _ref9 = _iterator9[_i9++];
	          } else {
	            _i9 = _iterator9.next();
	            if (_i9.done) break;
	            _ref9 = _i9.value;
	          }
	
	          var store = _ref9;
	
	          if (value !== store.getItem(false, key)) {
	            store.setItem(false, key, value.toString());
	          }
	        }
	      }
	    }
	  };
	  /**
	   * Stop every cookie
	   */
	
	
	  EverCookie.prototype.destroy = function destroy() {
	    _AnimationFrame2.default.unsubscribe(this.refreshID);
	    this.stopRefresh = true;
	    this.refresh = function () {
	      return null;
	    };
	    this.stores = [];
	    return true;
	  };
	
	  return EverCookie;
	}();
	
	exports.default = EverCookie;
	
	module.exports = EverCookie;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	/**
	 * requestAnimationFrame polyfill
	 */
	root.requestAnimationFrame = function () {
	    return typeof root !== "undefined" && (root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame) || function (callback) {
	        root.setTimeout(callback, 1000 / 60);
	    };
	}();
	/**
	 * Bind polyfill
	 */
	function bind(b) {
	    /**
	     * If try bind variable that not a function, then throw error
	     */
	    if (typeof this !== "function") {
	        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }
	    /**
	     * let Array slice function
	     */
	    var a = Array.prototype.slice;
	    var f = a.call(arguments, 1);
	    var e = this;
	    function c() {
	        /*
	         if (
	         typeof root !== "undefined" &&
	         typeof root.console === "object" &&
	         typeof root.console.log === "function"
	         ) {
	         root.console.log("Bind polyfill");
	         }
	         */
	    }
	    function d() {
	        return e.apply(this instanceof c ? this : b || root, f.concat(a.call(arguments)));
	    }
	    /**
	     * Registered this prototype as prototype to bind implementation functions
	     */
	    c.prototype = this.prototype;
	    d.prototype = new c();
	    /**
	     * Return bind polyfill
	     */
	    return d;
	}
	Function.prototype.bind = Function.prototype.bind || bind;
	/**
	 * Object.keys polyfill
	 */
	function keys() {
	    var hasDoNotEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
	    var doNotEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
	    var doNotEnumsLength = doNotEnums.length;
	    return function (obj) {
	        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object" && (typeof obj !== "function" || obj === null)) {
	            throw new TypeError("Object.keys called on non-object");
	        }
	        var result = [];
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                result.push(prop);
	            }
	        }
	        if (hasDoNotEnumBug) {
	            for (var i = 0; i < doNotEnumsLength; i++) {
	                if (Object.prototype.hasOwnProperty.call(obj, doNotEnums[i])) {
	                    result.push(doNotEnums[i]);
	                }
	            }
	        }
	        return result;
	    };
	}
	Object.keys = Object.keys || keys();
	/**
	 * Request animation frame call stack class
	 */
	
	var AnimationFrame = function () {
	    /**
	     * Create request animation frame
	     */
	    function AnimationFrame() {
	        _classCallCheck(this, AnimationFrame);
	
	        /**
	         * Subscribed methods
	         */
	        this.stack = {};
	        /**
	         * Start requestAnimationFrame watcher
	         */
	        this.watch();
	    }
	    /**
	     * Subscribe method to watch
	     * @param context
	     * @param callback
	     * @param params
	     * @param ID
	     * @return {boolean|string}
	     */
	
	
	    AnimationFrame.prototype.subscribe = function subscribe() {
	        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : root;
	        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	            return null;
	        };
	        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	        var ID = arguments[3];
	
	        try {
	            /**
	             * If context and callback passed and they are object and function
	             */
	            if ((typeof context === "undefined" ? "undefined" : _typeof(context)) === "object" && typeof callback === "function") {
	                /**
	                 * Create UID
	                 */
	                var d = new Date();
	                var localID = ID || "x-" + d.getTime() + "-" + Math.round(Math.random() * 1e6);
	                /**
	                 * Add method to the stack
	                 */
	                this.stack[localID] = {
	                    context: context,
	                    callback: callback,
	                    params: params
	                };
	                /**
	                 * Write to console count of the subscribed methods
	                 */
	                /*
	                 if (
	                 typeof root !== "undefined" &&
	                 typeof root.console === "object" &&
	                 typeof root.console.info === "function"
	                 ) {
	                 root.console.info("AnimationFrame stack " + Object.keys(this.stack).length);
	                 }
	                 */
	                /**
	                 * Return UID
	                 */
	                return localID;
	            }
	        } catch (e) {}
	        /**
	         * If something goes wrong return false
	         */
	        return false;
	    };
	    /**
	     * Unsubscribe method by ID
	     * @param ID
	     */
	
	
	    AnimationFrame.prototype.unsubscribe = function unsubscribe(ID) {
	        /**
	         * If required method exist in the stack
	         */
	        if (this.stack[ID]) {
	            /**
	             * Nullify method in the stack and destroy it
	             */
	            this.stack[ID] = false;
	            delete this.stack[ID];
	        }
	    };
	    /**
	     * Watch and call methods
	     */
	
	
	    AnimationFrame.prototype.watch = function watch() {
	        try {
	            /**
	             * If stack exist, it is an object and it is contains methods
	             */
	            if (this.stack && _typeof(this.stack) === "object" && Object.keys(this.stack).length > 0) {
	                /**
	                 * Loop all methods in stack
	                 */
	                for (var ID in this.stack) {
	                    /**
	                     * Process only methods without extended properties
	                     */
	                    if (this.stack.hasOwnProperty(ID)) {
	                        try {
	                            /**
	                             * If ID exist and it is a string
	                             */
	                            if (ID && typeof ID === "string") {
	                                /**
	                                 * Get subscribed method params by ID
	                                 */
	                                var objCall = this.stack[ID];
	                                /**
	                                 * If params exist, it is an object, and it is contains call context,
	                                 * callback, and parameters which is array
	                                 */
	                                if (objCall && (typeof objCall === "undefined" ? "undefined" : _typeof(objCall)) === "object" && objCall.context && objCall.callback && objCall.params && _typeof(objCall.context) === "object" && typeof objCall.callback === "function" && Array.isArray(objCall.params)) {
	                                    /**
	                                     * Call subscribed method
	                                     */
	                                    objCall.callback.apply(objCall.context, objCall.params);
	                                }
	                            }
	                        } catch (e) {}
	                    }
	                }
	            }
	        } catch (e) {}
	        /**
	         * Recall watcher
	         */
	        root.requestAnimationFrame(this.watch.bind(this));
	    };
	
	    return AnimationFrame;
	}();
	/**
	 * Create single request animation frame object
	 * @type {AnimationFrame}
	 */
	
	
	root.AnimationFrame = root.AnimationFrame || new AnimationFrame();
	/**
	 * Export single AnimationFrame instance
	 */
	var _AnimationFrame = root.AnimationFrame;
	exports.default = _AnimationFrame;
	
	module.exports = _AnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _Utils = __webpack_require__(8);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * The document cookies storage
	 */
	var Cookies = function () {
	  /**
	   * The constructor should accept a hash to separate the scopes of storage
	   * @param hash {string}
	   */
	  function Cookies(hash) {
	    _classCallCheck(this, Cookies);
	
	    this.hash = hash || location.hostname;
	  }
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	
	
	  Cookies.prototype.isSupported = function isSupported() {
	    return _Utils2.default.Cookie.isSupported();
	  };
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
	
	
	  Cookies.prototype.setItem = function setItem(checkSupport, key, value) {
	    var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	    var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
	    var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
	    var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
	
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Save cookies for 30 days
	         * @type {Date}
	         */
	        var date = new Date();
	        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
	        var exp = date.toUTCString();
	        /**
	         * Encode value for store
	         * @type {string}
	         */
	        value = encodeURIComponent(value);
	        /**
	         * Writing value to the document cookie storage
	         * @type {string}
	         */
	        document.cookie = localKey + "=" + value + (exp ? "; expires=" + exp : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  Cookies.prototype.getItem = function getItem(checkSupport, key) {
	    try {
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
	        var arrCookie = document.cookie.split(";");
	        /**
	         * Iterate through the cookies
	         */
	        for (var _iterator = arrCookie, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;
	
	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }
	
	          var i = _ref;
	
	          /**
	           * Trim and split each cookie by = for key value pare
	           * @type {string[]}
	           */
	          var v = i.trim().split("=", 2);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  Cookies.prototype.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * Set empty overdue value by key
	         */
	        this.setItem(checkSupport, key, "", -1);
	        /**
	         * If all ok return true
	         */
	        return this.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  Cookies.prototype.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var arrCookie = document.cookie.split(";");
	        /**
	         * Iterate through the cookies
	         */
	        for (var _iterator2 = arrCookie, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;
	
	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }
	
	          var i = _ref2;
	
	          /**
	           * Trim and split each cookie by = for key value pare
	           * @type {string[]}
	           */
	          var v = i.trim().split("=", 2);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  Cookies.prototype.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        var arrKeys = this.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator3 = arrKeys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	            var _ref3;
	
	            if (_isArray3) {
	              if (_i3 >= _iterator3.length) break;
	              _ref3 = _iterator3[_i3++];
	            } else {
	              _i3 = _iterator3.next();
	              if (_i3.done) break;
	              _ref3 = _i3.value;
	            }
	
	            var i = _ref3;
	
	            this.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return this.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return Cookies;
	}();
	
	exports.default = Cookies;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _UtilsAnimation = __webpack_require__(9);
	
	var _UtilsAnimation2 = _interopRequireDefault(_UtilsAnimation);
	
	var _UtilsBrowser = __webpack_require__(11);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsCookie = __webpack_require__(12);
	
	var _UtilsCookie2 = _interopRequireDefault(_UtilsCookie);
	
	var _UtilsDocument = __webpack_require__(13);
	
	var _UtilsDocument2 = _interopRequireDefault(_UtilsDocument);
	
	var _UtilsDOM = __webpack_require__(14);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsMouse = __webpack_require__(15);
	
	var _UtilsMouse2 = _interopRequireDefault(_UtilsMouse);
	
	var _UtilsScreen = __webpack_require__(17);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(18);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	var _UtilsUser = __webpack_require__(19);
	
	var _UtilsUser2 = _interopRequireDefault(_UtilsUser);
	
	var _UtilsWindow = __webpack_require__(16);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Global Utils class
	 */
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    /**
	     * @deprecated Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.
	     */
	    Utils.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	            if (typeof console.warn === "function") {
	                console.warn("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
	            } else if (typeof console.log === "function") {
	                console.log("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
	            }
	        }
	        return Utils.DOM.getBoundingClientRect(domNode, domDocument, showForce);
	    };
	
	    /**
	     * @deprecated Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.
	     */
	    Utils.findElementPosition = function findElementPosition(domNode) {
	        var showForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	            if (typeof console.warn === "function") {
	                console.warn("Utils.findElementPosition method was deprecated and soon will be removed. Please use" + " Utils.DOM.findElementPosition method.");
	            } else if (typeof console.log === "function") {
	                console.log("Utils.findElementPosition method was deprecated and soon will be removed. Please use" + " Utils.DOM.findElementPosition method.");
	            }
	        }
	        return Utils.DOM.findElementPosition(domNode, showForce);
	    };
	    /**
	     * Transfer static methods into the object
	     * @param realObject
	     * @param className
	     */
	
	
	    Utils.implementationStaticMethods = function implementationStaticMethods(realObject, className) {
	        var staticClass = realObject.constructor;
	        if (typeof staticClass !== "undefined") {
	            var methods = Object.keys(staticClass);
	            if (methods && methods.length > 0) {
	                var _loop = function _loop() {
	                    if (_isArray) {
	                        if (_i >= _iterator.length) return "break";
	                        _ref = _iterator[_i++];
	                    } else {
	                        _i = _iterator.next();
	                        if (_i.done) return "break";
	                        _ref = _i.value;
	                    }
	
	                    var method = _ref;
	
	                    if (typeof realObject[method] === "undefined") {
	                        realObject[method] = function () {
	                            if (typeof staticClass !== "undefined" && (typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	                                if (typeof console.warn === "function") {
	                                    console.warn("That method was deprecated and soon will be removed. Please use " + (className || staticClass && staticClass.name || "Unknown") + "." + method + " method.");
	                                } else if (typeof console.log === "function") {
	                                    console.log("That method was deprecated and soon will be removed. Please use " + (className || staticClass && staticClass.name || "Unknown") + "." + method + " method.");
	                                }
	                            }
	                            return staticClass[method].apply(staticClass, arguments);
	                        };
	                    }
	                };
	
	                for (var _iterator = methods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                    var _ref;
	
	                    var _ret = _loop();
	
	                    if (_ret === "break") break;
	                }
	            }
	        }
	    };
	    /**
	     * Get call stack trace
	     * @return Array<Object>
	     */
	
	
	    Utils.stack = function stack() {
	        var e = new Error();
	        return e && e.stack && e.stack.split("\n").slice(5).map(function (s) {
	            if (!s) {
	                return {};
	            }
	            var match = /^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                if (match[1]) {
	                    match[1] = /([^\/<]+)/ig.exec(match[1]);
	                    if (match[1]) {
	                        match[1] = match[1][0];
	                    }
	                }
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[5] || "",
	                    file: match[3] || "",
	                    line: match[4] || "",
	                    method: match[1] + ":" + match[2] || ""
	                };
	            }
	            match = /^(.*)@(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[3] || "",
	                    file: match[1] || "",
	                    line: match[2] || "",
	                    method: ""
	                };
	            }
	            return s;
	        }) || [];
	    };
	    /**
	     * Get random ID
	     * @return {string}
	     */
	
	
	    Utils.getUID = function getUID() {
	        return Math.random().toString(36).substring(2);
	    };
	
	    return Utils;
	}();
	
	exports.default = Utils;
	
	Utils.Animation = _UtilsAnimation2.default;
	Utils.Browser = _UtilsBrowser2.default;
	Utils.Cookie = _UtilsCookie2.default;
	Utils.DOM = _UtilsDOM2.default;
	Utils.Document = _UtilsDocument2.default;
	Utils.Mouse = _UtilsMouse2.default;
	Utils.Screen = _UtilsScreen2.default;
	Utils.System = _UtilsSystem2.default;
	Utils.User = _UtilsUser2.default;
	Utils.Window = _UtilsWindow2.default;
	module.exports = Utils;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _UtilsAnimationEasing = __webpack_require__(10);
	
	var _UtilsAnimationEasing2 = _interopRequireDefault(_UtilsAnimationEasing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animation = function Animation() {
	  _classCallCheck(this, Animation);
	};
	
	exports.default = Animation;
	
	Animation.Easing = _UtilsAnimationEasing2.default;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Different time animation functions
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Easing = function () {
	    function Easing() {
	        _classCallCheck(this, Easing);
	    }
	
	    Easing.swing = function swing(t, b, c, d) {
	        return Easing[Easing.def](t, b, c, d);
	    };
	
	    Easing.easeInQuad = function easeInQuad(t, b, c, d) {
	        return c * (t /= d) * t + b;
	    };
	
	    Easing.easeOutQuad = function easeOutQuad(t, b, c, d) {
	        return -c * (t /= d) * (t - 2) + b;
	    };
	
	    Easing.easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t + b;
	        }
	        return -c / 2 * (--t * (t - 2) - 1) + b;
	    };
	
	    Easing.easeInCubic = function easeInCubic(t, b, c, d) {
	        return c * (t /= d) * t * t + b;
	    };
	
	    Easing.easeOutCubic = function easeOutCubic(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    };
	
	    Easing.easeInOutCubic = function easeInOutCubic(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t + b;
	        }
	        return c / 2 * ((t -= 2) * t * t + 2) + b;
	    };
	
	    Easing.easeInQuart = function easeInQuart(t, b, c, d) {
	        return c * (t /= d) * t * t * t + b;
	    };
	
	    Easing.easeOutQuart = function easeOutQuart(t, b, c, d) {
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    };
	
	    Easing.easeInOutQuart = function easeInOutQuart(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t + b;
	        }
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    };
	
	    Easing.easeInQuint = function easeInQuint(t, b, c, d) {
	        return c * (t /= d) * t * t * t * t + b;
	    };
	
	    Easing.easeOutQuint = function easeOutQuint(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    };
	
	    Easing.easeInOutQuint = function easeInOutQuint(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t * t + b;
	        }
	        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    };
	
	    Easing.easeInSine = function easeInSine(t, b, c, d) {
	        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	    };
	
	    Easing.easeOutSine = function easeOutSine(t, b, c, d) {
	        return c * Math.sin(t / d * (Math.PI / 2)) + b;
	    };
	
	    Easing.easeInOutSine = function easeInOutSine(t, b, c, d) {
	        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	    };
	
	    Easing.easeInExpo = function easeInExpo(t, b, c, d) {
	        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	    };
	
	    Easing.easeOutExpo = function easeOutExpo(t, b, c, d) {
	        return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	    };
	
	    Easing.easeInOutExpo = function easeInOutExpo(t, b, c, d) {
	        if (t === 0) {
	            return b;
	        }
	        if (t === d) {
	            return b + c;
	        }
	        if ((t /= d / 2) < 1) {
	            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	        }
	        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	    };
	
	    Easing.easeInCirc = function easeInCirc(t, b, c, d) {
	        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	    };
	
	    Easing.easeOutCirc = function easeOutCirc(t, b, c, d) {
	        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	    };
	
	    Easing.easeInOutCirc = function easeInOutCirc(t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	        }
	        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	    };
	
	    Easing.easeInElastic = function easeInElastic(t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) === 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * .3;
	        }
	        if (a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        } else {
	            s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    };
	
	    Easing.easeOutElastic = function easeOutElastic(t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) === 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * .3;
	        }
	        if (a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        } else {
	            s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	    };
	
	    Easing.easeInOutElastic = function easeInOutElastic(t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d / 2) === 2) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * (.3 * 1.5);
	        }
	        if (a < Math.abs(c)) {
	            a = c;
	            s = p / 4;
	        } else {
	            s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        if (t < 1) {
	            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        }
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	    };
	
	    Easing.easeInBack = function easeInBack(t, b, c, d, s) {
	        if (s === undefined) {
	            s = 1.70158;
	        }
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    };
	
	    Easing.easeOutBack = function easeOutBack(t, b, c, d, s) {
	        if (s === undefined) {
	            s = 1.70158;
	        }
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    };
	
	    Easing.easeInOutBack = function easeInOutBack(t, b, c, d, s) {
	        if (s === undefined) {
	            s = 1.70158;
	        }
	        if ((t /= d / 2) < 1) {
	            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	        }
	        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    };
	
	    Easing.easeInBounce = function easeInBounce(t, b, c, d) {
	        return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
	    };
	
	    Easing.easeOutBounce = function easeOutBounce(t, b, c, d) {
	        if ((t /= d) < 1 / 2.75) {
	            return c * (7.5625 * t * t) + b;
	        } else if (t < 2 / 2.75) {
	            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	        } else if (t < 2.5 / 2.75) {
	            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	        } else {
	            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	        }
	    };
	
	    Easing.easeInOutBounce = function easeInOutBounce(t, b, c, d) {
	        if (t < d / 2) {
	            return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
	        }
	        return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	    };
	
	    return Easing;
	}();
	
	exports.default = Easing;
	
	Easing.def = "easeOutQuad";

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with browser
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Browser = function () {
	    function Browser() {
	        _classCallCheck(this, Browser);
	    }
	
	    /**
	     * Get browser info
	     * @return {{browser: string, mobile: boolean, version: string}}
	     */
	    Browser.getInfo = function getInfo() {
	        return {
	            browser: Browser.getName(),
	            mobile: Browser.isMobile(),
	            version: Browser.getVersion()
	        };
	    };
	    /**
	     * Get browser name
	     * @return {string}
	     */
	
	
	    Browser.getName = function getName() {
	        var browser = void 0;
	        if (Browser.isOpera()) {
	            browser = "Opera";
	        } else if (Browser.isOperaNew()) {
	            browser = "Opera";
	        } else if (Browser.isMSIE()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isMSIENew()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isChrome()) {
	            browser = "Chrome";
	        } else if (Browser.isFirefox()) {
	            browser = "Firefox";
	        } else if (Browser.isSafari()) {
	            browser = "Safari";
	        } else if (Browser.isOther()) {
	            browser = Browser.getOtherName();
	        }
	        return browser;
	    };
	    /**
	     * Get browser version
	     * @return {string}
	     */
	
	
	    Browser.getVersion = function getVersion() {
	        var version = void 0;
	        if (Browser.isOpera()) {
	            version = Browser.getOperaVersion();
	        } else if (Browser.isOperaNew()) {
	            version = Browser.getOperaNewVersion();
	        } else if (Browser.isMSIE()) {
	            version = Browser.getMSIEVersion();
	        } else if (Browser.isMSIENew()) {
	            version = Browser.getMSIENewVersion();
	        } else if (Browser.isChrome()) {
	            version = Browser.getChromeVersion();
	        } else if (Browser.isFirefox()) {
	            version = Browser.getFirefoxVersion();
	        } else if (Browser.isSafari()) {
	            version = Browser.getSafariVersion();
	        } else if (Browser.isOther()) {
	            version = Browser.getOtherVersion();
	        }
	        return version;
	    };
	    /**
	     * Trim browser version
	     * @param version
	     * @return {string}
	     */
	
	
	    Browser.trimVersion = function trimVersion(version) {
	        var chars = [";", " ", ")"];
	        for (var _iterator = chars, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var char = _ref;
	
	            var ix = version.indexOf(char);
	            if (ix !== -1) {
	                version = version.substring(0, ix);
	            }
	        }
	        return version;
	    };
	    /**
	     * Check if it is mobile
	     * @return {boolean}
	     */
	
	
	    Browser.isMobile = function isMobile() {
	        return (/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)
	        );
	    };
	    /**
	     * Check if it is opera browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOpera = function isOpera() {
	        return navigator.userAgent.indexOf("Opera") !== -1;
	    };
	    /**
	     * Get opera browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaVersion = function getOperaVersion() {
	        var verOffset = navigator.userAgent.indexOf("Opera");
	        var version = navigator.userAgent.substring(verOffset + 6);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is opera new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOperaNew = function isOperaNew() {
	        return navigator.userAgent.indexOf("OPR") !== -1;
	    };
	    /**
	     * Get opera new browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaNewVersion = function getOperaNewVersion() {
	        var verOffset = navigator.userAgent.indexOf("OPR");
	        var version = navigator.userAgent.substring(verOffset + 4);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIE = function isMSIE() {
	        return navigator.userAgent.indexOf("MSIE") !== -1;
	    };
	    /**
	     * Get msie browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIEVersion = function getMSIEVersion() {
	        var verOffset = navigator.userAgent.indexOf("MSIE");
	        var version = navigator.userAgent.substring(verOffset + 5);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIENew = function isMSIENew() {
	        return navigator.userAgent.indexOf("Trident/") !== -1;
	    };
	    /**
	     * Get msie new browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIENewVersion = function getMSIENewVersion() {
	        var version = navigator.userAgent.substring(navigator.userAgent.indexOf("rv:") + 3);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is chrome browser
	     * @return {boolean}
	     */
	
	
	    Browser.isChrome = function isChrome() {
	        return navigator.userAgent.indexOf("Chrome") !== -1;
	    };
	    /**
	     * Get chrome browser version
	     * @return {string}
	     */
	
	
	    Browser.getChromeVersion = function getChromeVersion() {
	        var verOffset = navigator.userAgent.indexOf("Chrome");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is safari browser
	     * @return {boolean}
	     */
	
	
	    Browser.isSafari = function isSafari() {
	        return navigator.userAgent.indexOf("Safari") !== -1;
	    };
	    /**
	     * Get safari browser version
	     * @return {string}
	     */
	
	
	    Browser.getSafariVersion = function getSafariVersion() {
	        var verOffset = navigator.userAgent.indexOf("Safari");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is firefox browser
	     * @return {boolean}
	     */
	
	
	    Browser.isFirefox = function isFirefox() {
	        return navigator.userAgent.indexOf("Firefox") !== -1;
	    };
	    /**
	     * Get firefox browser version
	     * @return {string}
	     */
	
	
	    Browser.getFirefoxVersion = function getFirefoxVersion() {
	        var verOffset = navigator.userAgent.indexOf("Firefox");
	        var version = navigator.userAgent.substring(verOffset + 8);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is other browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOther = function isOther() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        return nameOffset < verOffset;
	    };
	    /**
	     * Get other browser name
	     * @return {string}
	     */
	
	
	    Browser.getOtherName = function getOtherName() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var browser = navigator.userAgent.substring(nameOffset, verOffset);
	        if (browser.toLowerCase() === browser.toUpperCase()) {
	            browser = navigator.appName;
	        }
	        return browser;
	    };
	    /**
	     * Get other browser version
	     * @return {string}
	     */
	
	
	    Browser.getOtherVersion = function getOtherVersion() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var version = navigator.userAgent.substring(verOffset + 1);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check browser support
	     * @return {boolean}
	     */
	
	
	    Browser.isSupported = function isSupported() {
	        return !Browser.isMSIE() || parseInt(Browser.getMSIEVersion(), 10) > 8;
	    };
	    /**
	     * Check if it is WebKit browser
	     * @return {boolean}
	     */
	
	
	    Browser.isWebKit = function isWebKit() {
	        return navigator.userAgent.indexOf("AppleWebKit/") !== -1;
	    };
	    /**
	     * Check if it is Gecko browser
	     * @return {boolean}
	     */
	
	
	    Browser.isGecko = function isGecko() {
	        return navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") === -1;
	    };
	    /**
	     * Check if it is Android browser
	     * @return {boolean}
	     */
	
	
	    Browser.isAndroid = function isAndroid() {
	        return navigator.userAgent.indexOf("Android") > -1;
	    };
	    /**
	     * Check if it is Linux browser
	     * @return {boolean}
	     */
	
	
	    Browser.isLinux = function isLinux() {
	        return navigator.userAgent.indexOf("Linux") > -1;
	    };
	    /**
	     * Check if it is iPad browser
	     * @return {boolean}
	     */
	
	
	    Browser.isTabletPC = function isTabletPC() {
	        return navigator.userAgent.indexOf("iPad") > -1;
	    };
	
	    return Browser;
	}();
	
	exports.default = Browser;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with cookie
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cookie = function () {
	  function Cookie() {
	    _classCallCheck(this, Cookie);
	  }
	
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	  Cookie.isSupported = function isSupported() {
	    return (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && typeof document.cookie === "string";
	  };
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
	
	
	  Cookie.setItem = function setItem(checkSupport, key, value) {
	    var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	    var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
	    var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
	    var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
	
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * Save cookies for 30 days
	         * @type {Date}
	         */
	        var date = new Date();
	        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
	        var exp = date.toUTCString();
	        /**
	         * Encode value for store
	         * @type {string}
	         */
	        value = encodeURIComponent(value);
	        /**
	         * Writing value to the document cookie storage
	         * @type {string}
	         */
	        document.cookie = key + "=" + value + (exp ? "; expires=" + exp : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	        /**
	         * If all ok return true
	         */
	        return Cookie.getItem(checkSupport, key) === value;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  Cookie.getItem = function getItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var arrCookie = document.cookie.split(";");
	        /**
	         * Iterate through the cookies
	         */
	        for (var _iterator = arrCookie, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;
	
	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }
	
	          var i = _ref;
	
	          /**
	           * Trim and split each cookie by = for key value pare
	           * @type {string[]}
	           */
	          var v = i.trim().split("=", 2);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  Cookie.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * Set empty overdue value by key
	         */
	        Cookie.setItem(checkSupport, key, "", -1);
	        /**
	         * If all ok return true
	         */
	        return Cookie.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  Cookie.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var arrCookie = document.cookie.split(";");
	        /**
	         * Iterate through the cookies
	         */
	        for (var _iterator2 = arrCookie, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;
	
	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }
	
	          var i = _ref2;
	
	          /**
	           * Trim and split each cookie by = for key value pare
	           * @type {string[]}
	           */
	          var v = i.trim().split("=", 2);
	          /**
	           * Add key to the list
	           */
	          arrKeys.push(v[0]);
	        }
	        return arrKeys;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return [];
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  Cookie.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || Cookie.isSupported()) {
	        var arrKeys = Cookie.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator3 = arrKeys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	            var _ref3;
	
	            if (_isArray3) {
	              if (_i3 >= _iterator3.length) break;
	              _ref3 = _iterator3[_i3++];
	            } else {
	              _i3 = _iterator3.next();
	              if (_i3.done) break;
	              _ref3 = _i3.value;
	            }
	
	            var i = _ref3;
	
	            Cookie.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return Cookie.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return Cookie;
	}();
	
	exports.default = Cookie;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with document
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Document = function () {
	    function Document() {
	        _classCallCheck(this, Document);
	    }
	
	    /**
	     * Get document height
	     * @returns {number}
	     */
	    Document.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return Math.max(objWindow.document.body.scrollHeight, objWindow.document.documentElement.scrollHeight, objWindow.document.body.offsetHeight, objWindow.document.documentElement.offsetHeight, objWindow.document.body.clientHeight, objWindow.document.documentElement.clientHeight);
	    };
	    /**
	     * Get document width
	     * @returns {number}
	     */
	
	
	    Document.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return Math.max(objWindow.document.body.scrollWidth, objWindow.document.documentElement.scrollWidth, objWindow.document.body.offsetWidth, objWindow.document.documentElement.offsetWidth, objWindow.document.body.clientWidth, objWindow.document.documentElement.clientWidth);
	    };
	    /**
	     * Get document top scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollTop = function getScrollTop() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return objWindow.pageYOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollTop || objWindow.document.body && objWindow.document.body.scrollTop;
	    };
	    /**
	     * Get document left scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollLeft = function getScrollLeft() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return objWindow.pageXOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollLeft || objWindow.document.body && objWindow.document.body.scrollLeft;
	    };
	    /**
	     * Get document scrolls
	     * @param objWindow
	     * @return {{left: number, top: number}}
	     */
	
	
	    Document.getScroll = function getScroll() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return {
	            left: Document.getScrollLeft(objWindow),
	            top: Document.getScrollTop(objWindow)
	        };
	    };
	
	    return Document;
	}();
	
	exports.default = Document;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with DOM
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOM = function () {
	    function DOM() {
	        _classCallCheck(this, DOM);
	    }
	
	    /**
	     * Get element sizes and position
	     * @param domNode
	     * @param domDocument
	     * @param showForce
	     * @return {{bottom: number, height: number, left: number, right: number, top: number, width: number}}
	     */
	    DOM.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        if (typeof domNode === "string") {
	            domNode = domDocument.getElementById(domNode);
	        }
	        var styles = void 0;
	        if (showForce) {
	            styles = getComputedStyle(domNode);
	            if (styles && styles.display === "none") {
	                domNode.style.display = "block";
	            }
	        }
	        var objRet = {
	            bottom: 0,
	            height: 0,
	            left: 0,
	            right: 0,
	            top: 0,
	            width: 0
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
	                    width: objRet.width || domNode.clientWidth
	                };
	            } else {
	                /**
	                 * Write the element in a temporary variable
	                 */
	                var domElement = domNode;
	                /**
	                 * Calculated basic parameters of the element
	                 * @type {Object}
	                 */
	                var objCoordinates = {
	                    height: domElement.offsetHeight,
	                    width: domElement.offsetWidth,
	                    x: 0,
	                    y: 0
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
	                    width: objCoordinates.width
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
	    DOM.findElementPosition = function findElementPosition(domNode) {
	        var showForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        var left = 0;
	        var top = 0;
	        while (domNode) {
	            var styles = void 0;
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
	            top: top,
	            left: left
	        };
	    };
	    /**
	     * Add event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.addEvent = function addEvent(obj, name, func) {
	        if (obj.addEventListener) {
	            obj.addEventListener(name, func, false);
	        } else if (obj.attachEvent) {
	            obj.attachEvent("on" + name, func);
	        }
	    };
	    /**
	     * Remove event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.removeEvent = function removeEvent(obj, name, func) {
	        if (obj.removeEventListener) {
	            obj.removeEventListener(name, func, false);
	        } else if (obj.detachEvent) {
	            obj.detachEvent("on" + name, func);
	        }
	    };
	    /**
	     * Check if element has class name
	     * @param element
	     * @param className
	     * @return {boolean}
	     */
	
	
	    DOM.hasClassName = function hasClassName(element, className) {
	        return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
	    };
	    /**
	     * Add class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.addClassName = function addClassName(element, className) {
	        if (!DOM.hasClassName(element, className)) {
	            var cl = element.className;
	            element.className = cl ? cl + " " + className : className;
	        }
	        return element;
	    };
	    /**
	     * Remove class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.removeClassName = function removeClassName(element, className) {
	        var classes = element.className.split(" ");
	        for (var i = classes.length - 1; i >= 0; i--) {
	            if (classes[i] === className) {
	                classes.splice(i, 1);
	            }
	        }
	        element.className = classes.join(" ");
	        return element;
	    };
	    /**
	     * Toggle class name
	     * @param element
	     * @param className
	     * @param toggle
	     * @return {HTMLElement}
	     */
	
	
	    DOM.toggleClassName = function toggleClassName(element, className, toggle) {
	        if (toggle) {
	            DOM.addClassName(element, className);
	        } else {
	            DOM.removeClassName(element, className);
	        }
	        return element;
	    };
	    /**
	     * Replace class name
	     * @param element
	     * @param oldClassName
	     * @param newClassName
	     * @return {HTMLElement}
	     */
	
	
	    DOM.replaceClass = function replaceClass(element, oldClassName, newClassName) {
	        DOM.removeClassName(element, oldClassName);
	        DOM.addClassName(element, newClassName);
	        return element;
	    };
	    /**
	     * Get element by tag name and index
	     * @param tn
	     * @param context
	     * @param index
	     * @return {Node}
	     */
	
	
	    DOM.getElementByTagName = function getElementByTagName(tn, context, index) {
	        var cont = context || document;
	        var els = cont.getElementsByTagName(tn);
	        if (null == index || isNaN(index)) {
	            return undefined;
	        } else {
	            return els[index];
	        }
	    };
	    /**
	     * Get line height
	     * @return {number}
	     */
	
	
	    DOM.getLineHeight = function getLineHeight() {
	        var styles = getComputedStyle(document.body);
	        var lineHeight = styles.lineHeight;
	        var lineHeightDig = parseInt(lineHeight, 10);
	        var fontSize = styles.fontSize;
	        var fontSizeDig = parseInt(fontSize, 10);
	        if (isFinite(lineHeightDig)) {
	            return lineHeightDig;
	        } else {
	            return fontSizeDig;
	        }
	    };
	
	    return DOM;
	}();
	
	exports.default = DOM;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import additional classes
	 */
	
	exports.__esModule = true;
	
	var _UtilsDOM = __webpack_require__(14);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsWindow = __webpack_require__(16);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mouse = function () {
	    function Mouse() {
	        _classCallCheck(this, Mouse);
	    }
	
	    /**
	     * Normalise mouse delta
	     * @param e
	     * @return {any}
	     */
	    Mouse.getWheelDelta = function getWheelDelta(e) {
	        var delta = void 0;
	        var deltaX = void 0;
	        var deltaY = void 0;
	        // Old school scrollwheel delta
	        if ("detail" in e) {
	            deltaY = e.detail * -1;
	        }
	        if ("wheelDelta" in e) {
	            deltaY = e.wheelDelta;
	        }
	        if ("wheelDeltaY" in e) {
	            deltaY = e.wheelDeltaY;
	        }
	        if ("wheelDeltaX" in e) {
	            deltaX = e.wheelDeltaX * -1;
	        }
	        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	        if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
	            deltaX = deltaY * -1;
	            deltaY = 0;
	        }
	        // New school wheel delta (wheel event)
	        if ("deltaY" in e) {
	            deltaY = e.deltaY * -1;
	        }
	        if ("deltaX" in e) {
	            deltaX = e.deltaX;
	        }
	        // Need to convert lines and pages to pixels if we aren"t already in pixels
	        // There are three delta modes:
	        //   * deltaMode 0 is by pixels, nothing to do
	        //   * deltaMode 1 is by lines
	        //   * deltaMode 2 is by pages
	        if (e.deltaMode === 1) {
	            var lineHeight = _UtilsDOM2.default.getLineHeight();
	            deltaY = deltaY * lineHeight;
	            deltaX = deltaX * lineHeight;
	        } else if (e.deltaMode === 2) {
	            var windowhegiht = _UtilsWindow2.default.getHeight();
	            deltaY = deltaY * windowhegiht;
	            deltaX = deltaX * windowhegiht;
	        }
	        delta = deltaY === 0 ? deltaX : deltaY;
	        return delta;
	    };
	
	    return Mouse;
	}();
	
	exports.default = Mouse;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with window
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Window = function () {
	    function Window() {
	        _classCallCheck(this, Window);
	    }
	
	    /**
	     * Get window height
	     * @returns {number}
	     */
	    Window.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	    };
	    /**
	     * Get window width
	     * @returns {number}
	     */
	
	
	    Window.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    };
	    /**
	     * Get window sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Window.getSizes = function getSizes() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return {
	            height: Window.getHeight(objWindow),
	            width: Window.getWidth(objWindow)
	        };
	    };
	
	    return Window;
	}();
	
	exports.default = Window;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with screen
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Screen = function () {
	    function Screen() {
	        _classCallCheck(this, Screen);
	    }
	
	    /**
	     * Get screen info
	     * @return {{availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}}
	     */
	    Screen.getInfo = function getInfo() {
	        return {
	            availableSize: Screen.getAvailableSizes(),
	            colorDepth: Screen.getColorDepth(),
	            pixelRatio: Screen.getPixelRatio(),
	            size: Screen.getSizes()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getHeight = function getHeight() {
	        return screen.height;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getWidth = function getWidth() {
	        return screen.width;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getSizes = function getSizes() {
	        return {
	            height: Screen.getHeight(),
	            width: Screen.getWidth()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableHeight = function getAvailableHeight() {
	        return screen.availHeight;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableWidth = function getAvailableWidth() {
	        return screen.availWidth;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getAvailableSizes = function getAvailableSizes() {
	        return {
	            height: Screen.getAvailableHeight(),
	            width: Screen.getAvailableWidth()
	        };
	    };
	    /**
	     * Get screen pixel ratio
	     * @return {number}
	     */
	
	
	    Screen.getPixelRatio = function getPixelRatio() {
	        var ratio = 1;
	        if (typeof window.screen.systemXDPI !== "undefined" && typeof window.screen.logicalXDPI !== "undefined" && window.screen.systemXDPI > window.screen.logicalXDPI) {
	            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
	        } else if (typeof window.devicePixelRatio !== "undefined") {
	            ratio = window.devicePixelRatio;
	        }
	        return ratio;
	    };
	    /**
	     * Get screen color depth
	     * @return {number}
	     */
	
	
	    Screen.getColorDepth = function getColorDepth() {
	        return screen.colorDepth;
	    };
	
	    return Screen;
	}();
	
	exports.default = Screen;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with system
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var System = function () {
	    function System() {
	        _classCallCheck(this, System);
	    }
	
	    /**
	     * Get system info
	     * @return {{name: string, version: string}}
	     */
	    System.getInfo = function getInfo() {
	        return {
	            name: System.getName(),
	            version: System.getVersion()
	        };
	    };
	    /**
	     * Get OS name
	     * @return {string}
	     */
	
	
	    System.getName = function getName() {
	        var os = "";
	        var clientStrings = [{
	            r: /(Windows 10.0|Windows NT 10.0)/,
	            s: "Windows 10"
	        }, {
	            r: /(Windows 8.1|Windows NT 6.3)/,
	            s: "Windows 8.1"
	        }, {
	            r: /(Windows 8|Windows NT 6.2)/,
	            s: "Windows 8"
	        }, {
	            r: /(Windows 7|Windows NT 6.1)/,
	            s: "Windows 7"
	        }, {
	            r: /Windows NT 6.0/,
	            s: "Windows Vista"
	        }, {
	            r: /Windows NT 5.2/,
	            s: "Windows Server 2003"
	        }, {
	            r: /(Windows NT 5.1|Windows XP)/,
	            s: "Windows XP"
	        }, {
	            r: /(Windows NT 5.0|Windows 2000)/,
	            s: "Windows 2000"
	        }, {
	            r: /(Win 9x 4.90|Windows ME)/,
	            s: "Windows ME"
	        }, {
	            r: /(Windows 98|Win98)/,
	            s: "Windows 98"
	        }, {
	            r: /(Windows 95|Win95|Windows_95)/,
	            s: "Windows 95"
	        }, {
	            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
	            s: "Windows NT 4.0"
	        }, {
	            r: /Windows CE/,
	            s: "Windows CE"
	        }, {
	            r: /Win16/,
	            s: "Windows 3.11"
	        }, {
	            r: /Android/,
	            s: "Android"
	        }, {
	            r: /OpenBSD/,
	            s: "Open BSD"
	        }, {
	            r: /SunOS/,
	            s: "Sun OS"
	        }, {
	            r: /(Linux|X11)/,
	            s: "Linux"
	        }, {
	            r: /(iPhone|iPad|iPod)/,
	            s: "iOS"
	        }, {
	            r: /Mac OS X/,
	            s: "Mac OS X"
	        }, {
	            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
	            s: "Mac OS"
	        }, {
	            r: /QNX/,
	            s: "QNX"
	        }, {
	            r: /UNIX/,
	            s: "UNIX"
	        }, {
	            r: /BeOS/,
	            s: "BeOS"
	        }, {
	            r: /OS\/2/,
	            s: "OS/2"
	        }, {
	            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
	            s: "Search Bot"
	        }];
	        for (var _iterator = clientStrings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var cs = _ref;
	
	            if (cs.r.test(navigator.userAgent)) {
	                os = cs.s;
	                break;
	            }
	        }
	        return os;
	    };
	    /**
	     * Get OS version
	     * @return {string}
	     */
	
	
	    System.getVersion = function getVersion() {
	        var os = System.getName();
	        var osVersion = "";
	        if (/Windows/.test(os)) {
	            osVersion = /Windows (.*)/.exec(os)[1];
	            os = "Windows";
	        }
	        switch (os) {
	            case "Mac OS X":
	                osVersion = /Mac OS X (10[._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "Android":
	                osVersion = /Android ([._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "iOS":
	                var reg = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
	                osVersion = reg[1] + "." + reg[2] + "." + (reg[3] || 0);
	                break;
	            default:
	        }
	        return osVersion;
	    };
	
	    return System;
	}();
	
	exports.default = System;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Class for working with user
	 */
	
	exports.__esModule = true;
	
	var _UtilsBrowser = __webpack_require__(11);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsScreen = __webpack_require__(17);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(18);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var User = function () {
	    function User() {
	        _classCallCheck(this, User);
	    }
	
	    /**
	     * Get user info
	     * @return {{browser: {browser: string, mobile: boolean, version: string}, screen: {availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}, system: {name: string, version: string}}}
	     */
	    User.getInfo = function getInfo() {
	        return {
	            browser: _UtilsBrowser2.default.getInfo(),
	            screen: _UtilsScreen2.default.getInfo(),
	            system: _UtilsSystem2.default.getInfo()
	        };
	    };
	
	    return User;
	}();
	
	exports.default = User;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * The DOMStorage
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DOMStorage = function () {
	  /**
	   * The constructor should accept a hash to separate the scopes of storage
	   * @param hash {string}
	   */
	  function DOMStorage(hash) {
	    _classCallCheck(this, DOMStorage);
	
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
	
	
	  DOMStorage.prototype.isSupported = function isSupported() {
	    return _typeof(this.domStorage) === "object" && _typeof(this.domStorage.parentNode) === "object" && typeof this.domStorage.addBehavior !== "undefined";
	  };
	  /**
	   * The method sets the value and returns true if it has been set
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @param value {string}
	   * @return {boolean}
	   */
	
	
	  DOMStorage.prototype.setItem = function setItem(checkSupport, key, value) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  DOMStorage.prototype.getItem = function getItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Get value
	         */
	        this.domStorage.load(this.hash);
	        var value = this.domStorage.getAttribute(localKey);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  DOMStorage.prototype.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Clean value and remove
	         * @type {boolean}
	         */
	        this.domStorage.removeAttribute(localKey);
	        this.domStorage.save(this.hash);
	        /**
	         * If all ok return true
	         */
	        return this.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  DOMStorage.prototype.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var localArrKeys = this.domStorage.XMLDocument.documentElement.attributes;
	        /**
	         * Iterate through the globalStorage
	         */
	        for (var i = 0; i < localArrKeys.length; i++) {
	          var key = localArrKeys[i].name;
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  DOMStorage.prototype.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        var arrKeys = this.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator = arrKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }
	
	            var i = _ref;
	
	            this.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return this.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return DOMStorage;
	}();
	
	exports.default = DOMStorage;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * The GlobalStorage
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GlobalStorage = function () {
	  /**
	   * The constructor should accept a hash to separate the scopes of storage
	   * @param hash {string}
	   */
	  function GlobalStorage(hash) {
	    _classCallCheck(this, GlobalStorage);
	
	    this.hash = hash || location.hostname;
	    if (!window.globalStorage) {
	      window.globalStorage = {};
	    }
	    if (!window.globalStorage[document.domain]) {
	      window.globalStorage[document.domain] = {};
	    }
	    this.globalStorage = window.globalStorage[document.domain];
	  }
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	
	
	  GlobalStorage.prototype.isSupported = function isSupported() {
	    return _typeof(this.globalStorage) === "object";
	  };
	  /**
	   * The method sets the value and returns true if it has been set
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @param value {string}
	   * @return {boolean}
	   */
	
	
	  GlobalStorage.prototype.setItem = function setItem(checkSupport, key, value) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Set value
	         * @type {string}
	         */
	        this.globalStorage[localKey] = value;
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  GlobalStorage.prototype.getItem = function getItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Get value
	         */
	        var value = this.globalStorage[localKey];
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  GlobalStorage.prototype.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Clean value and remove
	         * @type {boolean}
	         */
	        this.globalStorage[localKey] = false;
	        delete this.globalStorage[localKey];
	        /**
	         * If all ok return true
	         */
	        return this.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  GlobalStorage.prototype.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Get the array from document cookie split by ;
	         * @type {string[]}
	         */
	        var localArrKeys = Object.keys(this.globalStorage);
	        /**
	         * Iterate through the globalStorage
	         */
	        for (var _iterator = localArrKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;
	
	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }
	
	          var key = _ref;
	
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  GlobalStorage.prototype.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        var arrKeys = this.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator2 = arrKeys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	            var _ref2;
	
	            if (_isArray2) {
	              if (_i2 >= _iterator2.length) break;
	              _ref2 = _iterator2[_i2++];
	            } else {
	              _i2 = _iterator2.next();
	              if (_i2.done) break;
	              _ref2 = _i2.value;
	            }
	
	            var i = _ref2;
	
	            this.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return this.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return GlobalStorage;
	}();
	
	exports.default = GlobalStorage;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * The LocalStorage
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocalStorage = function () {
	  /**
	   * The constructor should accept a hash to separate the scopes of storage
	   * @param hash {string}
	   */
	  function LocalStorage(hash) {
	    _classCallCheck(this, LocalStorage);
	
	    this.hash = hash || location.hostname;
	  }
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	
	
	  LocalStorage.prototype.isSupported = function isSupported() {
	    return typeof window.localStorage !== "undefined";
	  };
	  /**
	   * The method sets the value and returns true if it has been set
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @param value {string}
	   * @return {boolean}
	   */
	
	
	  LocalStorage.prototype.setItem = function setItem(checkSupport, key, value) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Set value
	         * @type {string}
	         */
	        window.localStorage.setItem(localKey, value);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  LocalStorage.prototype.getItem = function getItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Get value
	         */
	        var value = window.localStorage.getItem(localKey);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  LocalStorage.prototype.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Clean value and remove
	         * @type {boolean}
	         */
	        window.localStorage.removeItem(localKey);
	        /**
	         * If all ok return true
	         */
	        return this.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  LocalStorage.prototype.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Iterate through the localStorage
	         */
	        for (var i = 0; i < window.localStorage.length; i++) {
	          if (window.localStorage.key(i).indexOf(this.hash) === 0) {
	            arrKeys.push(window.localStorage.key(i).substr(this.hash.length + 1));
	          }
	        }
	        /**
	         * Return keys
	         */
	        return arrKeys;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return [];
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  LocalStorage.prototype.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        var arrKeys = this.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator = arrKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }
	
	            var i = _ref;
	
	            this.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return this.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return LocalStorage;
	}();
	
	exports.default = LocalStorage;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * The SessionStorage
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SessionStorage = function () {
	  /**
	   * The constructor should accept a hash to separate the scopes of storage
	   * @param hash {string}
	   */
	  function SessionStorage(hash) {
	    _classCallCheck(this, SessionStorage);
	
	    this.hash = hash || location.hostname;
	  }
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	
	
	  SessionStorage.prototype.isSupported = function isSupported() {
	    return typeof window.sessionStorage !== "undefined";
	  };
	  /**
	   * The method sets the value and returns true if it has been set
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @param value {string}
	   * @return {boolean}
	   */
	
	
	  SessionStorage.prototype.setItem = function setItem(checkSupport, key, value) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Set value
	         * @type {string}
	         */
	        window.sessionStorage.setItem(localKey, value);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  SessionStorage.prototype.getItem = function getItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Get value
	         */
	        var value = window.sessionStorage.getItem(localKey);
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
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  SessionStorage.prototype.removeItem = function removeItem(checkSupport, key) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The hash needs for splitting scopes storage
	         * @type {string}
	         */
	        var localKey = this.hash + "_" + key;
	        /**
	         * Clean value and remove
	         * @type {boolean}
	         */
	        window.sessionStorage.removeItem(localKey);
	        /**
	         * If all ok return true
	         */
	        return this.getItem(checkSupport, key) === false;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return false;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  SessionStorage.prototype.getKeys = function getKeys(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        /**
	         * The array of available keys
	         * @type {Array}
	         */
	        var arrKeys = [];
	        /**
	         * Iterate through the SessionStorage
	         */
	        for (var i = 0; i < window.sessionStorage.length; i++) {
	          if (window.sessionStorage.key(i).indexOf(this.hash) === 0) {
	            arrKeys.push(window.sessionStorage.key(i).substr(this.hash.length + 1));
	          }
	        }
	        /**
	         * Return keys
	         */
	        return arrKeys;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return [];
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return [];
	    }
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  SessionStorage.prototype.clear = function clear(checkSupport) {
	    try {
	      /**
	       * If that store is supported
	       */
	      if (!checkSupport || this.isSupported()) {
	        var arrKeys = this.getKeys(checkSupport);
	        if (arrKeys) {
	          for (var _iterator = arrKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }
	
	            var i = _ref;
	
	            this.removeItem(checkSupport, i);
	          }
	        }
	        /**
	         * If all ok return true
	         */
	        return this.getKeys(checkSupport).length === 0;
	      } else {
	        /**
	         * If cookie does not supported return false
	         */
	        return true;
	      }
	    } catch (e) {
	      /**
	       * If something goes wrong return false
	       */
	      return false;
	    }
	  };
	
	  return SessionStorage;
	}();
	
	exports.default = SessionStorage;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NGE2MzFkZGE2NWQ5Y2QyOGVkOT9kNjllKiIsIndlYnBhY2s6Ly8vLi9saWIvRXZlckNvb2tpZS50cz8wMDljIiwid2VicGFjazovLy8uL34vQW5pbWF0aW9uRnJhbWUvbGliL0FuaW1hdGlvbkZyYW1lLnRzP2ZlN2IiLCJ3ZWJwYWNrOi8vLy4vbGliL1N0b3JhZ2VzL0Nvb2tpZXMudHM/MDI0OSIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlscy50cz9jNWMxIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzQW5pbWF0aW9uLnRzPzkzZGUiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNBbmltYXRpb25FYXNpbmcudHM/NTU1ZSIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHM/NjE5YiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0Nvb2tpZS50cz9lMzQwIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzRG9jdW1lbnQudHM/NDc4NCIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0RPTS50cz8zMTgxIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzTW91c2UudHM/NmFjYSIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc1dpbmRvdy50cz82MTM0Iiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzU2NyZWVuLnRzP2VhYjEiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNTeXN0ZW0udHM/ZDAxZiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc1VzZXIudHM/NDI2ZCIsIndlYnBhY2s6Ly8vLi9saWIvU3RvcmFnZXMvRE9NU3RvcmFnZS50cz8xMmFjIiwid2VicGFjazovLy8uL2xpYi9TdG9yYWdlcy9HbG9iYWxTdG9yYWdlLnRzP2EzYzQiLCJ3ZWJwYWNrOi8vLy4vbGliL1N0b3JhZ2VzL0xvY2FsU3RvcmFnZS50cz82YTI2Iiwid2VicGFjazovLy8uL2xpYi9TdG9yYWdlcy9TZXNzaW9uU3RvcmFnZS50cz82YzkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFO0FBQ3ZKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjs7O0FBR0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUEsNEI7Ozs7OztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNU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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsNEI7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsa0NBQWtDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCLGdCQUFlO0FBQ2Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1SkFBc0o7QUFDdEo7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRCxrQyIsImZpbGUiOiIuL2xpYi9FdmVyQ29va2llLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJFdmVyQ29va2llXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkV2ZXJDb29raWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRXZlckNvb2tpZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NGE2MzFkZGE2NWQ5Y2QyOGVkOSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX0FuaW1hdGlvbkZyYW1lID0gcmVxdWlyZShcIkFuaW1hdGlvbkZyYW1lXCIpO1xuXG52YXIgX0FuaW1hdGlvbkZyYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FuaW1hdGlvbkZyYW1lKTtcblxudmFyIF9Db29raWVzID0gcmVxdWlyZShcIi4vU3RvcmFnZXMvQ29va2llc1wiKTtcblxudmFyIF9Db29raWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Nvb2tpZXMpO1xuXG52YXIgX0RPTVN0b3JhZ2UgPSByZXF1aXJlKFwiLi9TdG9yYWdlcy9ET01TdG9yYWdlXCIpO1xuXG52YXIgX0RPTVN0b3JhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRE9NU3RvcmFnZSk7XG5cbnZhciBfR2xvYmFsU3RvcmFnZSA9IHJlcXVpcmUoXCIuL1N0b3JhZ2VzL0dsb2JhbFN0b3JhZ2VcIik7XG5cbnZhciBfR2xvYmFsU3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HbG9iYWxTdG9yYWdlKTtcblxudmFyIF9Mb2NhbFN0b3JhZ2UgPSByZXF1aXJlKFwiLi9TdG9yYWdlcy9Mb2NhbFN0b3JhZ2VcIik7XG5cbnZhciBfTG9jYWxTdG9yYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0xvY2FsU3RvcmFnZSk7XG5cbnZhciBfU2Vzc2lvblN0b3JhZ2UgPSByZXF1aXJlKFwiLi9TdG9yYWdlcy9TZXNzaW9uU3RvcmFnZVwiKTtcblxudmFyIF9TZXNzaW9uU3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZXNzaW9uU3RvcmFnZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG4vKipcbiAqIEltcG9ydCBzdG9yYWdlc1xuICovXG5cblxuLyoqXG4gKiBFdmVyQ29va2llIHN0b3JhZ2VcbiAqL1xudmFyIEV2ZXJDb29raWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3Igc2hvdWxkIGFjY2VwdCBhIGhhc2ggdG8gc2VwYXJhdGUgdGhlIHNjb3BlcyBvZiBzdG9yYWdlXG4gICAqIEBwYXJhbSBoYXNoIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBFdmVyQ29va2llKGhhc2gpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlckNvb2tpZSk7XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBoYXNoXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmhhc2ggPSBoYXNoIHx8IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpc2Ugc3RvcmVzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMuc3RvcmVzID0gW107XG4gICAgaWYgKHR5cGVvZiBfQ29va2llczIuZGVmYXVsdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zdG9yZXMucHVzaChuZXcgX0Nvb2tpZXMyLmRlZmF1bHQodGhpcy5oYXNoKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX0dsb2JhbFN0b3JhZ2UyLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3RvcmVzLnB1c2gobmV3IF9HbG9iYWxTdG9yYWdlMi5kZWZhdWx0KHRoaXMuaGFzaCkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9Mb2NhbFN0b3JhZ2UyLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3RvcmVzLnB1c2gobmV3IF9Mb2NhbFN0b3JhZ2UyLmRlZmF1bHQodGhpcy5oYXNoKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX1Nlc3Npb25TdG9yYWdlMi5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnN0b3Jlcy5wdXNoKG5ldyBfU2Vzc2lvblN0b3JhZ2UyLmRlZmF1bHQodGhpcy5oYXNoKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX0RPTVN0b3JhZ2UyLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3RvcmVzLnB1c2gobmV3IF9ET01TdG9yYWdlMi5kZWZhdWx0KHRoaXMuaGFzaCkpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RvcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuc3RvcmVzW2ldLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdGhpcy5zdG9yZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgc2VsZiByZWZyZXNoIGZsYWdcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU2VsZiByZWZyZXNoXG4gICAgICovXG4gICAgaWYgKHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgdGhpcy5yZWZyZXNoSUQgPSBfQW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQuc3Vic2NyaWJlKHRoaXMsIHRoaXMucmVmcmVzaCwgW10pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlcyAmJiB0aGlzLnN0b3Jlcy5sZW5ndGggPiAwO1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgdmFsdWUpIHtcbiAgICAvKipcbiAgICAgKiBTZXQgcmVzdWx0IGZsYWcgYXMgdHJ1ZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhciBib29SZXN1bHQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFN0b3Agc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWxpc2Ugc3RvcmUgcmVzdWx0IGFycmF5XG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhclJlc3VsdHMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCBhbGwgc3VwcG9ydGVkIHN0b3Jlc1xuICAgICAgICAgKi9cbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5zdG9yZXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogV3JpdGUgc3RvcmUgb3BlcmF0aW9uIHJlc3VsdCB0byByZXN1bHQgYXJyYXlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBhclJlc3VsdHMucHVzaChzdG9yZS5zZXRJdGVtKGZhbHNlLCBrZXksIHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoZXJlIGV4aXN0IHJlc3VsdCBhbmQgb25lIG9mIHRoZW0gaXMgdHJ1ZSwgaXQgaXMgbWVhbnMsIHRoYXQgdmFsdWUgd2FzIHNldFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGJvb1Jlc3VsdCA9IGFyUmVzdWx0cy5sZW5ndGggPiAwICYmIGFyUmVzdWx0cy5pbmRleE9mKHRydWUpICE9PSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzdG9yZXMgZG9lcyBub3Qgc3VwcG9ydGVkLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZywgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgKi9cbiAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCBzZWxmIHJlZnJlc2ggcHJvY2Vzc1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuc3RvcFJlZnJlc2ggPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gc2V0IGl0ZW0gc3RhdHVzXG4gICAgICovXG4gICAgcmV0dXJuIGJvb1Jlc3VsdDtcbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVhZHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIGl0IG9yIHJldHVybnMgZmFsc2UgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICAgKi9cblxuXG4gIEV2ZXJDb29raWUucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSB7XG4gICAgLyoqXG4gICAgICogU2V0IHJlc3VsdCBmbGFnIGFzIHRydWVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICovXG4gICAgdmFyIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFN0b3Agc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWxpc2UgdGVtcG9yYXJ5IHN0b3JlIHJlc3VsdCBhcnJheVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbG9jYWxBcnJSZXN1bHRzID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLnN0b3JlcywgX2lzQXJyYXkyID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IyKSwgX2kyID0gMCwgX2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5Mikge1xuICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTIgPSBfaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmMjtcblxuICAgICAgICAgIHZhciB2YWx1ZSA9IHN0b3JlLmdldEl0ZW0oZmFsc2UsIGtleSk7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgc3RvcmUgaGFzIHRoaXMgdmFsdWVcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV3JpdGUgc3RvcmUgb3BlcmF0aW9uIHJlc3VsdCB0byByZXN1bHQgYXJyYXlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbG9jYWxBcnJSZXN1bHRzLnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbGlzZSBzdG9yZSByZXN1bHQgYXJyYXlcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhclJlc3VsdHMgPSB7fTtcbiAgICAgICAgdmFyIG51bU1heCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb29raW5nIGZvciB0aGUgbW9zdCBmcmVxdWVudGx5IG1lbnRpb25lZCByZXN1bHRcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBsb2NhbEFyclJlc3VsdHMsIF9pc0FycmF5MyA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMyksIF9pMyA9IDAsIF9pdGVyYXRvcjMgPSBfaXNBcnJheTMgPyBfaXRlcmF0b3IzIDogX2l0ZXJhdG9yM1tTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgIHZhciBfcmVmMztcblxuICAgICAgICAgIGlmIChfaXNBcnJheTMpIHtcbiAgICAgICAgICAgIGlmIChfaTMgPj0gX2l0ZXJhdG9yMy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2kzID0gX2l0ZXJhdG9yMy5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjMgPSBfaTMudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgIGlmICghYXJSZXN1bHRzW2ldKSB7XG4gICAgICAgICAgICBhclJlc3VsdHNbaV0gPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhclJlc3VsdHNbaV0rKztcbiAgICAgICAgICBpZiAoYXJSZXN1bHRzW2ldID4gbnVtTWF4KSB7XG4gICAgICAgICAgICBudW1NYXggPSBhclJlc3VsdHNbaV07XG4gICAgICAgICAgICBib29SZXN1bHQgPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHN0b3JlcyBkb2VzIG5vdCBzdXBwb3J0ZWQsIHZhbHVlIGNhbiBiZSBzZXRcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBib29SZXN1bHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAqL1xuICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFJldHVybiBzZXQgaXRlbSBzdGF0dXNcbiAgICAgKi9cbiAgICByZXR1cm4gYm9vUmVzdWx0O1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgRXZlckNvb2tpZS5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICAvKipcbiAgICAgKiBTZXQgcmVzdWx0IGZsYWcgYXMgdHJ1ZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhciBib29SZXN1bHQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFN0b3Agc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWxpc2Ugc3RvcmUgcmVzdWx0IGNvdW50ZXJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhclJlc3VsdCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSB0aGlzLnN0b3JlcywgX2lzQXJyYXk0ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3I0KSwgX2k0ID0gMCwgX2l0ZXJhdG9yNCA9IF9pc0FycmF5NCA/IF9pdGVyYXRvcjQgOiBfaXRlcmF0b3I0W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY0O1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5NCkge1xuICAgICAgICAgICAgaWYgKF9pNCA+PSBfaXRlcmF0b3I0Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmNCA9IF9pdGVyYXRvcjRbX2k0KytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTQgPSBfaXRlcmF0b3I0Lm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTQuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmNCA9IF9pNC52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmNDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHN0b3JlIHN1cHBvcnRlZCAoTm90IHJlcXVpcmVkLCB0aGUgc3RvcmVzIGlzIGNoZWNrZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uKVxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFyUmVzdWx0ICs9IDEgKiBzdG9yZS5yZW1vdmVJdGVtKGZhbHNlLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiByZW1vdmVkIGNvdW50IGVxdWFsIHRvIHN0b3JlcyBjb3VudFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGJvb1Jlc3VsdCA9IGFyUmVzdWx0ID09PSB0aGlzLnN0b3Jlcy5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc3RvcmVzIGRvZXMgbm90IHN1cHBvcnRlZCwgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcsIHZhbHVlIGNhbiBiZSBzZXRcbiAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICovXG4gICAgICBib29SZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHNldCBpdGVtIHN0YXR1c1xuICAgICAqL1xuICAgIHJldHVybiBib29SZXN1bHQ7XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuXG5cbiAgRXZlckNvb2tpZS5wcm90b3R5cGUuZ2V0S2V5cyA9IGZ1bmN0aW9uIGdldEtleXMoY2hlY2tTdXBwb3J0KSB7XG4gICAgLyoqXG4gICAgICogU2V0IHJlc3VsdCBmbGFnIGFzIHRydWVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBib29SZXN1bHQgPSB7fTtcbiAgICAvKipcbiAgICAgKiBTdG9wIHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjUgPSB0aGlzLnN0b3JlcywgX2lzQXJyYXk1ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3I1KSwgX2k1ID0gMCwgX2l0ZXJhdG9yNSA9IF9pc0FycmF5NSA/IF9pdGVyYXRvcjUgOiBfaXRlcmF0b3I1W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY1O1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5NSkge1xuICAgICAgICAgICAgaWYgKF9pNSA+PSBfaXRlcmF0b3I1Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmNSA9IF9pdGVyYXRvcjVbX2k1KytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTUgPSBfaXRlcmF0b3I1Lm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTUuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmNSA9IF9pNS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmNTtcblxuICAgICAgICAgIHZhciB2YWx1ZSA9IHN0b3JlLmdldEtleXMoZmFsc2UpO1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gdmFsdWUsIF9pc0FycmF5NiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yNiksIF9pNiA9IDAsIF9pdGVyYXRvcjYgPSBfaXNBcnJheTYgPyBfaXRlcmF0b3I2IDogX2l0ZXJhdG9yNltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICB2YXIgX3JlZjY7XG5cbiAgICAgICAgICAgICAgaWYgKF9pc0FycmF5Nikge1xuICAgICAgICAgICAgICAgIGlmIChfaTYgPj0gX2l0ZXJhdG9yNi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWY2ID0gX2l0ZXJhdG9yNltfaTYrK107XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2k2ID0gX2l0ZXJhdG9yNi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pNi5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmNiA9IF9pNi52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBpID0gX3JlZjY7XG5cbiAgICAgICAgICAgICAgYm9vUmVzdWx0W2ldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzdG9yZXMgZG9lcyBub3Qgc3VwcG9ydGVkLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBib29SZXN1bHQgPSB7fTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICovXG4gICAgICBib29SZXN1bHQgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHNldCBpdGVtIHN0YXR1c1xuICAgICAqL1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhib29SZXN1bHQpO1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBjbGVhbnMgdGhlIHN0b3JhZ2UgYW5kIHJldHVybiB0cnVlIGlmIGl0IGlzIGVtcHR5XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIEV2ZXJDb29raWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoY2hlY2tTdXBwb3J0KSB7XG4gICAgLyoqXG4gICAgICogU2V0IHJlc3VsdCBmbGFnIGFzIHRydWVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgYm9vUmVzdWx0ID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTdG9wIHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0aWFsaXNlIHN0b3JlIHJlc3VsdCBjb3VudGVyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJSZXN1bHQgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIGFsbCBzdXBwb3J0ZWQgc3RvcmVzXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I3ID0gdGhpcy5zdG9yZXMsIF9pc0FycmF5NyA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yNyksIF9pNyA9IDAsIF9pdGVyYXRvcjcgPSBfaXNBcnJheTcgPyBfaXRlcmF0b3I3IDogX2l0ZXJhdG9yN1tTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgIHZhciBfcmVmNztcblxuICAgICAgICAgIGlmIChfaXNBcnJheTcpIHtcbiAgICAgICAgICAgIGlmIChfaTcgPj0gX2l0ZXJhdG9yNy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjcgPSBfaXRlcmF0b3I3W19pNysrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2k3ID0gX2l0ZXJhdG9yNy5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoX2k3LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjcgPSBfaTcudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0b3JlID0gX3JlZjc7XG5cbiAgICAgICAgICBhclJlc3VsdCArPSAxICogc3RvcmUuY2xlYXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiByZW1vdmVkIGNvdW50IGVxdWFsIHRvIHN0b3JlcyBjb3VudFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGJvb1Jlc3VsdCA9IGFyUmVzdWx0ID09PSB0aGlzLnN0b3Jlcy5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc3RvcmVzIGRvZXMgbm90IHN1cHBvcnRlZCwgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcsIHZhbHVlIGNhbiBiZSBzZXRcbiAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICovXG4gICAgICBib29SZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHNldCBpdGVtIHN0YXR1c1xuICAgICAqL1xuICAgIHJldHVybiBib29SZXN1bHQ7XG4gIH07XG4gIC8qKlxuICAgKiBTZWxmIHJlZnJlc2hcbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICBpZiAoIXRoaXMuc3RvcFJlZnJlc2gpIHtcbiAgICAgIHZhciBhcnJLZXlzID0gdGhpcy5nZXRLZXlzKGZhbHNlKTtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjggPSBhcnJLZXlzLCBfaXNBcnJheTggPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjgpLCBfaTggPSAwLCBfaXRlcmF0b3I4ID0gX2lzQXJyYXk4ID8gX2l0ZXJhdG9yOCA6IF9pdGVyYXRvcjhbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWY4O1xuXG4gICAgICAgIGlmIChfaXNBcnJheTgpIHtcbiAgICAgICAgICBpZiAoX2k4ID49IF9pdGVyYXRvcjgubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICBfcmVmOCA9IF9pdGVyYXRvcjhbX2k4KytdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9pOCA9IF9pdGVyYXRvcjgubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTguZG9uZSkgYnJlYWs7XG4gICAgICAgICAgX3JlZjggPSBfaTgudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5ID0gX3JlZjg7XG5cbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRJdGVtKGZhbHNlLCBrZXkpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIGFsbCBzdXBwb3J0ZWQgc3RvcmVzXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I5ID0gdGhpcy5zdG9yZXMsIF9pc0FycmF5OSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yOSksIF9pOSA9IDAsIF9pdGVyYXRvcjkgPSBfaXNBcnJheTkgPyBfaXRlcmF0b3I5IDogX2l0ZXJhdG9yOVtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgIHZhciBfcmVmOTtcblxuICAgICAgICAgIGlmIChfaXNBcnJheTkpIHtcbiAgICAgICAgICAgIGlmIChfaTkgPj0gX2l0ZXJhdG9yOS5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjkgPSBfaXRlcmF0b3I5W19pOSsrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2k5ID0gX2l0ZXJhdG9yOS5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoX2k5LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjkgPSBfaTkudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0b3JlID0gX3JlZjk7XG5cbiAgICAgICAgICBpZiAodmFsdWUgIT09IHN0b3JlLmdldEl0ZW0oZmFsc2UsIGtleSkpIHtcbiAgICAgICAgICAgIHN0b3JlLnNldEl0ZW0oZmFsc2UsIGtleSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogU3RvcCBldmVyeSBjb29raWVcbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBfQW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQudW5zdWJzY3JpYmUodGhpcy5yZWZyZXNoSUQpO1xuICAgIHRoaXMuc3RvcFJlZnJlc2ggPSB0cnVlO1xuICAgIHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgdGhpcy5zdG9yZXMgPSBbXTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gRXZlckNvb2tpZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlckNvb2tpZTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVyQ29va2llO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL0V2ZXJDb29raWUudHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcm9vdCA9IHZvaWQgMDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcm9vdCA9IGdsb2JhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290ID0ge307XG4gICAgfVxufSBlbHNlIHtcbiAgICByb290ID0gd2luZG93O1xufVxuLyoqXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcbiAqL1xucm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIChyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJvb3Quc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xufSgpO1xuLyoqXG4gKiBCaW5kIHBvbHlmaWxsXG4gKi9cbmZ1bmN0aW9uIGJpbmQoYikge1xuICAgIC8qKlxuICAgICAqIElmIHRyeSBiaW5kIHZhcmlhYmxlIHRoYXQgbm90IGEgZnVuY3Rpb24sIHRoZW4gdGhyb3cgZXJyb3JcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxldCBBcnJheSBzbGljZSBmdW5jdGlvblxuICAgICAqL1xuICAgIHZhciBhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGUgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICBpZiAoXG4gICAgICAgICB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgKSB7XG4gICAgICAgICByb290LmNvbnNvbGUubG9nKFwiQmluZCBwb2x5ZmlsbFwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoKSB7XG4gICAgICAgIHJldHVybiBlLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBjID8gdGhpcyA6IGIgfHwgcm9vdCwgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJlZCB0aGlzIHByb3RvdHlwZSBhcyBwcm90b3R5cGUgdG8gYmluZCBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBjLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIGQucHJvdG90eXBlID0gbmV3IGMoKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYmluZCBwb2x5ZmlsbFxuICAgICAqL1xuICAgIHJldHVybiBkO1xufVxuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBiaW5kO1xuLyoqXG4gKiBPYmplY3Qua2V5cyBwb2x5ZmlsbFxuICovXG5mdW5jdGlvbiBrZXlzKCkge1xuICAgIHZhciBoYXNEb05vdEVudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIik7XG4gICAgdmFyIGRvTm90RW51bXMgPSBbXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwidmFsdWVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgdmFyIGRvTm90RW51bXNMZW5ndGggPSBkb05vdEVudW1zLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSAhPT0gXCJvYmplY3RcIiAmJiAodHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRG9Ob3RFbnVtQnVnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvTm90RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb05vdEVudW1zW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkb05vdEVudW1zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuT2JqZWN0LmtleXMgPSBPYmplY3Qua2V5cyB8fCBrZXlzKCk7XG4vKipcbiAqIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIGNhbGwgc3RhY2sgY2xhc3NcbiAqL1xuXG52YXIgQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZWQgbWV0aG9kc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGFjayA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdhdGNoZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIG1ldGhvZCB0byB3YXRjaFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSBJRFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogcm9vdDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICAgIHZhciBJRCA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBjb250ZXh0IGFuZCBjYWxsYmFjayBwYXNzZWQgYW5kIHRoZXkgYXJlIG9iamVjdCBhbmQgZnVuY3Rpb25cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKCh0eXBlb2YgY29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGNvbnRleHQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENyZWF0ZSBVSURcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsSUQgPSBJRCB8fCBcIngtXCIgKyBkLmdldFRpbWUoKSArIFwiLVwiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWU2KTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBZGQgbWV0aG9kIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbbG9jYWxJRF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFdyaXRlIHRvIGNvbnNvbGUgY291bnQgb2YgdGhlIHN1YnNjcmliZWQgbWV0aG9kc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgdHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgICB0eXBlb2Ygcm9vdC5jb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgcm9vdC5jb25zb2xlLmluZm8oXCJBbmltYXRpb25GcmFtZSBzdGFjayBcIiArIE9iamVjdC5rZXlzKHRoaXMuc3RhY2spLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZXR1cm4gVUlEXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsSUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlIG1ldGhvZCBieSBJRFxuICAgICAqIEBwYXJhbSBJRFxuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShJRCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgcmVxdWlyZWQgbWV0aG9kIGV4aXN0IGluIHRoZSBzdGFja1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHRoaXMuc3RhY2tbSURdKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE51bGxpZnkgbWV0aG9kIGluIHRoZSBzdGFjayBhbmQgZGVzdHJveSBpdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnN0YWNrW0lEXSA9IGZhbHNlO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhY2tbSURdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBXYXRjaCBhbmQgY2FsbCBtZXRob2RzXG4gICAgICovXG5cblxuICAgIEFuaW1hdGlvbkZyYW1lLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzdGFjayBleGlzdCwgaXQgaXMgYW4gb2JqZWN0IGFuZCBpdCBpcyBjb250YWlucyBtZXRob2RzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrICYmIF90eXBlb2YodGhpcy5zdGFjaykgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXModGhpcy5zdGFjaykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExvb3AgYWxsIG1ldGhvZHMgaW4gc3RhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBJRCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBQcm9jZXNzIG9ubHkgbWV0aG9kcyB3aXRob3V0IGV4dGVuZGVkIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmhhc093blByb3BlcnR5KElEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBJRCBleGlzdCBhbmQgaXQgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSUQgJiYgdHlwZW9mIElEID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBHZXQgc3Vic2NyaWJlZCBtZXRob2QgcGFyYW1zIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqQ2FsbCA9IHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgcGFyYW1zIGV4aXN0LCBpdCBpcyBhbiBvYmplY3QsIGFuZCBpdCBpcyBjb250YWlucyBjYWxsIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGxiYWNrLCBhbmQgcGFyYW1ldGVycyB3aGljaCBpcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iakNhbGwgJiYgKHR5cGVvZiBvYmpDYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqQ2FsbCkpID09PSBcIm9iamVjdFwiICYmIG9iakNhbGwuY29udGV4dCAmJiBvYmpDYWxsLmNhbGxiYWNrICYmIG9iakNhbGwucGFyYW1zICYmIF90eXBlb2Yob2JqQ2FsbC5jb250ZXh0KSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqQ2FsbC5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIEFycmF5LmlzQXJyYXkob2JqQ2FsbC5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENhbGwgc3Vic2NyaWJlZCBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ2FsbC5jYWxsYmFjay5hcHBseShvYmpDYWxsLmNvbnRleHQsIG9iakNhbGwucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNhbGwgd2F0Y2hlclxuICAgICAgICAgKi9cbiAgICAgICAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy53YXRjaC5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFuaW1hdGlvbkZyYW1lO1xufSgpO1xuLyoqXG4gKiBDcmVhdGUgc2luZ2xlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIG9iamVjdFxuICogQHR5cGUge0FuaW1hdGlvbkZyYW1lfVxuICovXG5cblxucm9vdC5BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWUgfHwgbmV3IEFuaW1hdGlvbkZyYW1lKCk7XG4vKipcbiAqIEV4cG9ydCBzaW5nbGUgQW5pbWF0aW9uRnJhbWUgaW5zdGFuY2VcbiAqL1xudmFyIF9BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWU7XG5leHBvcnRzLmRlZmF1bHQgPSBfQW5pbWF0aW9uRnJhbWU7XG5cbm1vZHVsZS5leHBvcnRzID0gX0FuaW1hdGlvbkZyYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9BbmltYXRpb25GcmFtZS9saWIvQW5pbWF0aW9uRnJhbWUudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcblxudmFyIF9VdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlscyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogVGhlIGRvY3VtZW50IGNvb2tpZXMgc3RvcmFnZVxuICovXG52YXIgQ29va2llcyA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBzaG91bGQgYWNjZXB0IGEgaGFzaCB0byBzZXBhcmF0ZSB0aGUgc2NvcGVzIG9mIHN0b3JhZ2VcbiAgICogQHBhcmFtIGhhc2gge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIENvb2tpZXMoaGFzaCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb29raWVzKTtcblxuICAgIHRoaXMuaGFzaCA9IGhhc2ggfHwgbG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgZmxhZyB3aGV0aGVyIHN1cHBvcnRlZCB0aGlzIHN0b3JhZ2UgdHlwZSBvciBub3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llcy5wcm90b3R5cGUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gX1V0aWxzMi5kZWZhdWx0LkNvb2tpZS5pc1N1cHBvcnRlZCgpO1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gZXhwaXJlcyB7bnVtYmVyfVxuICAgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfVxuICAgKiBAcGFyYW0gZG9tYWluIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBzZWN1cmUge2Jvb2xlYW59XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llcy5wcm90b3R5cGUuc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIGV4cGlyZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IDMwO1xuICAgIHZhciBwYXRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBcIi9cIjtcbiAgICB2YXIgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICB2YXIgc2VjdXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgYXJndW1lbnRzWzZdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNl0gOiBsb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcblxuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTYXZlIGNvb2tpZXMgZm9yIDMwIGRheXNcbiAgICAgICAgICogQHR5cGUge0RhdGV9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIGV4cGlyZXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgdmFyIGV4cCA9IGRhdGUudG9VVENTdHJpbmcoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuY29kZSB2YWx1ZSBmb3Igc3RvcmVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyaXRpbmcgdmFsdWUgdG8gdGhlIGRvY3VtZW50IGNvb2tpZSBzdG9yYWdlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBsb2NhbEtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llcy5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhcnJDb29raWUgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJDb29raWUsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaSA9IF9yZWY7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpdCBpcyBjb3JyZWN0IGNvb2tpZSBrZXkgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmICh2WzBdID09PSBrZXkpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgdGhlIHZhbHVlIHdhcyBmb3VuZCByZXR1cm4gdGhlIHZhbHVlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodlsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgdmFsdWUgd2FzIG5vdCBmb3VuZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlbW92ZXMgdGhlIHZhbHVlIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWVzLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbShjaGVja1N1cHBvcnQsIGtleSkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGVtcHR5IG92ZXJkdWUgdmFsdWUgYnkga2V5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXksIFwiXCIsIC0xKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgYXJyYXkgb2Ygc3RyaW5nIG9mIGF2YWlsYWJsZSBrZXlzXG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG5cblxuICBDb29raWVzLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cyhjaGVja1N1cHBvcnQpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhcnJDb29raWUgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyQ29va2llLCBfaXNBcnJheTIgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjIpLCBfaTIgPSAwLCBfaXRlcmF0b3IyID0gX2lzQXJyYXkyID8gX2l0ZXJhdG9yMiA6IF9pdGVyYXRvcjJbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICBpZiAoX2kyID49IF9pdGVyYXRvcjIubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYyID0gX2l0ZXJhdG9yMltfaTIrK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pMiA9IF9pdGVyYXRvcjIubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pMi5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYyID0gX2kyLnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpID0gX3JlZjI7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiB0aGUga2V5IGNvbnRhaW5zIGhhc2ggYWRkIGl0IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKHZbMF0uaW5kZXhPZih0aGlzLmhhc2gpID09PSAwKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZCBrZXkgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYXJyS2V5cy5wdXNoKHZbMF0uc3Vic3RyKHRoaXMuaGFzaC5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJLZXlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWVzLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKGNoZWNrU3VwcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICB2YXIgYXJyS2V5cyA9IHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpO1xuICAgICAgICBpZiAoYXJyS2V5cykge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBhcnJLZXlzLCBfaXNBcnJheTMgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjMpLCBfaTMgPSAwLCBfaXRlcmF0b3IzID0gX2lzQXJyYXkzID8gX2l0ZXJhdG9yMyA6IF9pdGVyYXRvcjNbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmMztcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5Mykge1xuICAgICAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9pMyA9IF9pdGVyYXRvcjMubmV4dCgpO1xuICAgICAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMyA9IF9pMy52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KS5sZW5ndGggPT09IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENvb2tpZXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvb2tpZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvU3RvcmFnZXMvQ29va2llcy50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgc3ViY2xhc3Nlc1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbiA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uKTtcblxudmFyIF9VdGlsc0Jyb3dzZXIgPSByZXF1aXJlKFwiLi9VdGlsc0Jyb3dzZXJcIik7XG5cbnZhciBfVXRpbHNCcm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQnJvd3Nlcik7XG5cbnZhciBfVXRpbHNDb29raWUgPSByZXF1aXJlKFwiLi9VdGlsc0Nvb2tpZVwiKTtcblxudmFyIF9VdGlsc0Nvb2tpZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Nvb2tpZSk7XG5cbnZhciBfVXRpbHNEb2N1bWVudCA9IHJlcXVpcmUoXCIuL1V0aWxzRG9jdW1lbnRcIik7XG5cbnZhciBfVXRpbHNEb2N1bWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RvY3VtZW50KTtcblxudmFyIF9VdGlsc0RPTSA9IHJlcXVpcmUoXCIuL1V0aWxzRE9NXCIpO1xuXG52YXIgX1V0aWxzRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRE9NKTtcblxudmFyIF9VdGlsc01vdXNlID0gcmVxdWlyZShcIi4vVXRpbHNNb3VzZVwiKTtcblxudmFyIF9VdGlsc01vdXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzTW91c2UpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG52YXIgX1V0aWxzVXNlciA9IHJlcXVpcmUoXCIuL1V0aWxzVXNlclwiKTtcblxudmFyIF9VdGlsc1VzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNVc2VyKTtcblxudmFyIF9VdGlsc1dpbmRvdyA9IHJlcXVpcmUoXCIuL1V0aWxzV2luZG93XCIpO1xuXG52YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBHbG9iYWwgVXRpbHMgY2xhc3NcbiAqL1xudmFyIFV0aWxzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXRpbHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kLlxuICAgICAqL1xuICAgIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIGlmICgodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSwgZG9tRG9jdW1lbnQsIHNob3dGb3JjZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXG4gICAgICovXG4gICAgVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSkge1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBjb25zb2xlID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29uc29sZSkpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlXCIgKyBcIiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlXCIgKyBcIiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlLCBzaG93Rm9yY2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJhbnNmZXIgc3RhdGljIG1ldGhvZHMgaW50byB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHJlYWxPYmplY3RcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG5cblxuICAgIFV0aWxzLmltcGxlbWVudGF0aW9uU3RhdGljTWV0aG9kcyA9IGZ1bmN0aW9uIGltcGxlbWVudGF0aW9uU3RhdGljTWV0aG9kcyhyZWFsT2JqZWN0LCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIHN0YXRpY0NsYXNzID0gcmVhbE9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBPYmplY3Qua2V5cyhzdGF0aWNDbGFzcyk7XG4gICAgICAgICAgICBpZiAobWV0aG9kcyAmJiBtZXRob2RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhbE9iamVjdFttZXRob2RdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsT2JqZWN0W21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVGhhdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFwiICsgKGNsYXNzTmFtZSB8fCBzdGF0aWNDbGFzcyAmJiBzdGF0aWNDbGFzcy5uYW1lIHx8IFwiVW5rbm93blwiKSArIFwiLlwiICsgbWV0aG9kICsgXCIgbWV0aG9kLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGF0IG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgXCIgKyAoY2xhc3NOYW1lIHx8IHN0YXRpY0NsYXNzICYmIHN0YXRpY0NsYXNzLm5hbWUgfHwgXCJVbmtub3duXCIpICsgXCIuXCIgKyBtZXRob2QgKyBcIiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0aWNDbGFzc1ttZXRob2RdLmFwcGx5KHN0YXRpY0NsYXNzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBtZXRob2RzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3JldCA9IF9sb29wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgY2FsbCBzdGFjayB0cmFjZVxuICAgICAqIEByZXR1cm4gQXJyYXk8T2JqZWN0PlxuICAgICAqL1xuXG5cbiAgICBVdGlscy5zdGFjayA9IGZ1bmN0aW9uIHN0YWNrKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcigpO1xuICAgICAgICByZXR1cm4gZSAmJiBlLnN0YWNrICYmIGUuc3RhY2suc3BsaXQoXCJcXG5cIikuc2xpY2UoNSkubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXiguKilAKC4qKVxcLmpzOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gLyhbXlxcLzxdKykvaWcuZXhlYyhtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPSBtYXRjaFsxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoaHR0cHxodHRwcyk6KFteOl0rKTooWzAtOV0rKTooWzAtOV0rKSQvaWcuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbNV0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbM10gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbNF0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFsxXSArIFwiOlwiICsgbWF0Y2hbMl0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoLiopOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyhbXihdKylcXHNcXCgoLiopOihbMC05XSspOihbMC05XSspXFwpJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyguKik6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzFdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSkgfHwgW107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgcmFuZG9tIElEXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBVdGlscy5nZXRVSUQgPSBmdW5jdGlvbiBnZXRVSUQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMik7XG4gICAgfTtcblxuICAgIHJldHVybiBVdGlscztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXRpbHM7XG5cblV0aWxzLkFuaW1hdGlvbiA9IF9VdGlsc0FuaW1hdGlvbjIuZGVmYXVsdDtcblV0aWxzLkJyb3dzZXIgPSBfVXRpbHNCcm93c2VyMi5kZWZhdWx0O1xuVXRpbHMuQ29va2llID0gX1V0aWxzQ29va2llMi5kZWZhdWx0O1xuVXRpbHMuRE9NID0gX1V0aWxzRE9NMi5kZWZhdWx0O1xuVXRpbHMuRG9jdW1lbnQgPSBfVXRpbHNEb2N1bWVudDIuZGVmYXVsdDtcblV0aWxzLk1vdXNlID0gX1V0aWxzTW91c2UyLmRlZmF1bHQ7XG5VdGlscy5TY3JlZW4gPSBfVXRpbHNTY3JlZW4yLmRlZmF1bHQ7XG5VdGlscy5TeXN0ZW0gPSBfVXRpbHNTeXN0ZW0yLmRlZmF1bHQ7XG5VdGlscy5Vc2VyID0gX1V0aWxzVXNlcjIuZGVmYXVsdDtcblV0aWxzLldpbmRvdyA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gVXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlscy50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgc3ViY2xhc3Nlc1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfVXRpbHNBbmltYXRpb25FYXNpbmcgPSByZXF1aXJlKFwiLi9VdGlsc0FuaW1hdGlvbkVhc2luZ1wiKTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbkVhc2luZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0FuaW1hdGlvbkVhc2luZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBBbmltYXRpb24gPSBmdW5jdGlvbiBBbmltYXRpb24oKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb24pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQW5pbWF0aW9uO1xuXG5BbmltYXRpb24uRWFzaW5nID0gX1V0aWxzQW5pbWF0aW9uRWFzaW5nMi5kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNBbmltYXRpb24udHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogRGlmZmVyZW50IHRpbWUgYW5pbWF0aW9uIGZ1bmN0aW9uc1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFYXNpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRWFzaW5nKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRWFzaW5nKTtcbiAgICB9XG5cbiAgICBFYXNpbmcuc3dpbmcgPSBmdW5jdGlvbiBzd2luZyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBFYXNpbmdbRWFzaW5nLmRlZl0odCwgYiwgYywgZCk7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5RdWFkID0gZnVuY3Rpb24gZWFzZUluUXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWFkID0gZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAoLS10ICogKHQgLSAyKSAtIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkN1YmljID0gZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEN1YmljID0gZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRDdWJpYyA9IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5RdWFydCA9IGZ1bmN0aW9uIGVhc2VJblF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0UXVhcnQgPSBmdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0UXVhcnQgPSBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluUXVpbnQgPSBmdW5jdGlvbiBlYXNlSW5RdWludCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWludCA9IGZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWludCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluU2luZSA9IGZ1bmN0aW9uIGVhc2VJblNpbmUodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYyArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0U2luZSA9IGZ1bmN0aW9uIGVhc2VPdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiBNYXRoLnNpbih0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dFNpbmUgPSBmdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdCAvIGQpIC0gMSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluRXhwbyA9IGZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gdCA9PT0gMCA/IGIgOiBjICogTWF0aC5wb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEV4cG8gPSBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiB0ID09PSBkID8gYiArIGMgOiBjICogKC1NYXRoLnBvdygyLCAtMTAgKiB0IC8gZCkgKyAxKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRFeHBvID0gZnVuY3Rpb24gZWFzZUluT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA9PT0gZCkge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYyAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5DaXJjID0gZnVuY3Rpb24gZWFzZUluQ2lyYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAtYyAqIChNYXRoLnNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0Q2lyYyA9IGZ1bmN0aW9uIGVhc2VPdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiBNYXRoLnNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dENpcmMgPSBmdW5jdGlvbiBlYXNlSW5PdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGMgLyAyICogKE1hdGguc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkVsYXN0aWMgPSBmdW5jdGlvbiBlYXNlSW5FbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgIHZhciBhID0gYztcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAuMztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0oYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRFbGFzdGljID0gZnVuY3Rpb24gZWFzZU91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgdmFyIGEgPSBjO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqIC4zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyBjICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEVsYXN0aWMgPSBmdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgIHZhciBhID0gYztcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgIHAgPSBkICogKC4zICogMS41KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gLS41ICogKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIC41ICsgYyArIGI7XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5CYWNrID0gZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEJhY2sgPSBmdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEJhY2sgPSBmdW5jdGlvbiBlYXNlSW5PdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkJvdW5jZSA9IGZ1bmN0aW9uIGVhc2VJbkJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjIC0gRWFzaW5nLmVhc2VPdXRCb3VuY2UoZCAtIHQsIDAsIGMsIGQpICsgYjtcbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRCb3VuY2UgPSBmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQpIDwgMSAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgICAgIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUpICsgYjtcbiAgICAgICAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIC45Mzc1KSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0Qm91bmNlID0gZnVuY3Rpb24gZWFzZUluT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5lYXNlSW5Cb3VuY2UodCAqIDIsIDAsIGMsIGQpICogLjUgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFYXNpbmcuZWFzZU91dEJvdW5jZSh0ICogMiAtIGQsIDAsIGMsIGQpICogLjUgKyBjICogLjUgKyBiO1xuICAgIH07XG5cbiAgICByZXR1cm4gRWFzaW5nO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFYXNpbmc7XG5cbkVhc2luZy5kZWYgPSBcImVhc2VPdXRRdWFkXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbkVhc2luZy50c1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBicm93c2VyXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEJyb3dzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJvd3NlcigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJyb3dzZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBicm93c2VyIGluZm9cbiAgICAgKiBAcmV0dXJuIHt7YnJvd3Nlcjogc3RyaW5nLCBtb2JpbGU6IGJvb2xlYW4sIHZlcnNpb246IHN0cmluZ319XG4gICAgICovXG4gICAgQnJvd3Nlci5nZXRJbmZvID0gZnVuY3Rpb24gZ2V0SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJyb3dzZXI6IEJyb3dzZXIuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbW9iaWxlOiBCcm93c2VyLmlzTW9iaWxlKCksXG4gICAgICAgICAgICB2ZXJzaW9uOiBCcm93c2VyLmdldFZlcnNpb24oKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGJyb3dzZXIgbmFtZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgdmFyIGJyb3dzZXIgPSB2b2lkIDA7XG4gICAgICAgIGlmIChCcm93c2VyLmlzT3BlcmEoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiT3BlcmFcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3BlcmFOZXcoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiT3BlcmFcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRU5ldygpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzQ2hyb21lKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIkNocm9tZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNGaXJlZm94KCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIkZpcmVmb3hcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzU2FmYXJpKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIlNhZmFyaVwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPdGhlcigpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gQnJvd3Nlci5nZXRPdGhlck5hbWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnJvd3NlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIGdldFZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gdm9pZCAwO1xuICAgICAgICBpZiAoQnJvd3Nlci5pc09wZXJhKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE9wZXJhVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPcGVyYU5ldygpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPcGVyYU5ld1ZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRNU0lFVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNNU0lFTmV3KCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE1TSUVOZXdWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0Nocm9tZSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRDaHJvbWVWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0ZpcmVmb3goKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0RmlyZWZveFZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzU2FmYXJpKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldFNhZmFyaVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3RoZXIoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0T3RoZXJWZXJzaW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmltIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEBwYXJhbSB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLnRyaW1WZXJzaW9uID0gZnVuY3Rpb24gdHJpbVZlcnNpb24odmVyc2lvbikge1xuICAgICAgICB2YXIgY2hhcnMgPSBbXCI7XCIsIFwiIFwiLCBcIilcIl07XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNoYXJzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNoYXIgPSBfcmVmO1xuXG4gICAgICAgICAgICB2YXIgaXggPSB2ZXJzaW9uLmluZGV4T2YoY2hhcik7XG4gICAgICAgICAgICBpZiAoaXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG1vYmlsZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNb2JpbGUgPSBmdW5jdGlvbiBpc01vYmlsZSgpIHtcbiAgICAgICAgcmV0dXJuICgvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pXG4gICAgICAgICk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc09wZXJhID0gZnVuY3Rpb24gaXNPcGVyYSgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvcGVyYSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3BlcmFWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3BlcmFWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG4gICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBuZXcgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNPcGVyYU5ldyA9IGZ1bmN0aW9uIGlzT3BlcmFOZXcoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPUFJcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG9wZXJhIG5ldyBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3BlcmFOZXdWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3BlcmFOZXdWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT1BSXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG1zaWUgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNU0lFID0gZnVuY3Rpb24gaXNNU0lFKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbXNpZSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24gPSBmdW5jdGlvbiBnZXRNU0lFVmVyc2lvbigpIHtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbXNpZSBuZXcgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNU0lFTmV3ID0gZnVuY3Rpb24gaXNNU0lFTmV3KCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVHJpZGVudC9cIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG1zaWUgbmV3IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVOZXdWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcInJ2OlwiKSArIDMpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIGNocm9tZSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0Nocm9tZSA9IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBjaHJvbWUgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldENocm9tZVZlcnNpb24gPSBmdW5jdGlvbiBnZXRDaHJvbWVWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIHNhZmFyaSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1NhZmFyaSA9IGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzYWZhcmkgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldFNhZmFyaVZlcnNpb24gPSBmdW5jdGlvbiBnZXRTYWZhcmlWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuICAgICAgICB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJWZXJzaW9uXCIpO1xuICAgICAgICBpZiAodmVyT2Zmc2V0ICE9PSAtMSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgZmlyZWZveCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0ZpcmVmb3ggPSBmdW5jdGlvbiBpc0ZpcmVmb3goKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBmaXJlZm94IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uIGdldEZpcmVmb3hWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvdGhlciBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc090aGVyID0gZnVuY3Rpb24gaXNPdGhlcigpIHtcbiAgICAgICAgdmFyIG5hbWVPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiIFwiKSArIDE7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICAgICAgcmV0dXJuIG5hbWVPZmZzZXQgPCB2ZXJPZmZzZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgb3RoZXIgYnJvd3NlciBuYW1lXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldE90aGVyTmFtZSA9IGZ1bmN0aW9uIGdldE90aGVyTmFtZSgpIHtcbiAgICAgICAgdmFyIG5hbWVPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiIFwiKSArIDE7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICAgICAgdmFyIGJyb3dzZXIgPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpO1xuICAgICAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnJvd3NlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvdGhlciBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3RoZXJWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3RoZXJWZXJzaW9uKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDEpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGJyb3dzZXIgc3VwcG9ydFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuICFCcm93c2VyLmlzTVNJRSgpIHx8IHBhcnNlSW50KEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24oKSwgMTApID4gODtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIFdlYktpdCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1dlYktpdCA9IGZ1bmN0aW9uIGlzV2ViS2l0KCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQXBwbGVXZWJLaXQvXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIEdlY2tvIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzR2Vja28gPSBmdW5jdGlvbiBpc0dlY2tvKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiR2Vja29cIikgPiAtMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJLSFRNTFwiKSA9PT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBBbmRyb2lkIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzQW5kcm9pZCA9IGZ1bmN0aW9uIGlzQW5kcm9pZCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkFuZHJvaWRcIikgPiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIExpbnV4IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzTGludXggPSBmdW5jdGlvbiBpc0xpbnV4KCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTGludXhcIikgPiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIGlQYWQgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNUYWJsZXRQQyA9IGZ1bmN0aW9uIGlzVGFibGV0UEMoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJpUGFkXCIpID4gLTE7XG4gICAgfTtcblxuICAgIHJldHVybiBCcm93c2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCcm93c2VyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNCcm93c2VyLnRzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIGNvb2tpZVxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIENvb2tpZSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29va2llKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb29raWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgZmxhZyB3aGV0aGVyIHN1cHBvcnRlZCB0aGlzIHN0b3JhZ2UgdHlwZSBvciBub3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBDb29raWUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGRvY3VtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGRvY3VtZW50LmNvb2tpZSA9PT0gXCJzdHJpbmdcIjtcbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2Qgc2V0cyB0aGUgdmFsdWUgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBoYXMgYmVlbiBzZXRcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICogQHBhcmFtIGV4cGlyZXMge251bWJlcn1cbiAgICogQHBhcmFtIHBhdGgge3N0cmluZ31cbiAgICogQHBhcmFtIGRvbWFpbiB7c3RyaW5nfVxuICAgKiBAcGFyYW0gc2VjdXJlIHtib29sZWFufVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuXG4gIENvb2tpZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgZXhwaXJlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogMzA7XG4gICAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IFwiL1wiO1xuICAgIHZhciBkb21haW4gPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIHZhciBzZWN1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gNiAmJiBhcmd1bWVudHNbNl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s2XSA6IGxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNhdmUgY29va2llcyBmb3IgMzAgZGF5c1xuICAgICAgICAgKiBAdHlwZSB7RGF0ZX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZXhwaXJlcyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICB2YXIgZXhwID0gZGF0ZS50b1VUQ1N0cmluZygpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW5jb2RlIHZhbHVlIGZvciBzdG9yZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAvKipcbiAgICAgICAgICogV3JpdGluZyB2YWx1ZSB0byB0aGUgZG9jdW1lbnQgY29va2llIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gQ29va2llLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlYWRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyBpdCBvciByZXR1cm5zIGZhbHNlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtzdHJpbmd8Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhcnJDb29raWUgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJDb29raWUsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaSA9IF9yZWY7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpdCBpcyBjb3JyZWN0IGNvb2tpZSBrZXkgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmICh2WzBdID09PSBrZXkpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgdGhlIHZhbHVlIHdhcyBmb3VuZCByZXR1cm4gdGhlIHZhbHVlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodlsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgdmFsdWUgd2FzIG5vdCBmb3VuZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlbW92ZXMgdGhlIHZhbHVlIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGVtcHR5IG92ZXJkdWUgdmFsdWUgYnkga2V5XG4gICAgICAgICAqL1xuICAgICAgICBDb29raWUuc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgXCJcIiwgLTEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gQ29va2llLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuXG5cbiAgQ29va2llLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKGNoZWNrU3VwcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYXJyYXkgb2YgYXZhaWxhYmxlIGtleXNcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGFycktleXMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgYXJyYXkgZnJvbSBkb2N1bWVudCBjb29raWUgc3BsaXQgYnkgO1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJyQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY29va2llc1xuICAgICAgICAgKi9cbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFyckNvb2tpZSwgX2lzQXJyYXkyID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IyKSwgX2kyID0gMCwgX2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5Mikge1xuICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTIgPSBfaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaSA9IF9yZWYyO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVHJpbSBhbmQgc3BsaXQgZWFjaCBjb29raWUgYnkgPSBmb3Iga2V5IHZhbHVlIHBhcmVcbiAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIHYgPSBpLnRyaW0oKS5zcGxpdChcIj1cIiwgMik7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQWRkIGtleSB0byB0aGUgbGlzdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGFycktleXMucHVzaCh2WzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyS2V5cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoY2hlY2tTdXBwb3J0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdmFyIGFycktleXMgPSBDb29raWUuZ2V0S2V5cyhjaGVja1N1cHBvcnQpO1xuICAgICAgICBpZiAoYXJyS2V5cykge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBhcnJLZXlzLCBfaXNBcnJheTMgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjMpLCBfaTMgPSAwLCBfaXRlcmF0b3IzID0gX2lzQXJyYXkzID8gX2l0ZXJhdG9yMyA6IF9pdGVyYXRvcjNbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmMztcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5Mykge1xuICAgICAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9pMyA9IF9pdGVyYXRvcjMubmV4dCgpO1xuICAgICAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMyA9IF9pMy52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgICAgQ29va2llLnJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDb29raWU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvb2tpZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzQ29va2llLnRzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIGRvY3VtZW50XG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIERvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvY3VtZW50KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRG9jdW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkb2N1bWVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIERvY3VtZW50LmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heChvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBkb2N1bWVudCB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgdG9wIHNjcm9sbFxuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbFRvcCA9IGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIHJldHVybiBvYmpXaW5kb3cucGFnZVlPZmZzZXQgfHwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keSAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgbGVmdCBzY3JvbGxcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRTY3JvbGxMZWZ0ID0gZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIHJldHVybiBvYmpXaW5kb3cucGFnZVhPZmZzZXQgfHwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkgJiYgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBkb2N1bWVudCBzY3JvbGxzXG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge3tsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgRG9jdW1lbnQuZ2V0U2Nyb2xsID0gZnVuY3Rpb24gZ2V0U2Nyb2xsKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IERvY3VtZW50LmdldFNjcm9sbExlZnQob2JqV2luZG93KSxcbiAgICAgICAgICAgIHRvcDogRG9jdW1lbnQuZ2V0U2Nyb2xsVG9wKG9ialdpbmRvdylcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERvY3VtZW50O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEb2N1bWVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzRG9jdW1lbnQudHNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggRE9NXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBET00oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBET00pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBlbGVtZW50IHNpemVzIGFuZCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSBkb21Ob2RlXG4gICAgICogQHBhcmFtIGRvbURvY3VtZW50XG4gICAgICogQHBhcmFtIHNob3dGb3JjZVxuICAgICAqIEByZXR1cm4ge3tib3R0b206IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fVxuICAgICAqL1xuICAgIERPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPSBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSkge1xuICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgICBpZiAodHlwZW9mIGRvbU5vZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGRvbU5vZGUgPSBkb21Eb2N1bWVudC5nZXRFbGVtZW50QnlJZChkb21Ob2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3R5bGVzID0gdm9pZCAwO1xuICAgICAgICBpZiAoc2hvd0ZvcmNlKSB7XG4gICAgICAgICAgICBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvbU5vZGUpO1xuICAgICAgICAgICAgaWYgKHN0eWxlcyAmJiBzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9ialJldCA9IHtcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkb21Ob2RlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGRlZmF1bHQgbWV0aG9kIGlzIHN1cHBvcnRlZCB0aGFuIHVzZSBpdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoZG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICBvYmpSZXQgPSBkb21Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElFIGhhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBvYmpSZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogb2JqUmV0LmJvdHRvbSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmpSZXQuaGVpZ2h0IHx8IGRvbU5vZGUuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBvYmpSZXQubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IG9ialJldC5yaWdodCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBvYmpSZXQudG9wLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogb2JqUmV0LndpZHRoIHx8IGRvbU5vZGUuY2xpZW50V2lkdGhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBXcml0ZSB0aGUgZWxlbWVudCBpbiBhIHRlbXBvcmFyeSB2YXJpYWJsZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhciBkb21FbGVtZW50ID0gZG9tTm9kZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBDYWxjdWxhdGVkIGJhc2ljIHBhcmFtZXRlcnMgb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhciBvYmpDb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBkb21FbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRvbUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEFyZSBwYXNzZWQgb24gdG8gYWxsIHBhcmVudHMgYW5kIHRha2UgaW50byBhY2NvdW50IHRoZWlyIG9mZnNldHNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZSAoZG9tRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBvYmpDb29yZGluYXRlcy54ICs9IGRvbUVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICAgICAgb2JqQ29vcmRpbmF0ZXMueSArPSBkb21FbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICAgICAgZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgb2JqUmV0ID0ge1xuICAgICAgICAgICAgICAgICAgICBib3R0b206IG9iakNvb3JkaW5hdGVzLnkgKyBvYmpDb29yZGluYXRlcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogb2JqQ29vcmRpbmF0ZXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBvYmpDb29yZGluYXRlcy54LFxuICAgICAgICAgICAgICAgICAgICByaWdodDogb2JqQ29vcmRpbmF0ZXMueCArIG9iakNvb3JkaW5hdGVzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IG9iakNvb3JkaW5hdGVzLnksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmpDb29yZGluYXRlcy53aWR0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3dGb3JjZSAmJiBkb21Ob2RlKSB7XG4gICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gc2l6ZSBhbmQgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBvYmpSZXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmQgZWxlbWVudCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSBkb21Ob2RlXG4gICAgICogQHBhcmFtIHNob3dGb3JjZVxuICAgICAqIEByZXR1cm4ge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cbiAgICAgKi9cbiAgICBET00uZmluZEVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSkge1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgICB2YXIgbGVmdCA9IDA7XG4gICAgICAgIHZhciB0b3AgPSAwO1xuICAgICAgICB3aGlsZSAoZG9tTm9kZSkge1xuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChzaG93Rm9yY2UpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvbU5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzdHlsZXMgJiYgc3R5bGVzLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZWZ0ICs9IGRvbU5vZGUub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIHRvcCArPSBkb21Ob2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGRvbU5vZGUgPSBkb21Ob2RlLm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgIGlmIChzaG93Rm9yY2UgJiYgZG9tTm9kZSkge1xuICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKi9cblxuXG4gICAgRE9NLmFkZEV2ZW50ID0gZnVuY3Rpb24gYWRkRXZlbnQob2JqLCBuYW1lLCBmdW5jKSB7XG4gICAgICAgIGlmIChvYmouYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuYywgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iai5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgb2JqLmF0dGFjaEV2ZW50KFwib25cIiArIG5hbWUsIGZ1bmMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqL1xuXG5cbiAgICBET00ucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChvYmosIG5hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKG9iai5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XG4gICAgICAgICAgICBvYmouZGV0YWNoRXZlbnQoXCJvblwiICsgbmFtZSwgZnVuYyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET00uaGFzQ2xhc3NOYW1lID0gZnVuY3Rpb24gaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gKFwiIFwiICsgZWxlbWVudC5jbGFzc05hbWUgKyBcIiBcIikuaW5kZXhPZihcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00uYWRkQ2xhc3NOYW1lID0gZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoIURPTS5oYXNDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgdmFyIGNsID0gZWxlbWVudC5jbGFzc05hbWU7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsID8gY2wgKyBcIiBcIiArIGNsYXNzTmFtZSA6IGNsYXNzTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cblxuICAgIERPTS5yZW1vdmVDbGFzc05hbWUgPSBmdW5jdGlvbiByZW1vdmVDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gY2xhc3Nlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGNsYXNzZXNbaV0gPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB0b2dnbGVcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuXG4gICAgRE9NLnRvZ2dsZUNsYXNzTmFtZSA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUsIHRvZ2dsZSkge1xuICAgICAgICBpZiAodG9nZ2xlKSB7XG4gICAgICAgICAgICBET00uYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBET00ucmVtb3ZlQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBvbGRDbGFzc05hbWVcbiAgICAgKiBAcGFyYW0gbmV3Q2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cblxuICAgIERPTS5yZXBsYWNlQ2xhc3MgPSBmdW5jdGlvbiByZXBsYWNlQ2xhc3MoZWxlbWVudCwgb2xkQ2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIHtcbiAgICAgICAgRE9NLnJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBvbGRDbGFzc05hbWUpO1xuICAgICAgICBET00uYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGVsZW1lbnQgYnkgdGFnIG5hbWUgYW5kIGluZGV4XG4gICAgICogQHBhcmFtIHRuXG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0RWxlbWVudEJ5VGFnTmFtZSA9IGZ1bmN0aW9uIGdldEVsZW1lbnRCeVRhZ05hbWUodG4sIGNvbnRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBjb250ID0gY29udGV4dCB8fCBkb2N1bWVudDtcbiAgICAgICAgdmFyIGVscyA9IGNvbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodG4pO1xuICAgICAgICBpZiAobnVsbCA9PSBpbmRleCB8fCBpc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZWxzW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGxpbmUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0TGluZUhlaWdodCA9IGZ1bmN0aW9uIGdldExpbmVIZWlnaHQoKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IHN0eWxlcy5saW5lSGVpZ2h0O1xuICAgICAgICB2YXIgbGluZUhlaWdodERpZyA9IHBhcnNlSW50KGxpbmVIZWlnaHQsIDEwKTtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuICAgICAgICB2YXIgZm9udFNpemVEaWcgPSBwYXJzZUludChmb250U2l6ZSwgMTApO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGluZUhlaWdodERpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lSGVpZ2h0RGlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplRGlnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBET007XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzRE9NLnRzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgYWRkaXRpb25hbCBjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlsc0RPTSA9IHJlcXVpcmUoXCIuL1V0aWxzRE9NXCIpO1xuXG52YXIgX1V0aWxzRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRE9NKTtcblxudmFyIF9VdGlsc1dpbmRvdyA9IHJlcXVpcmUoXCIuL1V0aWxzV2luZG93XCIpO1xuXG52YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE1vdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vdXNlKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW91c2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGlzZSBtb3VzZSBkZWx0YVxuICAgICAqIEBwYXJhbSBlXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIE1vdXNlLmdldFdoZWVsRGVsdGEgPSBmdW5jdGlvbiBnZXRXaGVlbERlbHRhKGUpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gdm9pZCAwO1xuICAgICAgICB2YXIgZGVsdGFYID0gdm9pZCAwO1xuICAgICAgICB2YXIgZGVsdGFZID0gdm9pZCAwO1xuICAgICAgICAvLyBPbGQgc2Nob29sIHNjcm9sbHdoZWVsIGRlbHRhXG4gICAgICAgIGlmIChcImRldGFpbFwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGUuZGV0YWlsICogLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwid2hlZWxEZWx0YVwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJ3aGVlbERlbHRhWVwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwid2hlZWxEZWx0YVhcIiBpbiBlKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBlLndoZWVsRGVsdGFYICogLTE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmlyZWZveCA8IDE3IGhvcml6b250YWwgc2Nyb2xsaW5nIHJlbGF0ZWQgdG8gRE9NTW91c2VTY3JvbGwgZXZlbnRcbiAgICAgICAgaWYgKFwiYXhpc1wiIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YVkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5ldyBzY2hvb2wgd2hlZWwgZGVsdGEgKHdoZWVsIGV2ZW50KVxuICAgICAgICBpZiAoXCJkZWx0YVlcIiBpbiBlKSB7XG4gICAgICAgICAgICBkZWx0YVkgPSBlLmRlbHRhWSAqIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImRlbHRhWFwiIGluIGUpIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IGUuZGVsdGFYO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBsaW5lcyBhbmQgcGFnZXMgdG8gcGl4ZWxzIGlmIHdlIGFyZW5cInQgYWxyZWFkeSBpbiBwaXhlbHNcbiAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDAgaXMgYnkgcGl4ZWxzLCBub3RoaW5nIHRvIGRvXG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IF9VdGlsc0RPTTIuZGVmYXVsdC5nZXRMaW5lSGVpZ2h0KCk7XG4gICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFYICogbGluZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmRlbHRhTW9kZSA9PT0gMikge1xuICAgICAgICAgICAgdmFyIHdpbmRvd2hlZ2lodCA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5nZXRIZWlnaHQoKTtcbiAgICAgICAgICAgIGRlbHRhWSA9IGRlbHRhWSAqIHdpbmRvd2hlZ2lodDtcbiAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWCAqIHdpbmRvd2hlZ2lodDtcbiAgICAgICAgfVxuICAgICAgICBkZWx0YSA9IGRlbHRhWSA9PT0gMCA/IGRlbHRhWCA6IGRlbHRhWTtcbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH07XG5cbiAgICByZXR1cm4gTW91c2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1vdXNlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNNb3VzZS50c1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCB3aW5kb3dcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgV2luZG93ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdpbmRvdygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdpbmRvdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHdpbmRvdyBoZWlnaHRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIFdpbmRvdy5nZXRIZWlnaHQgPSBmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgd2luZG93IHdpZHRoXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgd2luZG93IHNpemVzXG4gICAgICogQHJldHVybiB7e2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldFNpemVzID0gZnVuY3Rpb24gZ2V0U2l6ZXMoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBXaW5kb3cuZ2V0SGVpZ2h0KG9ialdpbmRvdyksXG4gICAgICAgICAgICB3aWR0aDogV2luZG93LmdldFdpZHRoKG9ialdpbmRvdylcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFdpbmRvdztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gV2luZG93O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNXaW5kb3cudHNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggc2NyZWVuXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY3JlZW4oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JlZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaW5mb1xuICAgICAqIEByZXR1cm4ge3thdmFpbGFibGVTaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9LCBjb2xvckRlcHRoOiBudW1iZXIsIHBpeGVsUmF0aW86IG51bWJlciwgc2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX19XG4gICAgICovXG4gICAgU2NyZWVuLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXZhaWxhYmxlU2l6ZTogU2NyZWVuLmdldEF2YWlsYWJsZVNpemVzKCksXG4gICAgICAgICAgICBjb2xvckRlcHRoOiBTY3JlZW4uZ2V0Q29sb3JEZXB0aCgpLFxuICAgICAgICAgICAgcGl4ZWxSYXRpbzogU2NyZWVuLmdldFBpeGVsUmF0aW8oKSxcbiAgICAgICAgICAgIHNpemU6IFNjcmVlbi5nZXRTaXplcygpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIGhlaWdodFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRIZWlnaHQgPSBmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4uaGVpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLndpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0SGVpZ2h0KCksXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLmdldFdpZHRoKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZUhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5hdmFpbEhlaWdodDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0QXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiBnZXRBdmFpbGFibGVXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5hdmFpbFdpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRBdmFpbGFibGVTaXplcyA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVNpemVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0KCksXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLmdldEF2YWlsYWJsZVdpZHRoKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gcGl4ZWwgcmF0aW9cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gZ2V0UGl4ZWxSYXRpbygpIHtcbiAgICAgICAgdmFyIHJhdGlvID0gMTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnNjcmVlbi5zeXN0ZW1YRFBJID4gd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSkge1xuICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgLyB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF0aW87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIGNvbG9yIGRlcHRoXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0Q29sb3JEZXB0aCA9IGZ1bmN0aW9uIGdldENvbG9yRGVwdGgoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4uY29sb3JEZXB0aDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjcmVlbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2NyZWVuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNTY3JlZW4udHNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggc3lzdGVtXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFN5c3RlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTeXN0ZW0oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTeXN0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzeXN0ZW0gaW5mb1xuICAgICAqIEByZXR1cm4ge3tuYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZ319XG4gICAgICovXG4gICAgU3lzdGVtLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogU3lzdGVtLmdldE5hbWUoKSxcbiAgICAgICAgICAgIHZlcnNpb246IFN5c3RlbS5nZXRWZXJzaW9uKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBPUyBuYW1lXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBTeXN0ZW0uZ2V0TmFtZSA9IGZ1bmN0aW9uIGdldE5hbWUoKSB7XG4gICAgICAgIHZhciBvcyA9IFwiXCI7XG4gICAgICAgIHZhciBjbGllbnRTdHJpbmdzID0gW3tcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDEwXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDguMVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgN1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIE5UIDYuMC8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgVmlzdGFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvV2luZG93cyBOVCA1LjIvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIFNlcnZlciAyMDAzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgWFBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDIwMDBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBNRVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyA5OHxXaW45OCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDk4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA5NVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIE5UIDQuMFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIENFLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBDRVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW4xNi8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMy4xMVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9BbmRyb2lkLyxcbiAgICAgICAgICAgIHM6IFwiQW5kcm9pZFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9PcGVuQlNELyxcbiAgICAgICAgICAgIHM6IFwiT3BlbiBCU0RcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvU3VuT1MvLFxuICAgICAgICAgICAgczogXCJTdW4gT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKExpbnV4fFgxMSkvLFxuICAgICAgICAgICAgczogXCJMaW51eFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oaVBob25lfGlQYWR8aVBvZCkvLFxuICAgICAgICAgICAgczogXCJpT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvTWFjIE9TIFgvLFxuICAgICAgICAgICAgczogXCJNYWMgT1MgWFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvLFxuICAgICAgICAgICAgczogXCJNYWMgT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvUU5YLyxcbiAgICAgICAgICAgIHM6IFwiUU5YXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1VOSVgvLFxuICAgICAgICAgICAgczogXCJVTklYXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL0JlT1MvLFxuICAgICAgICAgICAgczogXCJCZU9TXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL09TXFwvMi8sXG4gICAgICAgICAgICBzOiBcIk9TLzJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvLFxuICAgICAgICAgICAgczogXCJTZWFyY2ggQm90XCJcbiAgICAgICAgfV07XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNsaWVudFN0cmluZ3MsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY3MgPSBfcmVmO1xuXG4gICAgICAgICAgICBpZiAoY3Muci50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICAgICAgb3MgPSBjcy5zO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBPUyB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBTeXN0ZW0uZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIGdldFZlcnNpb24oKSB7XG4gICAgICAgIHZhciBvcyA9IFN5c3RlbS5nZXROYW1lKCk7XG4gICAgICAgIHZhciBvc1ZlcnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXTtcbiAgICAgICAgICAgIG9zID0gXCJXaW5kb3dzXCI7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChvcykge1xuICAgICAgICAgICAgY2FzZSBcIk1hYyBPUyBYXCI6XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFsuX1xcZF0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KVsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJBbmRyb2lkXCI6XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFsuX1xcZF0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KVsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpT1NcIjpcbiAgICAgICAgICAgICAgICB2YXIgcmVnID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xuICAgICAgICAgICAgICAgIG9zVmVyc2lvbiA9IHJlZ1sxXSArIFwiLlwiICsgcmVnWzJdICsgXCIuXCIgKyAocmVnWzNdIHx8IDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3NWZXJzaW9uO1xuICAgIH07XG5cbiAgICByZXR1cm4gU3lzdGVtO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTeXN0ZW07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc1N5c3RlbS50c1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCB1c2VyXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlsc0Jyb3dzZXIgPSByZXF1aXJlKFwiLi9VdGlsc0Jyb3dzZXJcIik7XG5cbnZhciBfVXRpbHNCcm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQnJvd3Nlcik7XG5cbnZhciBfVXRpbHNTY3JlZW4gPSByZXF1aXJlKFwiLi9VdGlsc1NjcmVlblwiKTtcblxudmFyIF9VdGlsc1NjcmVlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1NjcmVlbik7XG5cbnZhciBfVXRpbHNTeXN0ZW0gPSByZXF1aXJlKFwiLi9VdGlsc1N5c3RlbVwiKTtcblxudmFyIF9VdGlsc1N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1N5c3RlbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFVzZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBVc2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBpbmZvXG4gICAgICogQHJldHVybiB7e2Jyb3dzZXI6IHticm93c2VyOiBzdHJpbmcsIG1vYmlsZTogYm9vbGVhbiwgdmVyc2lvbjogc3RyaW5nfSwgc2NyZWVuOiB7YXZhaWxhYmxlU2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfSwgY29sb3JEZXB0aDogbnVtYmVyLCBwaXhlbFJhdGlvOiBudW1iZXIsIHNpemU6IHtoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19LCBzeXN0ZW06IHtuYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZ319fVxuICAgICAqL1xuICAgIFVzZXIuZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBicm93c2VyOiBfVXRpbHNCcm93c2VyMi5kZWZhdWx0LmdldEluZm8oKSxcbiAgICAgICAgICAgIHNjcmVlbjogX1V0aWxzU2NyZWVuMi5kZWZhdWx0LmdldEluZm8oKSxcbiAgICAgICAgICAgIHN5c3RlbTogX1V0aWxzU3lzdGVtMi5kZWZhdWx0LmdldEluZm8oKVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gVXNlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXNlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzVXNlci50c1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogVGhlIERPTVN0b3JhZ2VcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBET01TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBhY2NlcHQgYSBoYXNoIHRvIHNlcGFyYXRlIHRoZSBzY29wZXMgb2Ygc3RvcmFnZVxuICAgKiBAcGFyYW0gaGFzaCB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gRE9NU3RvcmFnZShoYXNoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERPTVN0b3JhZ2UpO1xuXG4gICAgdGhpcy5oYXNoID0gaGFzaCB8fCBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICB0aGlzLmRvbVN0b3JhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmhhc2gpO1xuICAgIGlmICghdGhpcy5kb21TdG9yYWdlKSB7XG4gICAgICB0aGlzLmRvbVN0b3JhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGhpcy5kb21TdG9yYWdlLmlkID0gdGhpcy5oYXNoO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbVN0b3JhZ2UpO1xuICAgICAgdGhpcy5kb21TdG9yYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5oYXNoKTtcbiAgICAgIGlmICh0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdGhpcy5kb21TdG9yYWdlLnN0eWxlLmJlaGF2aW9yID0gXCJ1cmwoI2RlZmF1bHQjdXNlckRhdGEpXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGZsYWcgd2hldGhlciBzdXBwb3J0ZWQgdGhpcyBzdG9yYWdlIHR5cGUgb3Igbm90XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIERPTVN0b3JhZ2UucHJvdG90eXBlLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIF90eXBlb2YodGhpcy5kb21TdG9yYWdlKSA9PT0gXCJvYmplY3RcIiAmJiBfdHlwZW9mKHRoaXMuZG9tU3RvcmFnZS5wYXJlbnROb2RlKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdGhpcy5kb21TdG9yYWdlLmFkZEJlaGF2aW9yICE9PSBcInVuZGVmaW5lZFwiO1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuXG4gIERPTVN0b3JhZ2UucHJvdG90eXBlLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5LCB2YWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgZG9tIHZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRvbVN0b3JhZ2Uuc2V0QXR0cmlidXRlKGxvY2FsS2V5LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuZG9tU3RvcmFnZS5zYXZlKHRoaXMuaGFzaCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlYWRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyBpdCBvciByZXR1cm5zIGZhbHNlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtzdHJpbmd8Ym9vbGVhbn1cbiAgICovXG5cblxuICBET01TdG9yYWdlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZG9tU3RvcmFnZS5sb2FkKHRoaXMuaGFzaCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZG9tU3RvcmFnZS5nZXRBdHRyaWJ1dGUobG9jYWxLZXkpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdmFsdWUgZXhpc3QsIHJldHVybiBpdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVtb3ZlcyB0aGUgdmFsdWUgYW5kIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIERPTVN0b3JhZ2UucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiByZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFuIHZhbHVlIGFuZCByZW1vdmVcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRvbVN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGxvY2FsS2V5KTtcbiAgICAgICAgdGhpcy5kb21TdG9yYWdlLnNhdmUodGhpcy5oYXNoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgYXJyYXkgb2Ygc3RyaW5nIG9mIGF2YWlsYWJsZSBrZXlzXG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG5cblxuICBET01TdG9yYWdlLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cyhjaGVja1N1cHBvcnQpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBsb2NhbEFycktleXMgPSB0aGlzLmRvbVN0b3JhZ2UuWE1MRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmF0dHJpYnV0ZXM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIGdsb2JhbFN0b3JhZ2VcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYWxBcnJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGxvY2FsQXJyS2V5c1tpXS5uYW1lO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHRoZSBrZXkgY29udGFpbnMgaGFzaCBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAoa2V5LmluZGV4T2YodGhpcy5oYXNoKSA9PT0gMCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQga2V5IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGFycktleXMucHVzaChrZXkuc3Vic3RyKHRoaXMuaGFzaC5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJLZXlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBET01TdG9yYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKGNoZWNrU3VwcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICB2YXIgYXJyS2V5cyA9IHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpO1xuICAgICAgICBpZiAoYXJyS2V5cykge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycktleXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpID0gX3JlZjtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KS5sZW5ndGggPT09IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIERPTVN0b3JhZ2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTVN0b3JhZ2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvU3RvcmFnZXMvRE9NU3RvcmFnZS50c1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogVGhlIEdsb2JhbFN0b3JhZ2VcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBHbG9iYWxTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBhY2NlcHQgYSBoYXNoIHRvIHNlcGFyYXRlIHRoZSBzY29wZXMgb2Ygc3RvcmFnZVxuICAgKiBAcGFyYW0gaGFzaCB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gR2xvYmFsU3RvcmFnZShoYXNoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdsb2JhbFN0b3JhZ2UpO1xuXG4gICAgdGhpcy5oYXNoID0gaGFzaCB8fCBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBpZiAoIXdpbmRvdy5nbG9iYWxTdG9yYWdlKSB7XG4gICAgICB3aW5kb3cuZ2xvYmFsU3RvcmFnZSA9IHt9O1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5nbG9iYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0pIHtcbiAgICAgIHdpbmRvdy5nbG9iYWxTdG9yYWdlW2RvY3VtZW50LmRvbWFpbl0gPSB7fTtcbiAgICB9XG4gICAgdGhpcy5nbG9iYWxTdG9yYWdlID0gd2luZG93Lmdsb2JhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXTtcbiAgfVxuICAvKipcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBHbG9iYWxTdG9yYWdlLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiBfdHlwZW9mKHRoaXMuZ2xvYmFsU3RvcmFnZSkgPT09IFwib2JqZWN0XCI7XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHNldHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaGFzIGJlZW4gc2V0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgR2xvYmFsU3RvcmFnZS5wcm90b3R5cGUuc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXksIHZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB2YWx1ZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlW2xvY2FsS2V5XSA9IHZhbHVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAqL1xuXG5cbiAgR2xvYmFsU3RvcmFnZS5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmdsb2JhbFN0b3JhZ2VbbG9jYWxLZXldO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdmFsdWUgZXhpc3QsIHJldHVybiBpdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVtb3ZlcyB0aGUgdmFsdWUgYW5kIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIEdsb2JhbFN0b3JhZ2UucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiByZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFuIHZhbHVlIGFuZCByZW1vdmVcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VbbG9jYWxLZXldID0gZmFsc2U7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmdsb2JhbFN0b3JhZ2VbbG9jYWxLZXldO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHJpbmcgb2YgYXZhaWxhYmxlIGtleXNcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cblxuXG4gIEdsb2JhbFN0b3JhZ2UucHJvdG90eXBlLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKGNoZWNrU3VwcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFycmF5IG9mIGF2YWlsYWJsZSBrZXlzXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBhcnJLZXlzID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGxvY2FsQXJyS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZ2xvYmFsU3RvcmFnZSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIGdsb2JhbFN0b3JhZ2VcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGxvY2FsQXJyS2V5cywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBrZXkgPSBfcmVmO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgdGhlIGtleSBjb250YWlucyBoYXNoIGFkZCBpdCB0byB0aGUgbGlzdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmhhc2gpID09PSAwKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZCBrZXkgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYXJyS2V5cy5wdXNoKGtleS5zdWJzdHIodGhpcy5oYXNoLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycktleXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBjbGVhbnMgdGhlIHN0b3JhZ2UgYW5kIHJldHVybiB0cnVlIGlmIGl0IGlzIGVtcHR5XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIEdsb2JhbFN0b3JhZ2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoY2hlY2tTdXBwb3J0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIHZhciBhcnJLZXlzID0gdGhpcy5nZXRLZXlzKGNoZWNrU3VwcG9ydCk7XG4gICAgICAgIGlmIChhcnJLZXlzKSB7XG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFycktleXMsIF9pc0FycmF5MiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMiksIF9pMiA9IDAsIF9pdGVyYXRvcjIgPSBfaXNBcnJheTIgPyBfaXRlcmF0b3IyIDogX2l0ZXJhdG9yMltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICAgIGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYyID0gX2kyLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IF9yZWYyO1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gR2xvYmFsU3RvcmFnZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gR2xvYmFsU3RvcmFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9TdG9yYWdlcy9HbG9iYWxTdG9yYWdlLnRzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBUaGUgTG9jYWxTdG9yYWdlXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIExvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBzaG91bGQgYWNjZXB0IGEgaGFzaCB0byBzZXBhcmF0ZSB0aGUgc2NvcGVzIG9mIHN0b3JhZ2VcbiAgICogQHBhcmFtIGhhc2gge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIExvY2FsU3RvcmFnZShoYXNoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExvY2FsU3RvcmFnZSk7XG5cbiAgICB0aGlzLmhhc2ggPSBoYXNoIHx8IGxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGZsYWcgd2hldGhlciBzdXBwb3J0ZWQgdGhpcyBzdG9yYWdlIHR5cGUgb3Igbm90XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIExvY2FsU3RvcmFnZS5wcm90b3R5cGUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdy5sb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCI7XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHNldHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaGFzIGJlZW4gc2V0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgTG9jYWxTdG9yYWdlLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgdmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHZhbHVlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxLZXksIHZhbHVlKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVhZHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIGl0IG9yIHJldHVybnMgZmFsc2UgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICAgKi9cblxuXG4gIExvY2FsU3RvcmFnZS5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgdmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxLZXkpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdmFsdWUgZXhpc3QsIHJldHVybiBpdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVtb3ZlcyB0aGUgdmFsdWUgYW5kIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIExvY2FsU3RvcmFnZS5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYW4gdmFsdWUgYW5kIHJlbW92ZVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbEtleSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuXG5cbiAgTG9jYWxTdG9yYWdlLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cyhjaGVja1N1cHBvcnQpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKS5pbmRleE9mKHRoaXMuaGFzaCkgPT09IDApIHtcbiAgICAgICAgICAgIGFycktleXMucHVzaCh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKS5zdWJzdHIodGhpcy5oYXNoLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBrZXlzXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gYXJyS2V5cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgTG9jYWxTdG9yYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKGNoZWNrU3VwcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICB2YXIgYXJyS2V5cyA9IHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpO1xuICAgICAgICBpZiAoYXJyS2V5cykge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycktleXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpID0gX3JlZjtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KS5sZW5ndGggPT09IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIExvY2FsU3RvcmFnZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTG9jYWxTdG9yYWdlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1N0b3JhZ2VzL0xvY2FsU3RvcmFnZS50c1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogVGhlIFNlc3Npb25TdG9yYWdlXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNlc3Npb25TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBhY2NlcHQgYSBoYXNoIHRvIHNlcGFyYXRlIHRoZSBzY29wZXMgb2Ygc3RvcmFnZVxuICAgKiBAcGFyYW0gaGFzaCB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gU2Vzc2lvblN0b3JhZ2UoaGFzaCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTZXNzaW9uU3RvcmFnZSk7XG5cbiAgICB0aGlzLmhhc2ggPSBoYXNoIHx8IGxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGZsYWcgd2hldGhlciBzdXBwb3J0ZWQgdGhpcyBzdG9yYWdlIHR5cGUgb3Igbm90XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIFNlc3Npb25TdG9yYWdlLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93LnNlc3Npb25TdG9yYWdlICE9PSBcInVuZGVmaW5lZFwiO1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuXG4gIFNlc3Npb25TdG9yYWdlLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgdmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHZhbHVlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShsb2NhbEtleSwgdmFsdWUpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAqL1xuXG5cbiAgU2Vzc2lvblN0b3JhZ2UucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAqL1xuICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB2YWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHZhbHVlID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0obG9jYWxLZXkpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdmFsdWUgZXhpc3QsIHJldHVybiBpdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVtb3ZlcyB0aGUgdmFsdWUgYW5kIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIFNlc3Npb25TdG9yYWdlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbShjaGVja1N1cHBvcnQsIGtleSkge1xuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgKi9cbiAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbiB2YWx1ZSBhbmQgcmVtb3ZlXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxLZXkpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHJpbmcgb2YgYXZhaWxhYmxlIGtleXNcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cblxuXG4gIFNlc3Npb25TdG9yYWdlLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cyhjaGVja1N1cHBvcnQpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBTZXNzaW9uU3RvcmFnZVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAod2luZG93LnNlc3Npb25TdG9yYWdlLmtleShpKS5pbmRleE9mKHRoaXMuaGFzaCkgPT09IDApIHtcbiAgICAgICAgICAgIGFycktleXMucHVzaCh3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uua2V5KGkpLnN1YnN0cih0aGlzLmhhc2gubGVuZ3RoICsgMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGtleXNcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBhcnJLZXlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBTZXNzaW9uU3RvcmFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihjaGVja1N1cHBvcnQpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICovXG4gICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdmFyIGFycktleXMgPSB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KTtcbiAgICAgICAgaWYgKGFycktleXMpIHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJLZXlzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IF9yZWY7XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShjaGVja1N1cHBvcnQsIGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTZXNzaW9uU3RvcmFnZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2Vzc2lvblN0b3JhZ2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvU3RvcmFnZXMvU2Vzc2lvblN0b3JhZ2UudHNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIl0sInNvdXJjZVJvb3QiOiIifQ==