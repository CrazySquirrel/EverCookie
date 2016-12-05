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
	
	var _DOMStorage = __webpack_require__(14);
	
	var _DOMStorage2 = _interopRequireDefault(_DOMStorage);
	
	var _GlobalStorage = __webpack_require__(15);
	
	var _GlobalStorage2 = _interopRequireDefault(_GlobalStorage);
	
	var _LocalStorage = __webpack_require__(16);
	
	var _LocalStorage2 = _interopRequireDefault(_LocalStorage);
	
	var _SessionStorage = __webpack_require__(17);
	
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
	
	    this.regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");
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
	
	
	  EverCookie.prototype.setItem = function setItem() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    var key = arguments[1];
	    var value = arguments[2];
	
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
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key) && typeof value === "string" && (value === "" || this.regValidKey.test(value))) {
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
	      } else {
	        /**
	         * If input data is not valid
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
	
	
	  EverCookie.prototype.getItem = function getItem() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    var key = arguments[1];
	
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
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	      } else {
	        /**
	         * If input data is not valid
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
	
	
	  EverCookie.prototype.removeItem = function removeItem() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    var key = arguments[1];
	
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
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	      } else {
	        /**
	         * If input data is not valid
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
	
	
	  EverCookie.prototype.getKeys = function getKeys() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
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
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean") {
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
	      } else {
	        /**
	         * If input data is not valid
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
	
	
	  EverCookie.prototype.clear = function clear() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
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
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean") {
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
	      } else {
	        /**
	         * If input data is not valid
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
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("AnimationFrame", [], factory);
		else if(typeof exports === 'object')
			exports["AnimationFrame"] = factory();
		else
			root["AnimationFrame"] = factory();
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
	/******/ ({
	
	/***/ 0:
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(5);
	
	
	/***/ },
	
	/***/ 5:
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
		
		        /**
		         * If context and callback passed and they are object and function
		         */
		        if ((typeof context === "undefined" ? "undefined" : _typeof(context)) === "object" && typeof callback === "function" && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object" && Array.isArray(params) && (ID === undefined || typeof ID === "string")) {
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
		            /**
		             * Return UID
		             */
		            return localID;
		        } else {
		            return false;
		        }
		    };
		    /**
		     * Unsubscribe method by ID
		     * @param ID
		     */
		
		
		    AnimationFrame.prototype.unsubscribe = function unsubscribe(ID) {
		        if (typeof ID === "string") {
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
	
	/***/ }
	
	/******/ })
	});
	;
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTBiZTM5YzljMTlkNTcwOGQ2MDc/MjQ4ZSoqIiwid2VicGFjazovLy8uL2xpYi9BbmltYXRpb25GcmFtZS50cz80MTQzKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFRLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQyIsImZpbGUiOiIuL2xpYi9BbmltYXRpb25GcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQW5pbWF0aW9uRnJhbWVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQW5pbWF0aW9uRnJhbWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQW5pbWF0aW9uRnJhbWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTBiZTM5YzljMTlkNTcwOGQ2MDciLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcm9vdCA9IHZvaWQgMDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcm9vdCA9IGdsb2JhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290ID0ge307XG4gICAgfVxufSBlbHNlIHtcbiAgICByb290ID0gd2luZG93O1xufVxuLyoqXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcbiAqL1xucm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIChyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJvb3Quc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xufSgpO1xuLyoqXG4gKiBCaW5kIHBvbHlmaWxsXG4gKi9cbmZ1bmN0aW9uIGJpbmQoYikge1xuICAgIC8qKlxuICAgICAqIElmIHRyeSBiaW5kIHZhcmlhYmxlIHRoYXQgbm90IGEgZnVuY3Rpb24sIHRoZW4gdGhyb3cgZXJyb3JcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxldCBBcnJheSBzbGljZSBmdW5jdGlvblxuICAgICAqL1xuICAgIHZhciBhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGUgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICBpZiAoXG4gICAgICAgICB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgKSB7XG4gICAgICAgICByb290LmNvbnNvbGUubG9nKFwiQmluZCBwb2x5ZmlsbFwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoKSB7XG4gICAgICAgIHJldHVybiBlLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBjID8gdGhpcyA6IGIgfHwgcm9vdCwgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJlZCB0aGlzIHByb3RvdHlwZSBhcyBwcm90b3R5cGUgdG8gYmluZCBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBjLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIGQucHJvdG90eXBlID0gbmV3IGMoKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYmluZCBwb2x5ZmlsbFxuICAgICAqL1xuICAgIHJldHVybiBkO1xufVxuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBiaW5kO1xuLyoqXG4gKiBPYmplY3Qua2V5cyBwb2x5ZmlsbFxuICovXG5mdW5jdGlvbiBrZXlzKCkge1xuICAgIHZhciBoYXNEb05vdEVudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIik7XG4gICAgdmFyIGRvTm90RW51bXMgPSBbXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwidmFsdWVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgdmFyIGRvTm90RW51bXNMZW5ndGggPSBkb05vdEVudW1zLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSAhPT0gXCJvYmplY3RcIiAmJiAodHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRG9Ob3RFbnVtQnVnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvTm90RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb05vdEVudW1zW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkb05vdEVudW1zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuT2JqZWN0LmtleXMgPSBPYmplY3Qua2V5cyB8fCBrZXlzKCk7XG4vKipcbiAqIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIGNhbGwgc3RhY2sgY2xhc3NcbiAqL1xuXG52YXIgQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZWQgbWV0aG9kc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGFjayA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdhdGNoZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIG1ldGhvZCB0byB3YXRjaFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSBJRFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogcm9vdDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICAgIHZhciBJRCA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29udGV4dCBhbmQgY2FsbGJhY2sgcGFzc2VkIGFuZCB0aGV5IGFyZSBvYmplY3QgYW5kIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29udGV4dCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmICh0eXBlb2YgcGFyYW1zID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocGFyYW1zKSkgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMpICYmIChJRCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIFVJRFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgbG9jYWxJRCA9IElEIHx8IFwieC1cIiArIGQuZ2V0VGltZSgpICsgXCItXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTYpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbWV0aG9kIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnN0YWNrW2xvY2FsSURdID0ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcml0ZSB0byBjb25zb2xlIGNvdW50IG9mIHRoZSBzdWJzY3JpYmVkIG1ldGhvZHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gVUlEXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBsb2NhbElEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBtZXRob2QgYnkgSURcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKi9cblxuXG4gICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoSUQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiByZXF1aXJlZCBtZXRob2QgZXhpc3QgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW0lEXSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE51bGxpZnkgbWV0aG9kIGluIHRoZSBzdGFjayBhbmQgZGVzdHJveSBpdFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbSURdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBXYXRjaCBhbmQgY2FsbCBtZXRob2RzXG4gICAgICovXG5cblxuICAgIEFuaW1hdGlvbkZyYW1lLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzdGFjayBleGlzdCwgaXQgaXMgYW4gb2JqZWN0IGFuZCBpdCBpcyBjb250YWlucyBtZXRob2RzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrICYmIF90eXBlb2YodGhpcy5zdGFjaykgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXModGhpcy5zdGFjaykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExvb3AgYWxsIG1ldGhvZHMgaW4gc3RhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBJRCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBQcm9jZXNzIG9ubHkgbWV0aG9kcyB3aXRob3V0IGV4dGVuZGVkIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmhhc093blByb3BlcnR5KElEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBJRCBleGlzdCBhbmQgaXQgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSUQgJiYgdHlwZW9mIElEID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBHZXQgc3Vic2NyaWJlZCBtZXRob2QgcGFyYW1zIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqQ2FsbCA9IHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgcGFyYW1zIGV4aXN0LCBpdCBpcyBhbiBvYmplY3QsIGFuZCBpdCBpcyBjb250YWlucyBjYWxsIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGxiYWNrLCBhbmQgcGFyYW1ldGVycyB3aGljaCBpcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iakNhbGwgJiYgKHR5cGVvZiBvYmpDYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqQ2FsbCkpID09PSBcIm9iamVjdFwiICYmIG9iakNhbGwuY29udGV4dCAmJiBvYmpDYWxsLmNhbGxiYWNrICYmIG9iakNhbGwucGFyYW1zICYmIF90eXBlb2Yob2JqQ2FsbC5jb250ZXh0KSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqQ2FsbC5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIEFycmF5LmlzQXJyYXkob2JqQ2FsbC5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENhbGwgc3Vic2NyaWJlZCBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ2FsbC5jYWxsYmFjay5hcHBseShvYmpDYWxsLmNvbnRleHQsIG9iakNhbGwucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNhbGwgd2F0Y2hlclxuICAgICAgICAgKi9cbiAgICAgICAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy53YXRjaC5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFuaW1hdGlvbkZyYW1lO1xufSgpO1xuLyoqXG4gKiBDcmVhdGUgc2luZ2xlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIG9iamVjdFxuICogQHR5cGUge0FuaW1hdGlvbkZyYW1lfVxuICovXG5cblxucm9vdC5BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWUgfHwgbmV3IEFuaW1hdGlvbkZyYW1lKCk7XG4vKipcbiAqIEV4cG9ydCBzaW5nbGUgQW5pbWF0aW9uRnJhbWUgaW5zdGFuY2VcbiAqL1xudmFyIF9BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWU7XG5leHBvcnRzLmRlZmF1bHQgPSBfQW5pbWF0aW9uRnJhbWU7XG5cbm1vZHVsZS5leHBvcnRzID0gX0FuaW1hdGlvbkZyYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL0FuaW1hdGlvbkZyYW1lLnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiXSwic291cmNlUm9vdCI6IiJ9

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var URL = __webpack_require__(8);
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
	
	    this.regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");
	    this.hash = hash || location.hostname;
	  }
	  /**
	   * The method returns the flag whether supported this storage type or not
	   * @returns {boolean}
	   */
	
	
	  Cookies.prototype.isSupported = function isSupported() {
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
	
	
	  Cookies.prototype.setItem = function setItem() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    var key = arguments[1];
	    var value = arguments[2];
	    var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	    var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
	    var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
	    var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
	
	    try {
	      /**
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key) && typeof value === "string" && (value === "" || this.regValidKey.test(value)) && typeof expires === "number" && expires < 365 && typeof path === "string" && typeof domain === "string" && domain.indexOf(location.hostname) !== -1 && typeof secure === "boolean" && secure === (location.protocol === "https:")) {
	        /**
	         * Validate input data
	         */
	        var u = URL.parse("http://" + domain + path);
	        if (u.hostname === domain || u.path === path) {
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
	  };
	  /**
	   * The method reads the value and returns it or returns false if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {string|boolean}
	   */
	
	
	  Cookies.prototype.getItem = function getItem() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    var key = arguments[1];
	
	    try {
	      /**
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	  };
	  /**
	   * The method removes the value and return true if the value does not exist
	   * @param checkSupport {boolean}
	   * @param key {string}
	   * @returns {boolean}
	   */
	
	
	  Cookies.prototype.removeItem = function removeItem() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    var key = arguments[1];
	
	    try {
	      /**
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	          return this.getItem(checkSupport, key) === false;
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
	  };
	  /**
	   * The method returns the array of string of available keys
	   * @param checkSupport {boolean}
	   * @returns {string[]}
	   */
	
	
	  Cookies.prototype.getKeys = function getKeys() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    try {
	      /**
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean") {
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
	  };
	  /**
	   * The method cleans the storage and return true if it is empty
	   * @param checkSupport {boolean}
	   * @returns {boolean}
	   */
	
	
	  Cookies.prototype.clear = function clear() {
	    var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    try {
	      /**
	       * Validate input data
	       */
	      if (typeof checkSupport === "boolean") {
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
	  };
	
	  return Cookies;
	}();
	
	exports.default = Cookies;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(9);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(11);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module), (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(12);
	exports.encode = exports.stringify = __webpack_require__(13);


/***/ },
/* 12 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 14 */
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
	
	        this.regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");
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
	
	
	    DOMStorage.prototype.setItem = function setItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	        var value = arguments[2];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key) && typeof value === "string" && (value === "" || this.regValidKey.test(value))) {
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
	    };
	    /**
	     * The method reads the value and returns it or returns false if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {string|boolean}
	     */
	
	
	    DOMStorage.prototype.getItem = function getItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	    };
	    /**
	     * The method removes the value and return true if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {boolean}
	     */
	
	
	    DOMStorage.prototype.removeItem = function removeItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	    };
	    /**
	     * The method returns the array of string of available keys
	     * @param checkSupport {boolean}
	     * @returns {string[]}
	     */
	
	
	    DOMStorage.prototype.getKeys = function getKeys() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	    /**
	     * The method cleans the storage and return true if it is empty
	     * @param checkSupport {boolean}
	     * @returns {boolean}
	     */
	
	
	    DOMStorage.prototype.clear = function clear() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	
	    return DOMStorage;
	}();
	
	exports.default = DOMStorage;

/***/ },
/* 15 */
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
	
	        this.regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");
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
	
	
	    GlobalStorage.prototype.setItem = function setItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	        var value = arguments[2];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key) && typeof value === "string" && (value === "" || this.regValidKey.test(value))) {
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
	    };
	    /**
	     * The method reads the value and returns it or returns false if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {string|boolean}
	     */
	
	
	    GlobalStorage.prototype.getItem = function getItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	
	
	    GlobalStorage.prototype.removeItem = function removeItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	    };
	    /**
	     * The method returns the array of string of available keys
	     * @param checkSupport {boolean}
	     * @returns {string[]}
	     */
	
	
	    GlobalStorage.prototype.getKeys = function getKeys() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	    /**
	     * The method cleans the storage and return true if it is empty
	     * @param checkSupport {boolean}
	     * @returns {boolean}
	     */
	
	
	    GlobalStorage.prototype.clear = function clear() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	
	    return GlobalStorage;
	}();
	
	exports.default = GlobalStorage;

/***/ },
/* 16 */
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
	
	        this.regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");
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
	
	
	    LocalStorage.prototype.setItem = function setItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	        var value = arguments[2];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key) && typeof value === "string" && (value === "" || this.regValidKey.test(value))) {
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
	    };
	    /**
	     * The method reads the value and returns it or returns false if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {string|boolean}
	     */
	
	
	    LocalStorage.prototype.getItem = function getItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	
	
	    LocalStorage.prototype.removeItem = function removeItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	    };
	    /**
	     * The method returns the array of string of available keys
	     * @param checkSupport {boolean}
	     * @returns {string[]}
	     */
	
	
	    LocalStorage.prototype.getKeys = function getKeys() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	    /**
	     * The method cleans the storage and return true if it is empty
	     * @param checkSupport {boolean}
	     * @returns {boolean}
	     */
	
	
	    LocalStorage.prototype.clear = function clear() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	
	    return LocalStorage;
	}();
	
	exports.default = LocalStorage;

/***/ },
/* 17 */
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
	
	        this.regValidKey = new RegExp("([a-zA-Z0-9_-]{0,})", "i");
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
	
	
	    SessionStorage.prototype.setItem = function setItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	        var value = arguments[2];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key) && typeof value === "string" && (value === "" || this.regValidKey.test(value))) {
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
	    };
	    /**
	     * The method reads the value and returns it or returns false if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {string|boolean}
	     */
	
	
	    SessionStorage.prototype.getItem = function getItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	
	
	    SessionStorage.prototype.removeItem = function removeItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && this.regValidKey.test(key)) {
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
	    };
	    /**
	     * The method returns the array of string of available keys
	     * @param checkSupport {boolean}
	     * @returns {string[]}
	     */
	
	
	    SessionStorage.prototype.getKeys = function getKeys() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	    /**
	     * The method cleans the storage and return true if it is empty
	     * @param checkSupport {boolean}
	     * @returns {boolean}
	     */
	
	
	    SessionStorage.prototype.clear = function clear() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
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
	    };
	
	    return SessionStorage;
	}();
	
	exports.default = SessionStorage;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2ZkZmQ3ZmViYTllOTVlMWI0YmM/OTkzNyoqIiwid2VicGFjazovLy8uL2xpYi9FdmVyQ29va2llLnRzP2QxNjEqIiwid2VicGFjazovLy8uL34vQW5pbWF0aW9uRnJhbWUvbGliL0FuaW1hdGlvbkZyYW1lLmpzPzRmMDEqIiwid2VicGFjazovLy8uL2xpYi9TdG9yYWdlcy9Db29raWVzLnRzP2MzYzcqIiwid2VicGFjazovLy8uL34vdXJsL3VybC5qcz9kNmE0KiIsIndlYnBhY2s6Ly8vLi9+L3VybC9+L3B1bnljb2RlL3B1bnljb2RlLmpzPzg3ZGUqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanM/YzNjMioiLCJ3ZWJwYWNrOi8vLy4vfi9xdWVyeXN0cmluZy9pbmRleC5qcz9mY2U4KiIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2RlY29kZS5qcz9jMjUwKiIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2VuY29kZS5qcz9lODZiKiIsIndlYnBhY2s6Ly8vLi9saWIvU3RvcmFnZXMvRE9NU3RvcmFnZS50cz8xMmZlKiIsIndlYnBhY2s6Ly8vLi9saWIvU3RvcmFnZXMvR2xvYmFsU3RvcmFnZS50cz82ZDY0KiIsIndlYnBhY2s6Ly8vLi9saWIvU3RvcmFnZXMvTG9jYWxTdG9yYWdlLnRzP2ZkNGIqIiwid2VicGFjazovLy8uL2xpYi9TdG9yYWdlcy9TZXNzaW9uU3RvcmFnZS50cz8xMWZmKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFD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O0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQix3QkFBd0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsa0MiLCJmaWxlIjoiLi9saWIvRXZlckNvb2tpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRXZlckNvb2tpZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJFdmVyQ29va2llXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkV2ZXJDb29raWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2ZkZmQ3ZmViYTllOTVlMWI0YmMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9BbmltYXRpb25GcmFtZSA9IHJlcXVpcmUoXCJBbmltYXRpb25GcmFtZVwiKTtcblxudmFyIF9BbmltYXRpb25GcmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BbmltYXRpb25GcmFtZSk7XG5cbnZhciBfQ29va2llcyA9IHJlcXVpcmUoXCIuL1N0b3JhZ2VzL0Nvb2tpZXNcIik7XG5cbnZhciBfQ29va2llczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db29raWVzKTtcblxudmFyIF9ET01TdG9yYWdlID0gcmVxdWlyZShcIi4vU3RvcmFnZXMvRE9NU3RvcmFnZVwiKTtcblxudmFyIF9ET01TdG9yYWdlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RPTVN0b3JhZ2UpO1xuXG52YXIgX0dsb2JhbFN0b3JhZ2UgPSByZXF1aXJlKFwiLi9TdG9yYWdlcy9HbG9iYWxTdG9yYWdlXCIpO1xuXG52YXIgX0dsb2JhbFN0b3JhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR2xvYmFsU3RvcmFnZSk7XG5cbnZhciBfTG9jYWxTdG9yYWdlID0gcmVxdWlyZShcIi4vU3RvcmFnZXMvTG9jYWxTdG9yYWdlXCIpO1xuXG52YXIgX0xvY2FsU3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Mb2NhbFN0b3JhZ2UpO1xuXG52YXIgX1Nlc3Npb25TdG9yYWdlID0gcmVxdWlyZShcIi4vU3RvcmFnZXMvU2Vzc2lvblN0b3JhZ2VcIik7XG5cbnZhciBfU2Vzc2lvblN0b3JhZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Vzc2lvblN0b3JhZ2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuLyoqXG4gKiBJbXBvcnQgc3RvcmFnZXNcbiAqL1xuXG5cbi8qKlxuICogRXZlckNvb2tpZSBzdG9yYWdlXG4gKi9cbnZhciBFdmVyQ29va2llID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBhY2NlcHQgYSBoYXNoIHRvIHNlcGFyYXRlIHRoZSBzY29wZXMgb2Ygc3RvcmFnZVxuICAgKiBAcGFyYW0gaGFzaCB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gRXZlckNvb2tpZShoYXNoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZXJDb29raWUpO1xuXG4gICAgdGhpcy5yZWdWYWxpZEtleSA9IG5ldyBSZWdFeHAoXCIoW2EtekEtWjAtOV8tXXswLH0pXCIsIFwiaVwiKTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBoYXNoXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmhhc2ggPSBoYXNoIHx8IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpc2Ugc3RvcmVzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMuc3RvcmVzID0gW107XG4gICAgaWYgKHR5cGVvZiBfQ29va2llczIuZGVmYXVsdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zdG9yZXMucHVzaChuZXcgX0Nvb2tpZXMyLmRlZmF1bHQodGhpcy5oYXNoKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX0dsb2JhbFN0b3JhZ2UyLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3RvcmVzLnB1c2gobmV3IF9HbG9iYWxTdG9yYWdlMi5kZWZhdWx0KHRoaXMuaGFzaCkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9Mb2NhbFN0b3JhZ2UyLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3RvcmVzLnB1c2gobmV3IF9Mb2NhbFN0b3JhZ2UyLmRlZmF1bHQodGhpcy5oYXNoKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX1Nlc3Npb25TdG9yYWdlMi5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnN0b3Jlcy5wdXNoKG5ldyBfU2Vzc2lvblN0b3JhZ2UyLmRlZmF1bHQodGhpcy5oYXNoKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX0RPTVN0b3JhZ2UyLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3RvcmVzLnB1c2gobmV3IF9ET01TdG9yYWdlMi5kZWZhdWx0KHRoaXMuaGFzaCkpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RvcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuc3RvcmVzW2ldLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgdGhpcy5zdG9yZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgc2VsZiByZWZyZXNoIGZsYWdcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU2VsZiByZWZyZXNoXG4gICAgICovXG4gICAgaWYgKHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgdGhpcy5yZWZyZXNoSUQgPSBfQW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQuc3Vic2NyaWJlKHRoaXMsIHRoaXMucmVmcmVzaCwgW10pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlcyAmJiB0aGlzLnN0b3Jlcy5sZW5ndGggPiAwO1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbSgpIHtcbiAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHZhbHVlID0gYXJndW1lbnRzWzJdO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHJlc3VsdCBmbGFnIGFzIHRydWVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgYm9vUmVzdWx0ID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTdG9wIHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgKHZhbHVlID09PSBcIlwiIHx8IHRoaXMucmVnVmFsaWRLZXkudGVzdCh2YWx1ZSkpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSW5pdGlhbGlzZSBzdG9yZSByZXN1bHQgYXJyYXlcbiAgICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFyUmVzdWx0cyA9IFtdO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCBhbGwgc3VwcG9ydGVkIHN0b3Jlc1xuICAgICAgICAgICAqL1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuc3RvcmVzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdyaXRlIHN0b3JlIG9wZXJhdGlvbiByZXN1bHQgdG8gcmVzdWx0IGFycmF5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGFyUmVzdWx0cy5wdXNoKHN0b3JlLnNldEl0ZW0oZmFsc2UsIGtleSwgdmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgdGhlcmUgZXhpc3QgcmVzdWx0IGFuZCBvbmUgb2YgdGhlbSBpcyB0cnVlLCBpdCBpcyBtZWFucywgdGhhdCB2YWx1ZSB3YXMgc2V0XG4gICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICovXG4gICAgICAgICAgYm9vUmVzdWx0ID0gYXJSZXN1bHRzLmxlbmd0aCA+IDAgJiYgYXJSZXN1bHRzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHN0b3JlcyBkb2VzIG5vdCBzdXBwb3J0ZWQsIHZhbHVlIGNhbiBiZSBzZXRcbiAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBib29SZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAqL1xuICAgICAgICBib29SZXN1bHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAqL1xuICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFJldHVybiBzZXQgaXRlbSBzdGF0dXNcbiAgICAgKi9cbiAgICByZXR1cm4gYm9vUmVzdWx0O1xuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAqL1xuXG5cbiAgRXZlckNvb2tpZS5wcm90b3R5cGUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oKSB7XG4gICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHJlc3VsdCBmbGFnIGFzIHRydWVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICovXG4gICAgdmFyIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFN0b3Agc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIHRoaXMucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSW5pdGlhbGlzZSB0ZW1wb3Jhcnkgc3RvcmUgcmVzdWx0IGFycmF5XG4gICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBsb2NhbEFyclJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5zdG9yZXMsIF9pc0FycmF5MiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMiksIF9pMiA9IDAsIF9pdGVyYXRvcjIgPSBfaXNBcnJheTIgPyBfaXRlcmF0b3IyIDogX2l0ZXJhdG9yMltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICAgIGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYyID0gX2kyLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmMjtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gc3RvcmUuZ2V0SXRlbShmYWxzZSwga2V5KTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc3RvcmUgaGFzIHRoaXMgdmFsdWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBXcml0ZSBzdG9yZSBvcGVyYXRpb24gcmVzdWx0IHRvIHJlc3VsdCBhcnJheVxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgbG9jYWxBcnJSZXN1bHRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJbml0aWFsaXNlIHN0b3JlIHJlc3VsdCBhcnJheVxuICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFyUmVzdWx0cyA9IHt9O1xuICAgICAgICAgIHZhciBudW1NYXggPSAwO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIExvb2tpbmcgZm9yIHRoZSBtb3N0IGZyZXF1ZW50bHkgbWVudGlvbmVkIHJlc3VsdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBsb2NhbEFyclJlc3VsdHMsIF9pc0FycmF5MyA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMyksIF9pMyA9IDAsIF9pdGVyYXRvcjMgPSBfaXNBcnJheTMgPyBfaXRlcmF0b3IzIDogX2l0ZXJhdG9yM1tTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkzKSB7XG4gICAgICAgICAgICAgIGlmIChfaTMgPj0gX2l0ZXJhdG9yMy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMyA9IF9pdGVyYXRvcjNbX2kzKytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2kzID0gX2l0ZXJhdG9yMy5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaTMuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYzID0gX2kzLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IF9yZWYzO1xuXG4gICAgICAgICAgICBpZiAoIWFyUmVzdWx0c1tpXSkge1xuICAgICAgICAgICAgICBhclJlc3VsdHNbaV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJSZXN1bHRzW2ldKys7XG4gICAgICAgICAgICBpZiAoYXJSZXN1bHRzW2ldID4gbnVtTWF4KSB7XG4gICAgICAgICAgICAgIG51bU1heCA9IGFyUmVzdWx0c1tpXTtcbiAgICAgICAgICAgICAgYm9vUmVzdWx0ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgc3RvcmVzIGRvZXMgbm90IHN1cHBvcnRlZCwgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAqL1xuICAgICAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcsIHZhbHVlIGNhbiBiZSBzZXRcbiAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICovXG4gICAgICBib29SZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHNldCBpdGVtIHN0YXR1c1xuICAgICAqL1xuICAgIHJldHVybiBib29SZXN1bHQ7XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJlbW92ZXMgdGhlIHZhbHVlIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHNbMV07XG5cbiAgICAvKipcbiAgICAgKiBTZXQgcmVzdWx0IGZsYWcgYXMgdHJ1ZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhciBib29SZXN1bHQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFN0b3Agc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIHRoaXMucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSW5pdGlhbGlzZSBzdG9yZSByZXN1bHQgY291bnRlclxuICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFyUmVzdWx0ID0gMDtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gdGhpcy5zdG9yZXMsIF9pc0FycmF5NCA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yNCksIF9pNCA9IDAsIF9pdGVyYXRvcjQgPSBfaXNBcnJheTQgPyBfaXRlcmF0b3I0IDogX2l0ZXJhdG9yNFtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY0O1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXk0KSB7XG4gICAgICAgICAgICAgIGlmIChfaTQgPj0gX2l0ZXJhdG9yNC5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmNCA9IF9pdGVyYXRvcjRbX2k0KytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2k0ID0gX2l0ZXJhdG9yNC5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaTQuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWY0ID0gX2k0LnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmNDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzdG9yZSBzdXBwb3J0ZWQgKE5vdCByZXF1aXJlZCwgdGhlIHN0b3JlcyBpcyBjaGVja2VkIGR1cmluZyBpbml0aWFsaXphdGlvbilcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgYXJSZXN1bHQgKz0gMSAqIHN0b3JlLnJlbW92ZUl0ZW0oZmFsc2UsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHJlbW92ZWQgY291bnQgZXF1YWwgdG8gc3RvcmVzIGNvdW50XG4gICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICovXG4gICAgICAgICAgYm9vUmVzdWx0ID0gYXJSZXN1bHQgPT09IHRoaXMuc3RvcmVzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBzdG9yZXMgZG9lcyBub3Qgc3VwcG9ydGVkLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICovXG4gICAgICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZywgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgKi9cbiAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCBzZWxmIHJlZnJlc2ggcHJvY2Vzc1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuc3RvcFJlZnJlc2ggPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gc2V0IGl0ZW0gc3RhdHVzXG4gICAgICovXG4gICAgcmV0dXJuIGJvb1Jlc3VsdDtcbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgYXJyYXkgb2Ygc3RyaW5nIG9mIGF2YWlsYWJsZSBrZXlzXG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cygpIHtcbiAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHJlc3VsdCBmbGFnIGFzIHRydWVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBib29SZXN1bHQgPSB7fTtcbiAgICAvKipcbiAgICAgKiBTdG9wIHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I1ID0gdGhpcy5zdG9yZXMsIF9pc0FycmF5NSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yNSksIF9pNSA9IDAsIF9pdGVyYXRvcjUgPSBfaXNBcnJheTUgPyBfaXRlcmF0b3I1IDogX2l0ZXJhdG9yNVtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY1O1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXk1KSB7XG4gICAgICAgICAgICAgIGlmIChfaTUgPj0gX2l0ZXJhdG9yNS5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmNSA9IF9pdGVyYXRvcjVbX2k1KytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2k1ID0gX2l0ZXJhdG9yNS5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaTUuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWY1ID0gX2k1LnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmNTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gc3RvcmUuZ2V0S2V5cyhmYWxzZSk7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gdmFsdWUsIF9pc0FycmF5NiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yNiksIF9pNiA9IDAsIF9pdGVyYXRvcjYgPSBfaXNBcnJheTYgPyBfaXRlcmF0b3I2IDogX2l0ZXJhdG9yNltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgIHZhciBfcmVmNjtcblxuICAgICAgICAgICAgICAgIGlmIChfaXNBcnJheTYpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChfaTYgPj0gX2l0ZXJhdG9yNi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgX3JlZjYgPSBfaXRlcmF0b3I2W19pNisrXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgX2k2ID0gX2l0ZXJhdG9yNi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoX2k2LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgX3JlZjYgPSBfaTYudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmNjtcblxuICAgICAgICAgICAgICAgIGJvb1Jlc3VsdFtpXSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgc3RvcmVzIGRvZXMgbm90IHN1cHBvcnRlZCwgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICovXG4gICAgICAgICAgYm9vUmVzdWx0ID0ge307XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgYm9vUmVzdWx0ID0ge307XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZywgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAqL1xuICAgICAgYm9vUmVzdWx0ID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHNlbGYgcmVmcmVzaCBwcm9jZXNzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFJldHVybiBzZXQgaXRlbSBzdGF0dXNcbiAgICAgKi9cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoYm9vUmVzdWx0KTtcbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBFdmVyQ29va2llLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHZhciBjaGVja1N1cHBvcnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgcmVzdWx0IGZsYWcgYXMgdHJ1ZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhciBib29SZXN1bHQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFN0b3Agc2VsZiByZWZyZXNoIHByb2Nlc3NcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BSZWZyZXNoID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEluaXRpYWxpc2Ugc3RvcmUgcmVzdWx0IGNvdW50ZXJcbiAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBhclJlc3VsdCA9IDA7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIGFsbCBzdXBwb3J0ZWQgc3RvcmVzXG4gICAgICAgICAgICovXG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNyA9IHRoaXMuc3RvcmVzLCBfaXNBcnJheTcgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjcpLCBfaTcgPSAwLCBfaXRlcmF0b3I3ID0gX2lzQXJyYXk3ID8gX2l0ZXJhdG9yNyA6IF9pdGVyYXRvcjdbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmNztcblxuICAgICAgICAgICAgaWYgKF9pc0FycmF5Nykge1xuICAgICAgICAgICAgICBpZiAoX2k3ID49IF9pdGVyYXRvcjcubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjcgPSBfaXRlcmF0b3I3W19pNysrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9pNyA9IF9pdGVyYXRvcjcubmV4dCgpO1xuICAgICAgICAgICAgICBpZiAoX2k3LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmNyA9IF9pNy52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0b3JlID0gX3JlZjc7XG5cbiAgICAgICAgICAgIGFyUmVzdWx0ICs9IDEgKiBzdG9yZS5jbGVhcihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHJlbW92ZWQgY291bnQgZXF1YWwgdG8gc3RvcmVzIGNvdW50XG4gICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICovXG4gICAgICAgICAgYm9vUmVzdWx0ID0gYXJSZXN1bHQgPT09IHRoaXMuc3RvcmVzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBzdG9yZXMgZG9lcyBub3Qgc3VwcG9ydGVkLCB2YWx1ZSBjYW4gYmUgc2V0XG4gICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICovXG4gICAgICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgYm9vUmVzdWx0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZywgdmFsdWUgY2FuIGJlIHNldFxuICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgKi9cbiAgICAgIGJvb1Jlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCBzZWxmIHJlZnJlc2ggcHJvY2Vzc1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuc3RvcFJlZnJlc2ggPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gc2V0IGl0ZW0gc3RhdHVzXG4gICAgICovXG4gICAgcmV0dXJuIGJvb1Jlc3VsdDtcbiAgfTtcbiAgLyoqXG4gICAqIFNlbGYgcmVmcmVzaFxuICAgKi9cblxuXG4gIEV2ZXJDb29raWUucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIGlmICghdGhpcy5zdG9wUmVmcmVzaCkge1xuICAgICAgdmFyIGFycktleXMgPSB0aGlzLmdldEtleXMoZmFsc2UpO1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yOCA9IGFycktleXMsIF9pc0FycmF5OCA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yOCksIF9pOCA9IDAsIF9pdGVyYXRvcjggPSBfaXNBcnJheTggPyBfaXRlcmF0b3I4IDogX2l0ZXJhdG9yOFtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICB2YXIgX3JlZjg7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5OCkge1xuICAgICAgICAgIGlmIChfaTggPj0gX2l0ZXJhdG9yOC5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWY4ID0gX2l0ZXJhdG9yOFtfaTgrK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2k4ID0gX2l0ZXJhdG9yOC5uZXh0KCk7XG4gICAgICAgICAgaWYgKF9pOC5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmOCA9IF9pOC52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXkgPSBfcmVmODtcblxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmdldEl0ZW0oZmFsc2UsIGtleSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggYWxsIHN1cHBvcnRlZCBzdG9yZXNcbiAgICAgICAgICovXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjkgPSB0aGlzLnN0b3JlcywgX2lzQXJyYXk5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3I5KSwgX2k5ID0gMCwgX2l0ZXJhdG9yOSA9IF9pc0FycmF5OSA/IF9pdGVyYXRvcjkgOiBfaXRlcmF0b3I5W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWY5O1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5OSkge1xuICAgICAgICAgICAgaWYgKF9pOSA+PSBfaXRlcmF0b3I5Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmOSA9IF9pdGVyYXRvcjlbX2k5KytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTkgPSBfaXRlcmF0b3I5Lm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTkuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmOSA9IF9pOS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RvcmUgPSBfcmVmOTtcblxuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gc3RvcmUuZ2V0SXRlbShmYWxzZSwga2V5KSkge1xuICAgICAgICAgICAgc3RvcmUuc2V0SXRlbShmYWxzZSwga2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBTdG9wIGV2ZXJ5IGNvb2tpZVxuICAgKi9cblxuXG4gIEV2ZXJDb29raWUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIF9BbmltYXRpb25GcmFtZTIuZGVmYXVsdC51bnN1YnNjcmliZSh0aGlzLnJlZnJlc2hJRCk7XG4gICAgdGhpcy5zdG9wUmVmcmVzaCA9IHRydWU7XG4gICAgdGhpcy5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICB0aGlzLnN0b3JlcyA9IFtdO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBFdmVyQ29va2llO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFdmVyQ29va2llO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZXJDb29raWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvRXZlckNvb2tpZS50c1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJBbmltYXRpb25GcmFtZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJBbmltYXRpb25GcmFtZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJBbmltYXRpb25GcmFtZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoe1xuXG4vKioqLyAwOlxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cbi8qKiovIH0sXG5cbi8qKiovIDU6XG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7XCJ1c2Ugc3RyaWN0XCI7XG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXHRcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblx0XG5cdHZhciByb290ID0gdm9pZCAwO1xuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgICAgICByb290ID0gZ2xvYmFsO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByb290ID0ge307XG5cdCAgICB9XG5cdH0gZWxzZSB7XG5cdCAgICByb290ID0gd2luZG93O1xuXHR9XG5cdC8qKlxuXHQgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcblx0ICovXG5cdHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIChyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdCAgICAgICAgcm9vdC5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXHQgICAgfTtcblx0fSgpO1xuXHQvKipcblx0ICogQmluZCBwb2x5ZmlsbFxuXHQgKi9cblx0ZnVuY3Rpb24gYmluZChiKSB7XG5cdCAgICAvKipcblx0ICAgICAqIElmIHRyeSBiaW5kIHZhcmlhYmxlIHRoYXQgbm90IGEgZnVuY3Rpb24sIHRoZW4gdGhyb3cgZXJyb3Jcblx0ICAgICAqL1xuXHQgICAgaWYgKHR5cGVvZiB0aGlzICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0ICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG5cdCAgICB9XG5cdCAgICAvKipcblx0ICAgICAqIGxldCBBcnJheSBzbGljZSBmdW5jdGlvblxuXHQgICAgICovXG5cdCAgICB2YXIgYSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblx0ICAgIHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cdCAgICB2YXIgZSA9IHRoaXM7XG5cdCAgICBmdW5jdGlvbiBjKCkge1xuXHQgICAgICAgIC8qXG5cdCAgICAgICAgIGlmIChcblx0ICAgICAgICAgdHlwZW9mIHJvb3QgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0ICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuXHQgICAgICAgICB0eXBlb2Ygcm9vdC5jb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiXG5cdCAgICAgICAgICkge1xuXHQgICAgICAgICByb290LmNvbnNvbGUubG9nKFwiQmluZCBwb2x5ZmlsbFwiKTtcblx0ICAgICAgICAgfVxuXHQgICAgICAgICAqL1xuXHQgICAgfVxuXHQgICAgZnVuY3Rpb24gZCgpIHtcblx0ICAgICAgICByZXR1cm4gZS5hcHBseSh0aGlzIGluc3RhbmNlb2YgYyA/IHRoaXMgOiBiIHx8IHJvb3QsIGYuY29uY2F0KGEuY2FsbChhcmd1bWVudHMpKSk7XG5cdCAgICB9XG5cdCAgICAvKipcblx0ICAgICAqIFJlZ2lzdGVyZWQgdGhpcyBwcm90b3R5cGUgYXMgcHJvdG90eXBlIHRvIGJpbmQgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25zXG5cdCAgICAgKi9cblx0ICAgIGMucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cdCAgICBkLnByb3RvdHlwZSA9IG5ldyBjKCk7XG5cdCAgICAvKipcblx0ICAgICAqIFJldHVybiBiaW5kIHBvbHlmaWxsXG5cdCAgICAgKi9cblx0ICAgIHJldHVybiBkO1xuXHR9XG5cdEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgYmluZDtcblx0LyoqXG5cdCAqIE9iamVjdC5rZXlzIHBvbHlmaWxsXG5cdCAqL1xuXHRmdW5jdGlvbiBrZXlzKCkge1xuXHQgICAgdmFyIGhhc0RvTm90RW51bUJ1ZyA9ICF7IHRvU3RyaW5nOiBudWxsIH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKTtcblx0ICAgIHZhciBkb05vdEVudW1zID0gW1widG9TdHJpbmdcIiwgXCJ0b0xvY2FsZVN0cmluZ1wiLCBcInZhbHVlT2ZcIiwgXCJoYXNPd25Qcm9wZXJ0eVwiLCBcImlzUHJvdG90eXBlT2ZcIiwgXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLCBcImNvbnN0cnVjdG9yXCJdO1xuXHQgICAgdmFyIGRvTm90RW51bXNMZW5ndGggPSBkb05vdEVudW1zLmxlbmd0aDtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgaWYgKCh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKSkgIT09IFwib2JqZWN0XCIgJiYgKHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIiB8fCBvYmogPT09IG51bGwpKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXHQgICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG5cdCAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocHJvcCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGhhc0RvTm90RW51bUJ1Zykge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvTm90RW51bXNMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGRvTm90RW51bXNbaV0pKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZG9Ob3RFbnVtc1tpXSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgIH07XG5cdH1cblx0T2JqZWN0LmtleXMgPSBPYmplY3Qua2V5cyB8fCBrZXlzKCk7XG5cdC8qKlxuXHQgKiBSZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBjYWxsIHN0YWNrIGNsYXNzXG5cdCAqL1xuXHRcblx0dmFyIEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKCkge1xuXHQgICAgLyoqXG5cdCAgICAgKiBDcmVhdGUgcmVxdWVzdCBhbmltYXRpb24gZnJhbWVcblx0ICAgICAqL1xuXHQgICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWUoKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFuaW1hdGlvbkZyYW1lKTtcblx0XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogU3Vic2NyaWJlZCBtZXRob2RzXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdGhpcy5zdGFjayA9IHt9O1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFN0YXJ0IHJlcXVlc3RBbmltYXRpb25GcmFtZSB3YXRjaGVyXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdGhpcy53YXRjaCgpO1xuXHQgICAgfVxuXHQgICAgLyoqXG5cdCAgICAgKiBTdWJzY3JpYmUgbWV0aG9kIHRvIHdhdGNoXG5cdCAgICAgKiBAcGFyYW0gY29udGV4dFxuXHQgICAgICogQHBhcmFtIGNhbGxiYWNrXG5cdCAgICAgKiBAcGFyYW0gcGFyYW1zXG5cdCAgICAgKiBAcGFyYW0gSURcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEFuaW1hdGlvbkZyYW1lLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUoKSB7XG5cdCAgICAgICAgdmFyIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHJvb3Q7XG5cdCAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICAgIH07XG5cdCAgICAgICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG5cdCAgICAgICAgdmFyIElEID0gYXJndW1lbnRzWzNdO1xuXHRcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJZiBjb250ZXh0IGFuZCBjYWxsYmFjayBwYXNzZWQgYW5kIHRoZXkgYXJlIG9iamVjdCBhbmQgZnVuY3Rpb25cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29udGV4dCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmICh0eXBlb2YgcGFyYW1zID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocGFyYW1zKSkgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMpICYmIChJRCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikpIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZSBVSURcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoKTtcblx0ICAgICAgICAgICAgdmFyIGxvY2FsSUQgPSBJRCB8fCBcIngtXCIgKyBkLmdldFRpbWUoKSArIFwiLVwiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWU2KTtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEFkZCBtZXRob2QgdG8gdGhlIHN0YWNrXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICB0aGlzLnN0YWNrW2xvY2FsSURdID0ge1xuXHQgICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcblx0ICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcblx0ICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBXcml0ZSB0byBjb25zb2xlIGNvdW50IG9mIHRoZSBzdWJzY3JpYmVkIG1ldGhvZHNcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBSZXR1cm4gVUlEXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICByZXR1cm4gbG9jYWxJRDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogVW5zdWJzY3JpYmUgbWV0aG9kIGJ5IElEXG5cdCAgICAgKiBAcGFyYW0gSURcblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShJRCkge1xuXHQgICAgICAgIGlmICh0eXBlb2YgSUQgPT09IFwic3RyaW5nXCIpIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIElmIHJlcXVpcmVkIG1ldGhvZCBleGlzdCBpbiB0aGUgc3RhY2tcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW0lEXSkge1xuXHQgICAgICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAgICAgKiBOdWxsaWZ5IG1ldGhvZCBpbiB0aGUgc3RhY2sgYW5kIGRlc3Ryb3kgaXRcblx0ICAgICAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zdGFja1tJRF0gPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0YWNrW0lEXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIFdhdGNoIGFuZCBjYWxsIG1ldGhvZHNcblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbiB3YXRjaCgpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSWYgc3RhY2sgZXhpc3QsIGl0IGlzIGFuIG9iamVjdCBhbmQgaXQgaXMgY29udGFpbnMgbWV0aG9kc1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2sgJiYgX3R5cGVvZih0aGlzLnN0YWNrKSA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyh0aGlzLnN0YWNrKS5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICAgICAqIExvb3AgYWxsIG1ldGhvZHMgaW4gc3RhY2tcblx0ICAgICAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgSUQgaW4gdGhpcy5zdGFjaykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgICAgICAgICAqIFByb2Nlc3Mgb25seSBtZXRob2RzIHdpdGhvdXQgZXh0ZW5kZWQgcHJvcGVydGllc1xuXHQgICAgICAgICAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmhhc093blByb3BlcnR5KElEKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBJRCBleGlzdCBhbmQgaXQgaXMgYSBzdHJpbmdcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElEICYmIHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEdldCBzdWJzY3JpYmVkIG1ldGhvZCBwYXJhbXMgYnkgSURcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqQ2FsbCA9IHRoaXMuc3RhY2tbSURdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIElmIHBhcmFtcyBleGlzdCwgaXQgaXMgYW4gb2JqZWN0LCBhbmQgaXQgaXMgY29udGFpbnMgY2FsbCBjb250ZXh0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGxiYWNrLCBhbmQgcGFyYW1ldGVycyB3aGljaCBpcyBhcnJheVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpDYWxsICYmICh0eXBlb2Ygb2JqQ2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iakNhbGwpKSA9PT0gXCJvYmplY3RcIiAmJiBvYmpDYWxsLmNvbnRleHQgJiYgb2JqQ2FsbC5jYWxsYmFjayAmJiBvYmpDYWxsLnBhcmFtcyAmJiBfdHlwZW9mKG9iakNhbGwuY29udGV4dCkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iakNhbGwuY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiAmJiBBcnJheS5pc0FycmF5KG9iakNhbGwucGFyYW1zKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ2FsbCBzdWJzY3JpYmVkIG1ldGhvZFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ2FsbC5jYWxsYmFjay5hcHBseShvYmpDYWxsLmNvbnRleHQsIG9iakNhbGwucGFyYW1zKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBjYXRjaCAoZSkge31cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZWNhbGwgd2F0Y2hlclxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMud2F0Y2guYmluZCh0aGlzKSk7XG5cdCAgICB9O1xuXHRcblx0ICAgIHJldHVybiBBbmltYXRpb25GcmFtZTtcblx0fSgpO1xuXHQvKipcblx0ICogQ3JlYXRlIHNpbmdsZSByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBvYmplY3Rcblx0ICogQHR5cGUge0FuaW1hdGlvbkZyYW1lfVxuXHQgKi9cblx0XG5cdFxuXHRyb290LkFuaW1hdGlvbkZyYW1lID0gcm9vdC5BbmltYXRpb25GcmFtZSB8fCBuZXcgQW5pbWF0aW9uRnJhbWUoKTtcblx0LyoqXG5cdCAqIEV4cG9ydCBzaW5nbGUgQW5pbWF0aW9uRnJhbWUgaW5zdGFuY2Vcblx0ICovXG5cdHZhciBfQW5pbWF0aW9uRnJhbWUgPSByb290LkFuaW1hdGlvbkZyYW1lO1xuXHRleHBvcnRzLmRlZmF1bHQgPSBfQW5pbWF0aW9uRnJhbWU7XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IF9BbmltYXRpb25GcmFtZTtcblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0oKSkpKVxuXG4vKioqLyB9XG5cbi8qKioqKiovIH0pXG59KTtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OTFibWwyWlhKellXeE5iMlIxYkdWRVpXWnBibWwwYVc5dVB6VmpZVFlxS2lJc0luZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdPVEJpWlRNNVl6bGpNVGxrTlRjd09HUTJNRGMvTWpRNFpTb3FJaXdpZDJWaWNHRmphem92THk4dUwyeHBZaTlCYm1sdFlYUnBiMjVHY21GdFpTNTBjejgwTVRRektpSmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hEUVVGRE8wRkJRMFFzVHp0QlExWkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEhWQ1FVRmxPMEZCUTJZN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPenRCUVVkQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPenM3T3pzN096czdPenM3T3pzN1FVTjBRMEU3TzBGQlJVRTdPMEZCUlVFc2NVZEJRVzlITEcxQ1FVRnRRaXhGUVVGRkxHMUNRVUZ0UWl3NFNFRkJPRWc3TzBGQlJURlJMR3RFUVVGcFJDd3dRMEZCTUVNc01FUkJRVEJFTEVWQlFVVTdPMEZCUlhaS08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRU3hGUVVGRE8wRkJRMFE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUlVGQlF6dEJRVU5FTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTERaQ1FVRTBRaXhwUWtGQmFVSTdRVUZETjBNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTdzBRa0ZCTWtJc2MwSkJRWE5DTzBGQlEycEVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2FVSkJRV2RDTzBGQlEyaENPenM3UVVGSFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNNRUpCUVhsQ08wRkJRM3BDTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc1JVRkJRenRCUVVORU8wRkJRMEU3UVVGRFFTeFhRVUZWTzBGQlExWTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRU3hyUXlJc0ltWnBiR1VpT2lJdUwyeHBZaTlCYm1sdFlYUnBiMjVHY21GdFpTNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlobWRXNWpkR2x2YmlCM1pXSndZV05yVlc1cGRtVnljMkZzVFc5a2RXeGxSR1ZtYVc1cGRHbHZiaWh5YjI5MExDQm1ZV04wYjNKNUtTQjdYRzVjZEdsbUtIUjVjR1Z2WmlCbGVIQnZjblJ6SUQwOVBTQW5iMkpxWldOMEp5QW1KaUIwZVhCbGIyWWdiVzlrZFd4bElEMDlQU0FuYjJKcVpXTjBKeWxjYmx4MFhIUnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWmhZM1J2Y25rb0tUdGNibHgwWld4elpTQnBaaWgwZVhCbGIyWWdaR1ZtYVc1bElEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlHUmxabWx1WlM1aGJXUXBYRzVjZEZ4MFpHVm1hVzVsS0Z3aVFXNXBiV0YwYVc5dVJuSmhiV1ZjSWl3Z1cxMHNJR1poWTNSdmNua3BPMXh1WEhSbGJITmxJR2xtS0hSNWNHVnZaaUJsZUhCdmNuUnpJRDA5UFNBbmIySnFaV04wSnlsY2JseDBYSFJsZUhCdmNuUnpXMXdpUVc1cGJXRjBhVzl1Um5KaGJXVmNJbDBnUFNCbVlXTjBiM0o1S0NrN1hHNWNkR1ZzYzJWY2JseDBYSFJ5YjI5MFcxd2lRVzVwYldGMGFXOXVSbkpoYldWY0lsMGdQU0JtWVdOMGIzSjVLQ2s3WEc1OUtTaDBhR2x6TENCbWRXNWpkR2x2YmlncElIdGNibkpsZEhWeWJpQmNibHh1WEc0dkx5QlhSVUpRUVVOTElFWlBUMVJGVWlBdkwxeHVMeThnZDJWaWNHRmpheTkxYm1sMlpYSnpZV3hOYjJSMWJHVkVaV1pwYm1sMGFXOXVJaXdpSUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmx4dUlGeDBMeThnVkdobElISmxjWFZwY21VZ1puVnVZM1JwYjI1Y2JpQmNkR1oxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseHVJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaUJjZEZ4MGFXWW9hVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHBYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNWNiaUJjZEZ4MEx5OGdRM0psWVhSbElHRWdibVYzSUcxdlpIVnNaU0FvWVc1a0lIQjFkQ0JwZENCcGJuUnZJSFJvWlNCallXTm9aU2xjYmlCY2RGeDBkbUZ5SUcxdlpIVnNaU0E5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkSUQwZ2UxeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlMRnh1SUZ4MFhIUmNkR2xrT2lCdGIyUjFiR1ZKWkN4Y2JpQmNkRngwWEhSc2IyRmtaV1E2SUdaaGJITmxYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXh2WVdSbFpDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdYMTkzWldKd1lXTnJYM0IxWW14cFkxOXdZWFJvWDE5Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y0NBOUlGd2lYQ0k3WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9NQ2s3WEc1Y2JseHVYRzR2THlCWFJVSlFRVU5MSUVaUFQxUkZVaUF2TDF4dUx5OGdkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdPVEJpWlRNNVl6bGpNVGxrTlRjd09HUTJNRGNpTENKY0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVpYaHdiM0owY3k1ZlgyVnpUVzlrZFd4bElEMGdkSEoxWlR0Y2JseHVkbUZ5SUY5MGVYQmxiMllnUFNCMGVYQmxiMllnVTNsdFltOXNJRDA5UFNCY0ltWjFibU4wYVc5dVhDSWdKaVlnZEhsd1pXOW1JRk41YldKdmJDNXBkR1Z5WVhSdmNpQTlQVDBnWENKemVXMWliMnhjSWlBL0lHWjFibU4wYVc5dUlDaHZZbW9wSUhzZ2NtVjBkWEp1SUhSNWNHVnZaaUJ2WW1vN0lIMGdPaUJtZFc1amRHbHZiaUFvYjJKcUtTQjdJSEpsZEhWeWJpQnZZbW9nSmlZZ2RIbHdaVzltSUZONWJXSnZiQ0E5UFQwZ1hDSm1kVzVqZEdsdmJsd2lJQ1ltSUc5aWFpNWpiMjV6ZEhKMVkzUnZjaUE5UFQwZ1UzbHRZbTlzSUNZbUlHOWlhaUFoUFQwZ1UzbHRZbTlzTG5CeWIzUnZkSGx3WlNBL0lGd2ljM2x0WW05c1hDSWdPaUIwZVhCbGIyWWdiMkpxT3lCOU8xeHVYRzVtZFc1amRHbHZiaUJmWTJ4aGMzTkRZV3hzUTJobFkyc29hVzV6ZEdGdVkyVXNJRU52Ym5OMGNuVmpkRzl5S1NCN0lHbG1JQ2doS0dsdWMzUmhibU5sSUdsdWMzUmhibU5sYjJZZ1EyOXVjM1J5ZFdOMGIzSXBLU0I3SUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkRZVzV1YjNRZ1kyRnNiQ0JoSUdOc1lYTnpJR0Z6SUdFZ1puVnVZM1JwYjI1Y0lpazdJSDBnZlZ4dVhHNTJZWElnY205dmRDQTlJSFp2YVdRZ01EdGNibWxtSUNoMGVYQmxiMllnZDJsdVpHOTNJRDA5UFNCY0luVnVaR1ZtYVc1bFpGd2lLU0I3WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJuYkc5aVlXd2dJVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSXBJSHRjYmlBZ0lDQWdJQ0FnY205dmRDQTlJR2RzYjJKaGJEdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCeWIyOTBJRDBnZTMwN1hHNGdJQ0FnZlZ4dWZTQmxiSE5sSUh0Y2JpQWdJQ0J5YjI5MElEMGdkMmx1Wkc5M08xeHVmVnh1THlvcVhHNGdLaUJ5WlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVZ2NHOXNlV1pwYkd4Y2JpQXFMMXh1Y205dmRDNXlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSNWNHVnZaaUJ5YjI5MElDRTlQU0JjSW5WdVpHVm1hVzVsWkZ3aUlDWW1JQ2h5YjI5MExuSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU0I4ZkNCeWIyOTBMbmRsWW10cGRGSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU0I4ZkNCeWIyOTBMbTF2ZWxKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTQjhmQ0J5YjI5MExtOVNaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VnZkh3Z2NtOXZkQzV0YzFKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTa2dmSHdnWm5WdVkzUnBiMjRnS0dOaGJHeGlZV05yS1NCN1hHNGdJQ0FnSUNBZ0lISnZiM1F1YzJWMFZHbHRaVzkxZENoallXeHNZbUZqYXl3Z01UQXdNQ0F2SURZd0tUdGNiaUFnSUNCOU8xeHVmU2dwTzF4dUx5b3FYRzRnS2lCQ2FXNWtJSEJ2YkhsbWFXeHNYRzRnS2k5Y2JtWjFibU4wYVc5dUlHSnBibVFvWWlrZ2UxeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFbG1JSFJ5ZVNCaWFXNWtJSFpoY21saFlteGxJSFJvWVhRZ2JtOTBJR0VnWm5WdVkzUnBiMjRzSUhSb1pXNGdkR2h5YjNjZ1pYSnliM0pjYmlBZ0lDQWdLaTljYmlBZ0lDQnBaaUFvZEhsd1pXOW1JSFJvYVhNZ0lUMDlJRndpWm5WdVkzUnBiMjVjSWlrZ2UxeHVJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLRndpUm5WdVkzUnBiMjR1Y0hKdmRHOTBlWEJsTG1KcGJtUWdMU0IzYUdGMElHbHpJSFJ5ZVdsdVp5QjBieUJpWlNCaWIzVnVaQ0JwY3lCdWIzUWdZMkZzYkdGaWJHVmNJaWs3WEc0Z0lDQWdmVnh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJR3hsZENCQmNuSmhlU0J6YkdsalpTQm1kVzVqZEdsdmJseHVJQ0FnSUNBcUwxeHVJQ0FnSUhaaGNpQmhJRDBnUVhKeVlYa3VjSEp2ZEc5MGVYQmxMbk5zYVdObE8xeHVJQ0FnSUhaaGNpQm1JRDBnWVM1allXeHNLR0Z5WjNWdFpXNTBjeXdnTVNrN1hHNGdJQ0FnZG1GeUlHVWdQU0IwYUdsek8xeHVJQ0FnSUdaMWJtTjBhVzl1SUdNb0tTQjdYRzRnSUNBZ0lDQWdJQzhxWEc0Z0lDQWdJQ0FnSUNCcFppQW9YRzRnSUNBZ0lDQWdJQ0IwZVhCbGIyWWdjbTl2ZENBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBbUpseHVJQ0FnSUNBZ0lDQWdkSGx3Wlc5bUlISnZiM1F1WTI5dWMyOXNaU0E5UFQwZ1hDSnZZbXBsWTNSY0lpQW1KbHh1SUNBZ0lDQWdJQ0FnZEhsd1pXOW1JSEp2YjNRdVkyOXVjMjlzWlM1c2IyY2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lseHVJQ0FnSUNBZ0lDQWdLU0I3WEc0Z0lDQWdJQ0FnSUNCeWIyOTBMbU52Ym5OdmJHVXViRzluS0Z3aVFtbHVaQ0J3YjJ4NVptbHNiRndpS1R0Y2JpQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ292WEc0Z0lDQWdmVnh1SUNBZ0lHWjFibU4wYVc5dUlHUW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJsTG1Gd2NHeDVLSFJvYVhNZ2FXNXpkR0Z1WTJWdlppQmpJRDhnZEdocGN5QTZJR0lnZkh3Z2NtOXZkQ3dnWmk1amIyNWpZWFFvWVM1allXeHNLR0Z5WjNWdFpXNTBjeWtwS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVW1WbmFYTjBaWEpsWkNCMGFHbHpJSEJ5YjNSdmRIbHdaU0JoY3lCd2NtOTBiM1I1Y0dVZ2RHOGdZbWx1WkNCcGJYQnNaVzFsYm5SaGRHbHZiaUJtZFc1amRHbHZibk5jYmlBZ0lDQWdLaTljYmlBZ0lDQmpMbkJ5YjNSdmRIbHdaU0E5SUhSb2FYTXVjSEp2ZEc5MGVYQmxPMXh1SUNBZ0lHUXVjSEp2ZEc5MGVYQmxJRDBnYm1WM0lHTW9LVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJTWlhSMWNtNGdZbWx1WkNCd2IyeDVabWxzYkZ4dUlDQWdJQ0FxTDF4dUlDQWdJSEpsZEhWeWJpQmtPMXh1ZlZ4dVJuVnVZM1JwYjI0dWNISnZkRzkwZVhCbExtSnBibVFnUFNCR2RXNWpkR2x2Ymk1d2NtOTBiM1I1Y0dVdVltbHVaQ0I4ZkNCaWFXNWtPMXh1THlvcVhHNGdLaUJQWW1wbFkzUXVhMlY1Y3lCd2IyeDVabWxzYkZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJyWlhsektDa2dlMXh1SUNBZ0lIWmhjaUJvWVhORWIwNXZkRVZ1ZFcxQ2RXY2dQU0FoZXlCMGIxTjBjbWx1WnpvZ2JuVnNiQ0I5TG5CeWIzQmxjblI1U1hORmJuVnRaWEpoWW14bEtGd2lkRzlUZEhKcGJtZGNJaWs3WEc0Z0lDQWdkbUZ5SUdSdlRtOTBSVzUxYlhNZ1BTQmJYQ0owYjFOMGNtbHVaMXdpTENCY0luUnZURzlqWVd4bFUzUnlhVzVuWENJc0lGd2lkbUZzZFdWUFpsd2lMQ0JjSW1oaGMwOTNibEJ5YjNCbGNuUjVYQ0lzSUZ3aWFYTlFjbTkwYjNSNWNHVlBabHdpTENCY0luQnliM0JsY25SNVNYTkZiblZ0WlhKaFlteGxYQ0lzSUZ3aVkyOXVjM1J5ZFdOMGIzSmNJbDA3WEc0Z0lDQWdkbUZ5SUdSdlRtOTBSVzUxYlhOTVpXNW5kR2dnUFNCa2IwNXZkRVZ1ZFcxekxteGxibWQwYUR0Y2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLRzlpYWlrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvS0hSNWNHVnZaaUJ2WW1vZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJZ1B5QmNJblZ1WkdWbWFXNWxaRndpSURvZ1gzUjVjR1Z2Wmlodlltb3BLU0FoUFQwZ1hDSnZZbXBsWTNSY0lpQW1KaUFvZEhsd1pXOW1JRzlpYWlBaFBUMGdYQ0ptZFc1amRHbHZibHdpSUh4OElHOWlhaUE5UFQwZ2JuVnNiQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKUFltcGxZM1F1YTJWNWN5QmpZV3hzWldRZ2IyNGdibTl1TFc5aWFtVmpkRndpS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjJZWElnY21WemRXeDBJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvZG1GeUlIQnliM0FnYVc0Z2IySnFLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFpd2djSEp2Y0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWE4xYkhRdWNIVnphQ2h3Y205d0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQnBaaUFvYUdGelJHOU9iM1JGYm5WdFFuVm5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR1J2VG05MFJXNTFiWE5NWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcUxDQmtiMDV2ZEVWdWRXMXpXMmxkS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUXVjSFZ6YUNoa2IwNXZkRVZ1ZFcxelcybGRLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSEpsYzNWc2REdGNiaUFnSUNCOU8xeHVmVnh1VDJKcVpXTjBMbXRsZVhNZ1BTQlBZbXBsWTNRdWEyVjVjeUI4ZkNCclpYbHpLQ2s3WEc0dktpcGNiaUFxSUZKbGNYVmxjM1FnWVc1cGJXRjBhVzl1SUdaeVlXMWxJR05oYkd3Z2MzUmhZMnNnWTJ4aGMzTmNiaUFxTDF4dVhHNTJZWElnUVc1cGJXRjBhVzl1Um5KaGJXVWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EzSmxZWFJsSUhKbGNYVmxjM1FnWVc1cGJXRjBhVzl1SUdaeVlXMWxYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1puVnVZM1JwYjI0Z1FXNXBiV0YwYVc5dVJuSmhiV1VvS1NCN1hHNGdJQ0FnSUNBZ0lGOWpiR0Z6YzBOaGJHeERhR1ZqYXloMGFHbHpMQ0JCYm1sdFlYUnBiMjVHY21GdFpTazdYRzVjYmlBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQXFJRk4xWW5OamNtbGlaV1FnYldWMGFHOWtjMXh1SUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEdGamF5QTlJSHQ5TzF4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nVTNSaGNuUWdjbVZ4ZFdWemRFRnVhVzFoZEdsdmJrWnlZVzFsSUhkaGRHTm9aWEpjYmlBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lIUm9hWE11ZDJGMFkyZ29LVHRjYmlBZ0lDQjlYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVM1ZpYzJOeWFXSmxJRzFsZEdodlpDQjBieUIzWVhSamFGeHVJQ0FnSUNBcUlFQndZWEpoYlNCamIyNTBaWGgwWEc0Z0lDQWdJQ29nUUhCaGNtRnRJR05oYkd4aVlXTnJYRzRnSUNBZ0lDb2dRSEJoY21GdElIQmhjbUZ0YzF4dUlDQWdJQ0FxSUVCd1lYSmhiU0JKUkZ4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTJKdmIyeGxZVzU4YzNSeWFXNW5mVnh1SUNBZ0lDQXFMMXh1WEc1Y2JpQWdJQ0JCYm1sdFlYUnBiMjVHY21GdFpTNXdjbTkwYjNSNWNHVXVjM1ZpYzJOeWFXSmxJRDBnWm5WdVkzUnBiMjRnYzNWaWMyTnlhV0psS0NrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnWTI5dWRHVjRkQ0E5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2djbTl2ZER0Y2JpQWdJQ0FnSUNBZ2RtRnlJR05oYkd4aVlXTnJJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JuVnNiRHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2RtRnlJSEJoY21GdGN5QTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF5SUNZbUlHRnlaM1Z0Wlc1MGMxc3lYU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdZWEpuZFcxbGJuUnpXekpkSURvZ1cxMDdYRzRnSUNBZ0lDQWdJSFpoY2lCSlJDQTlJR0Z5WjNWdFpXNTBjMXN6WFR0Y2JseHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1NXWWdZMjl1ZEdWNGRDQmhibVFnWTJGc2JHSmhZMnNnY0dGemMyVmtJR0Z1WkNCMGFHVjVJR0Z5WlNCdlltcGxZM1FnWVc1a0lHWjFibU4wYVc5dVhHNGdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0JwWmlBb0tIUjVjR1Z2WmlCamIyNTBaWGgwSUQwOVBTQmNJblZ1WkdWbWFXNWxaRndpSUQ4Z1hDSjFibVJsWm1sdVpXUmNJaUE2SUY5MGVYQmxiMllvWTI5dWRHVjRkQ2twSUQwOVBTQmNJbTlpYW1WamRGd2lJQ1ltSUhSNWNHVnZaaUJqWVd4c1ltRmpheUE5UFQwZ1hDSm1kVzVqZEdsdmJsd2lJQ1ltSUNoMGVYQmxiMllnY0dGeVlXMXpJRDA5UFNCY0luVnVaR1ZtYVc1bFpGd2lJRDhnWENKMWJtUmxabWx1WldSY0lpQTZJRjkwZVhCbGIyWW9jR0Z5WVcxektTa2dQVDA5SUZ3aWIySnFaV04wWENJZ0ppWWdRWEp5WVhrdWFYTkJjbkpoZVNod1lYSmhiWE1wSUNZbUlDaEpSQ0E5UFQwZ2RXNWtaV1pwYm1Wa0lIeDhJSFI1Y0dWdlppQkpSQ0E5UFQwZ1hDSnpkSEpwYm1kY0lpa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb2dRM0psWVhSbElGVkpSRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdaQ0E5SUc1bGR5QkVZWFJsS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2JHOWpZV3hKUkNBOUlFbEVJSHg4SUZ3aWVDMWNJaUFySUdRdVoyVjBWR2x0WlNncElDc2dYQ0l0WENJZ0t5Qk5ZWFJvTG5KdmRXNWtLRTFoZEdndWNtRnVaRzl0S0NrZ0tpQXhaVFlwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaUJCWkdRZ2JXVjBhRzlrSUhSdklIUm9aU0J6ZEdGamExeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuTjBZV05yVzJ4dlkyRnNTVVJkSUQwZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiblJsZUhRNklHTnZiblJsZUhRc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyRnNiR0poWTJzNklHTmhiR3hpWVdOckxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQmhjbUZ0Y3pvZ2NHRnlZVzF6WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQlhjbWwwWlNCMGJ5QmpiMjV6YjJ4bElHTnZkVzUwSUc5bUlIUm9aU0J6ZFdKelkzSnBZbVZrSUcxbGRHaHZaSE5jYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQlNaWFIxY200Z1ZVbEVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJzYjJOaGJFbEVPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJWYm5OMVluTmpjbWxpWlNCdFpYUm9iMlFnWW5rZ1NVUmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ1NVUmNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdRVzVwYldGMGFXOXVSbkpoYldVdWNISnZkRzkwZVhCbExuVnVjM1ZpYzJOeWFXSmxJRDBnWm5WdVkzUnBiMjRnZFc1emRXSnpZM0pwWW1Vb1NVUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCSlJDQTlQVDBnWENKemRISnBibWRjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCSlppQnlaWEYxYVhKbFpDQnRaWFJvYjJRZ1pYaHBjM1FnYVc0Z2RHaGxJSE4wWVdOclhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbk4wWVdOclcwbEVYU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFJRTUxYkd4cFpua2diV1YwYUc5a0lHbHVJSFJvWlNCemRHRmpheUJoYm1RZ1pHVnpkSEp2ZVNCcGRGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWMzUmhZMnRiU1VSZElEMGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHVnNaWFJsSUhSb2FYTXVjM1JoWTJ0YlNVUmRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlhZWFJqYUNCaGJtUWdZMkZzYkNCdFpYUm9iMlJ6WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUVGdWFXMWhkR2x2YmtaeVlXMWxMbkJ5YjNSdmRIbHdaUzUzWVhSamFDQTlJR1oxYm1OMGFXOXVJSGRoZEdOb0tDa2dlMXh1SUNBZ0lDQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCSlppQnpkR0ZqYXlCbGVHbHpkQ3dnYVhRZ2FYTWdZVzRnYjJKcVpXTjBJR0Z1WkNCcGRDQnBjeUJqYjI1MFlXbHVjeUJ0WlhSb2IyUnpYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG5OMFlXTnJJQ1ltSUY5MGVYQmxiMllvZEdocGN5NXpkR0ZqYXlrZ1BUMDlJRndpYjJKcVpXTjBYQ0lnSmlZZ1QySnFaV04wTG10bGVYTW9kR2hwY3k1emRHRmpheWt1YkdWdVozUm9JRDRnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FxSUV4dmIzQWdZV3hzSUcxbGRHaHZaSE1nYVc0Z2MzUmhZMnRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCSlJDQnBiaUIwYUdsekxuTjBZV05yS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdLaUJRY205alpYTnpJRzl1YkhrZ2JXVjBhRzlrY3lCM2FYUm9iM1YwSUdWNGRHVnVaR1ZrSUhCeWIzQmxjblJwWlhOY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuTjBZV05yTG1oaGMwOTNibEJ5YjNCbGNuUjVLRWxFS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2lCSlppQkpSQ0JsZUdsemRDQmhibVFnYVhRZ2FYTWdZU0J6ZEhKcGJtZGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvU1VRZ0ppWWdkSGx3Wlc5bUlFbEVJRDA5UFNCY0luTjBjbWx1WjF3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdLaUJIWlhRZ2MzVmljMk55YVdKbFpDQnRaWFJvYjJRZ2NHRnlZVzF6SUdKNUlFbEVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYjJKcVEyRnNiQ0E5SUhSb2FYTXVjM1JoWTJ0YlNVUmRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ29nU1dZZ2NHRnlZVzF6SUdWNGFYTjBMQ0JwZENCcGN5QmhiaUJ2WW1wbFkzUXNJR0Z1WkNCcGRDQnBjeUJqYjI1MFlXbHVjeUJqWVd4c0lHTnZiblJsZUhRc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBcUlHTmhiR3hpWVdOckxDQmhibVFnY0dGeVlXMWxkR1Z5Y3lCM2FHbGphQ0JwY3lCaGNuSmhlVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0c5aWFrTmhiR3dnSmlZZ0tIUjVjR1Z2WmlCdlltcERZV3hzSUQwOVBTQmNJblZ1WkdWbWFXNWxaRndpSUQ4Z1hDSjFibVJsWm1sdVpXUmNJaUE2SUY5MGVYQmxiMllvYjJKcVEyRnNiQ2twSUQwOVBTQmNJbTlpYW1WamRGd2lJQ1ltSUc5aWFrTmhiR3d1WTI5dWRHVjRkQ0FtSmlCdlltcERZV3hzTG1OaGJHeGlZV05ySUNZbUlHOWlha05oYkd3dWNHRnlZVzF6SUNZbUlGOTBlWEJsYjJZb2IySnFRMkZzYkM1amIyNTBaWGgwS1NBOVBUMGdYQ0p2WW1wbFkzUmNJaUFtSmlCMGVYQmxiMllnYjJKcVEyRnNiQzVqWVd4c1ltRmpheUE5UFQwZ1hDSm1kVzVqZEdsdmJsd2lJQ1ltSUVGeWNtRjVMbWx6UVhKeVlYa29iMkpxUTJGc2JDNXdZWEpoYlhNcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFJRU5oYkd3Z2MzVmljMk55YVdKbFpDQnRaWFJvYjJSY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYjJKcVEyRnNiQzVqWVd4c1ltRmpheTVoY0hCc2VTaHZZbXBEWVd4c0xtTnZiblJsZUhRc0lHOWlha05oYkd3dWNHRnlZVzF6S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHQ5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHQ5WEc0Z0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdLaUJTWldOaGJHd2dkMkYwWTJobGNseHVJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnY205dmRDNXlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VvZEdocGN5NTNZWFJqYUM1aWFXNWtLSFJvYVhNcEtUdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ2NtVjBkWEp1SUVGdWFXMWhkR2x2YmtaeVlXMWxPMXh1ZlNncE8xeHVMeW9xWEc0Z0tpQkRjbVZoZEdVZ2MybHVaMnhsSUhKbGNYVmxjM1FnWVc1cGJXRjBhVzl1SUdaeVlXMWxJRzlpYW1WamRGeHVJQ29nUUhSNWNHVWdlMEZ1YVcxaGRHbHZia1p5WVcxbGZWeHVJQ292WEc1Y2JseHVjbTl2ZEM1QmJtbHRZWFJwYjI1R2NtRnRaU0E5SUhKdmIzUXVRVzVwYldGMGFXOXVSbkpoYldVZ2ZId2dibVYzSUVGdWFXMWhkR2x2YmtaeVlXMWxLQ2s3WEc0dktpcGNiaUFxSUVWNGNHOXlkQ0J6YVc1bmJHVWdRVzVwYldGMGFXOXVSbkpoYldVZ2FXNXpkR0Z1WTJWY2JpQXFMMXh1ZG1GeUlGOUJibWx0WVhScGIyNUdjbUZ0WlNBOUlISnZiM1F1UVc1cGJXRjBhVzl1Um5KaGJXVTdYRzVsZUhCdmNuUnpMbVJsWm1GMWJIUWdQU0JmUVc1cGJXRjBhVzl1Um5KaGJXVTdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWDBGdWFXMWhkR2x2YmtaeVlXMWxPMXh1WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkwxeHVMeThnVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaTh2SUM0dmJHbGlMMEZ1YVcxaGRHbHZia1p5WVcxbExuUnpYRzR2THlCdGIyUjFiR1VnYVdRZ1BTQTFYRzR2THlCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTVNBeUlETWlYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjlcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vQW5pbWF0aW9uRnJhbWUvbGliL0FuaW1hdGlvbkZyYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVVJMID0gcmVxdWlyZShcInVybFwiKTtcbi8qKlxuICogVGhlIGRvY3VtZW50IGNvb2tpZXMgc3RvcmFnZVxuICovXG5cbnZhciBDb29raWVzID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBhY2NlcHQgYSBoYXNoIHRvIHNlcGFyYXRlIHRoZSBzY29wZXMgb2Ygc3RvcmFnZVxuICAgKiBAcGFyYW0gaGFzaCB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gQ29va2llcyhoYXNoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvb2tpZXMpO1xuXG4gICAgdGhpcy5yZWdWYWxpZEtleSA9IG5ldyBSZWdFeHAoXCIoW2EtekEtWjAtOV8tXXswLH0pXCIsIFwiaVwiKTtcbiAgICB0aGlzLmhhc2ggPSBoYXNoIHx8IGxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGZsYWcgd2hldGhlciBzdXBwb3J0ZWQgdGhpcyBzdG9yYWdlIHR5cGUgb3Igbm90XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cblxuXG4gIENvb2tpZXMucHJvdG90eXBlLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihkb2N1bWVudCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBkb2N1bWVudC5jb29raWUgPT09IFwic3RyaW5nXCI7XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHNldHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaGFzIGJlZW4gc2V0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBleHBpcmVzIHtudW1iZXJ9XG4gICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBkb21haW4ge3N0cmluZ31cbiAgICogQHBhcmFtIHNlY3VyZSB7Ym9vbGVhbn1cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWVzLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbSgpIHtcbiAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHZhbHVlID0gYXJndW1lbnRzWzJdO1xuICAgIHZhciBleHBpcmVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAzMDtcbiAgICB2YXIgcGF0aCA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogXCIvXCI7XG4gICAgdmFyIGRvbWFpbiA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogbG9jYXRpb24uaG9zdG5hbWU7XG4gICAgdmFyIHNlY3VyZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA2ICYmIGFyZ3VtZW50c1s2XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzZdIDogbG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG5cbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIHRoaXMucmVnVmFsaWRLZXkudGVzdChrZXkpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAodmFsdWUgPT09IFwiXCIgfHwgdGhpcy5yZWdWYWxpZEtleS50ZXN0KHZhbHVlKSkgJiYgdHlwZW9mIGV4cGlyZXMgPT09IFwibnVtYmVyXCIgJiYgZXhwaXJlcyA8IDM2NSAmJiB0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZG9tYWluID09PSBcInN0cmluZ1wiICYmIGRvbWFpbi5pbmRleE9mKGxvY2F0aW9uLmhvc3RuYW1lKSAhPT0gLTEgJiYgdHlwZW9mIHNlY3VyZSA9PT0gXCJib29sZWFuXCIgJiYgc2VjdXJlID09PSAobG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgdSA9IFVSTC5wYXJzZShcImh0dHA6Ly9cIiArIGRvbWFpbiArIHBhdGgpO1xuICAgICAgICBpZiAodS5ob3N0bmFtZSA9PT0gZG9tYWluIHx8IHUucGF0aCA9PT0gcGF0aCkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTYXZlIGNvb2tpZXMgZm9yIDMwIGRheXNcbiAgICAgICAgICAgICAqIEB0eXBlIHtEYXRlfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBleHBpcmVzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgICAgICB2YXIgZXhwID0gZGF0ZS50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFbmNvZGUgdmFsdWUgZm9yIHN0b3JlXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdyaXRpbmcgdmFsdWUgdG8gdGhlIGRvY3VtZW50IGNvb2tpZSBzdG9yYWdlXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBsb2NhbEtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmVhZHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIGl0IG9yIHJldHVybnMgZmFsc2UgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICAgKi9cblxuXG4gIENvb2tpZXMucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKCkge1xuICAgIHZhciBjaGVja1N1cHBvcnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XG4gICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAqL1xuICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBrZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAgICovXG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyQ29va2llLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IF9yZWY7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVHJpbSBhbmQgc3BsaXQgZWFjaCBjb29raWUgYnkgPSBmb3Iga2V5IHZhbHVlIHBhcmVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIHYgPSBpLnRyaW0oKS5zcGxpdChcIj1cIiwgMik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGl0IGlzIGNvcnJlY3QgY29va2llIGtleSByZXR1cm4gdGhlIHZhbHVlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh2WzBdID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIElmIHRoZSB2YWx1ZSB3YXMgZm91bmQgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgdGhlIHZhbHVlIHdhcyBub3QgZm91bmQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llcy5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oKSB7XG4gICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFNldCBlbXB0eSBvdmVyZHVlIHZhbHVlIGJ5IGtleVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHRoaXMuc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgXCJcIiwgLTEgKiAyNCAqIDYwICogNjApO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgYXJyYXkgb2Ygc3RyaW5nIG9mIGF2YWlsYWJsZSBrZXlzXG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG5cblxuICBDb29raWVzLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cygpIHtcbiAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgYXJyYXkgb2YgYXZhaWxhYmxlIGtleXNcbiAgICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFycktleXMgPSBbXTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAgICovXG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFyckNvb2tpZSwgX2lzQXJyYXkyID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IyKSwgX2kyID0gMCwgX2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheTIpIHtcbiAgICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYyID0gX2l0ZXJhdG9yMltfaTIrK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaTIgPSBfaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgICAgICAgaWYgKF9pMi5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjIgPSBfaTIudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpID0gX3JlZjI7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVHJpbSBhbmQgc3BsaXQgZWFjaCBjb29raWUgYnkgPSBmb3Iga2V5IHZhbHVlIHBhcmVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIHYgPSBpLnRyaW0oKS5zcGxpdChcIj1cIiwgMik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHRoZSBrZXkgY29udGFpbnMgaGFzaCBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHZbMF0uaW5kZXhPZih0aGlzLmhhc2gpID09PSAwKSB7XG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBBZGQga2V5IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBhcnJLZXlzLnB1c2godlswXS5zdWJzdHIodGhpcy5oYXNoLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFycktleXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llcy5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICB2YXIgYXJyS2V5cyA9IHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpO1xuICAgICAgICAgIGlmIChhcnJLZXlzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gYXJyS2V5cywgX2lzQXJyYXkzID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IzKSwgX2kzID0gMCwgX2l0ZXJhdG9yMyA9IF9pc0FycmF5MyA/IF9pdGVyYXRvcjMgOiBfaXRlcmF0b3IzW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmMztcblxuICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pMyA+PSBfaXRlcmF0b3IzLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaTMgPSBfaXRlcmF0b3IzLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYzID0gX2kzLnZhbHVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDb29raWVzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb29raWVzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1N0b3JhZ2VzL0Nvb2tpZXMudHNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xuXG5leHBvcnRzLnBhcnNlID0gdXJsUGFyc2U7XG5leHBvcnRzLnJlc29sdmUgPSB1cmxSZXNvbHZlO1xuZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcbmV4cG9ydHMuZm9ybWF0ID0gdXJsRm9ybWF0O1xuXG5leHBvcnRzLlVybCA9IFVybDtcblxuZnVuY3Rpb24gVXJsKCkge1xuICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgdGhpcy5zbGFzaGVzID0gbnVsbDtcbiAgdGhpcy5hdXRoID0gbnVsbDtcbiAgdGhpcy5ob3N0ID0gbnVsbDtcbiAgdGhpcy5wb3J0ID0gbnVsbDtcbiAgdGhpcy5ob3N0bmFtZSA9IG51bGw7XG4gIHRoaXMuaGFzaCA9IG51bGw7XG4gIHRoaXMuc2VhcmNoID0gbnVsbDtcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuICB0aGlzLnBhdGggPSBudWxsO1xuICB0aGlzLmhyZWYgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cbiAgICAvLyBXZSBhY3R1YWxseSBqdXN0IGF1dG8tZXNjYXBlIHRoZXNlLlxuICAgIGRlbGltcyA9IFsnPCcsICc+JywgJ1wiJywgJ2AnLCAnICcsICdcXHInLCAnXFxuJywgJ1xcdCddLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbJ3snLCAnfScsICd8JywgJ1xcXFwnLCAnXicsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KHVud2lzZSksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbJy8nLCAnPycsICcjJ10sXG4gICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG4gICAgaG9zdG5hbWVQYXJ0UGF0dGVybiA9IC9eW2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oW2EtejAtOUEtWl8tXXswLDYzfSkoLiopJC8sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG4gICAgdW5zYWZlUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCFpc1N0cmluZyh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhcmFtZXRlciAndXJsJyBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgdXJsKTtcbiAgfVxuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55IGNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG4gICAgICAvLyBJdCBvbmx5IGNvbnZlcnRzIHRoZSBwYXJ0IG9mIHRoZSBkb21haW4gbmFtZSB0aGF0XG4gICAgICAvLyBoYXMgbm9uIEFTQ0lJIGNoYXJhY3RlcnMuIEkuZS4gaXQgZG9zZW50IG1hdHRlciBpZlxuICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgaW4gQVNDSUkuXG4gICAgICB2YXIgZG9tYWluQXJyYXkgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KCcuJyk7XG4gICAgICB2YXIgbmV3T3V0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbWFpbkFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzID0gZG9tYWluQXJyYXlbaV07XG4gICAgICAgIG5ld091dC5wdXNoKHMubWF0Y2goL1teQS1aYS16MC05Xy1dLykgP1xuICAgICAgICAgICAgJ3huLS0nICsgcHVueWNvZGUuZW5jb2RlKHMpIDogcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmhvc3RuYW1lID0gbmV3T3V0LmpvaW4oJy4nKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICB2YXIgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGFlKTtcbiAgICAgIGlmIChlc2MgPT09IGFlKSB7XG4gICAgICAgIGVzYyA9IGVzY2FwZShhZSk7XG4gICAgICB9XG4gICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY2hvcCBvZmYgZnJvbSB0aGUgdGFpbCBmaXJzdC5cbiAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2ggIT09IC0xKSB7XG4gICAgLy8gZ290IGEgZnJhZ21lbnQgc3RyaW5nLlxuICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIGhhc2gpO1xuICB9XG4gIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuICBpZiAocW0gIT09IC0xKSB7XG4gICAgdGhpcy5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG4gICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgdGhpcy5xdWVyeSA9IHt9O1xuICB9XG4gIGlmIChyZXN0KSB0aGlzLnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtsb3dlclByb3RvXSAmJlxuICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSAnLyc7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gIGlmICh0aGlzLnBhdGhuYW1lIHx8IHRoaXMuc2VhcmNoKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuICAgIHZhciBzID0gdGhpcy5zZWFyY2ggfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gcCArIHM7XG4gIH1cblxuICAvLyBmaW5hbGx5LCByZWNvbnN0cnVjdCB0aGUgaHJlZiBiYXNlZCBvbiB3aGF0IGhhcyBiZWVuIHZhbGlkYXRlZC5cbiAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3JtYXQgYSBwYXJzZWQgb2JqZWN0IGludG8gYSB1cmwgc3RyaW5nXG5mdW5jdGlvbiB1cmxGb3JtYXQob2JqKSB7XG4gIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG4gIC8vIElmIGl0J3MgYW4gb2JqLCB0aGlzIGlzIGEgbm8tb3AuXG4gIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGNhbGwgdXJsX2Zvcm1hdCgpIG9uIHN0cmluZ3NcbiAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cbiAgaWYgKGlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIGlzT2JqZWN0KHRoaXMucXVlcnkpICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCB8fCAocXVlcnkgJiYgKCc/JyArIHF1ZXJ5KSkgfHwgJyc7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIC8vIG9ubHkgdGhlIHNsYXNoZWRQcm90b2NvbHMgZ2V0IHRoZSAvLy4gIE5vdCBtYWlsdG86LCB4bXBwOiwgZXRjLlxuICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuICBpZiAodGhpcy5zbGFzaGVzIHx8XG4gICAgICAoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbFtwcm90b2NvbF0pICYmIGhvc3QgIT09IGZhbHNlKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lO1xuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnO1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2g7XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblxuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZShzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgcmV0dXJuIHRoaXMucmVzb2x2ZU9iamVjdCh1cmxQYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpKS5mb3JtYXQoKTtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHJlbGF0aXZlO1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIGlmIChpc1N0cmluZyhyZWxhdGl2ZSkpIHtcbiAgICB2YXIgcmVsID0gbmV3IFVybCgpO1xuICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuICAgIHJlbGF0aXZlID0gcmVsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBVcmwoKTtcbiAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgcmVzdWx0W2tdID0gdGhpc1trXTtcbiAgfSwgdGhpcyk7XG5cbiAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG4gIC8vIGV2ZW4gaHJlZj1cIlwiIHdpbGwgcmVtb3ZlIGl0LlxuICByZXN1bHQuaGFzaCA9IHJlbGF0aXZlLmhhc2g7XG5cbiAgLy8gaWYgdGhlIHJlbGF0aXZlIHVybCBpcyBlbXB0eSwgdGhlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkbyBoZXJlLlxuICBpZiAocmVsYXRpdmUuaHJlZiA9PT0gJycpIHtcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaHJlZnMgbGlrZSAvL2Zvby9iYXIgYWx3YXlzIGN1dCB0byB0aGUgcHJvdG9jb2wuXG4gIGlmIChyZWxhdGl2ZS5zbGFzaGVzICYmICFyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcbiAgICBPYmplY3Qua2V5cyhyZWxhdGl2ZSkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICBpZiAoayAhPT0gJ3Byb3RvY29sJylcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgfSk7XG5cbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXSAmJlxuICAgICAgICByZXN1bHQuaG9zdG5hbWUgJiYgIXJlc3VsdC5wYXRobmFtZSkge1xuICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuXG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChyZWxhdGl2ZS5wcm90b2NvbCAmJiByZWxhdGl2ZS5wcm90b2NvbCAhPT0gcmVzdWx0LnByb3RvY29sKSB7XG4gICAgLy8gaWYgaXQncyBhIGtub3duIHVybCBwcm90b2NvbCwgdGhlbiBjaGFuZ2luZ1xuICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuICAgIC8vIGZpcnN0LCBpZiBpdCdzIG5vdCBmaWxlOiwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBob3N0LFxuICAgIC8vIGFuZCBpZiB0aGVyZSB3YXMgYSBwYXRoXG4gICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuICAgIC8vIGlmIGl0IGlzIGZpbGU6LCB0aGVuIHRoZSBob3N0IGlzIGRyb3BwZWQsXG4gICAgLy8gYmVjYXVzZSB0aGF0J3Mga25vd24gdG8gYmUgaG9zdGxlc3MuXG4gICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuICAgIGlmICghc2xhc2hlZFByb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgT2JqZWN0LmtleXMocmVsYXRpdmUpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcbiAgICAgIH0pO1xuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIWlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIC8vIG5vIHBhdGggYXQgYWxsLiAgZWFzeS5cbiAgICAvLyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIG90aGVyIHN0dWZmIGFib3ZlLlxuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQuc2VhcmNoKSB7XG4gICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGlmIGEgdXJsIEVORHMgaW4gLiBvciAuLiwgdGhlbiBpdCBtdXN0IGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcbiAgLy8gdGhlbiBpdCBtdXN0IE5PVCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIGxhc3QgPSBzcmNQYXRoLnNsaWNlKC0xKVswXTtcbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG4gICAgICAocmVzdWx0Lmhvc3QgfHwgcmVsYXRpdmUuaG9zdCkgJiYgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fFxuICAgICAgbGFzdCA9PT0gJycpO1xuXG4gIC8vIHN0cmlwIHNpbmdsZSBkb3RzLCByZXNvbHZlIGRvdWJsZSBkb3RzIHRvIHBhcmVudCBkaXJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHNyY1BhdGgubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIGxhc3QgPSBzcmNQYXRoW2ldO1xuICAgIGlmIChsYXN0ID09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblxuICBpZiAobXVzdEVuZEFicyAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gc3JjUGF0aC5qb2luKCcvJyk7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmICghaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIWlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gIH1cbiAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcbiAgICB9XG4gICAgaG9zdCA9IGhvc3Quc3Vic3RyKDAsIGhvc3QubGVuZ3RoIC0gcG9ydC5sZW5ndGgpO1xuICB9XG4gIGlmIChob3N0KSB0aGlzLmhvc3RuYW1lID0gaG9zdDtcbn07XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIjtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gIGFyZyA9PSBudWxsO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3VybC91cmwuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8qISBodHRwczovL210aHMuYmUvcHVueWNvZGUgdjEuMy4yIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGVzICovXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHQhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChcblx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsXG5cdCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHVueWNvZGVgIG9iamVjdC5cblx0ICogQG5hbWUgcHVueWNvZGVcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHR2YXIgcHVueWNvZGUsXG5cblx0LyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cblx0LyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xuXHRiYXNlID0gMzYsXG5cdHRNaW4gPSAxLFxuXHR0TWF4ID0gMjYsXG5cdHNrZXcgPSAzOCxcblx0ZGFtcCA9IDcwMCxcblx0aW5pdGlhbEJpYXMgPSA3Mixcblx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0ZGVsaW1pdGVyID0gJy0nLCAvLyAnXFx4MkQnXG5cblx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0cmVnZXhQdW55Y29kZSA9IC9eeG4tLS8sXG5cdHJlZ2V4Tm9uQVNDSUkgPSAvW15cXHgyMC1cXHg3RV0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBSYW5nZUVycm9yKGVycm9yc1t0eXBlXSk7XG5cdH1cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGBBcnJheSNtYXBgIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeSBhcnJheVxuXHQgKiBpdGVtLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXAoYXJyYXksIGZuKSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0XHRyZXN1bHRbbGVuZ3RoXSA9IGZuKGFycmF5W2xlbmd0aF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc2ltcGxlIGBBcnJheSNtYXBgLWxpa2Ugd3JhcHBlciB0byB3b3JrIHdpdGggZG9tYWluIG5hbWUgc3RyaW5ncyBvciBlbWFpbFxuXHQgKiBhZGRyZXNzZXMuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuXHQgKiBjaGFyYWN0ZXIuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgc3RyaW5nIG9mIGNoYXJhY3RlcnMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrXG5cdCAqIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwRG9tYWluKHN0cmluZywgZm4pIHtcblx0XHR2YXIgcGFydHMgPSBzdHJpbmcuc3BsaXQoJ0AnKTtcblx0XHR2YXIgcmVzdWx0ID0gJyc7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdC8vIEluIGVtYWlsIGFkZHJlc3Nlcywgb25seSB0aGUgZG9tYWluIG5hbWUgc2hvdWxkIGJlIHB1bnljb2RlZC4gTGVhdmVcblx0XHRcdC8vIHRoZSBsb2NhbCBwYXJ0IChpLmUuIGV2ZXJ5dGhpbmcgdXAgdG8gYEBgKSBpbnRhY3QuXG5cdFx0XHRyZXN1bHQgPSBwYXJ0c1swXSArICdAJztcblx0XHRcdHN0cmluZyA9IHBhcnRzWzFdO1xuXHRcdH1cblx0XHQvLyBBdm9pZCBgc3BsaXQocmVnZXgpYCBmb3IgSUU4IGNvbXBhdGliaWxpdHkuIFNlZSAjMTcuXG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXhTZXBhcmF0b3JzLCAnXFx4MkUnKTtcblx0XHR2YXIgbGFiZWxzID0gc3RyaW5nLnNwbGl0KCcuJyk7XG5cdFx0dmFyIGVuY29kZWQgPSBtYXAobGFiZWxzLCBmbikuam9pbignLicpO1xuXHRcdHJldHVybiByZXN1bHQgKyBlbmNvZGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuXHQgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuXHQgKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcblx0ICogbWF0Y2hpbmcgVVRGLTE2LlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcblx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGRlY29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0ICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG5cdFx0ICAgIHZhbHVlLFxuXHRcdCAgICBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZW5jb2RlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuXHQgKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHQgKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRpZiAoY29kZVBvaW50IC0gNDggPCAxMCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDIyO1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gNjUgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDY1O1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gOTcgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDk3O1xuXHRcdH1cblx0XHRyZXR1cm4gYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuXHQgKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcblx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0ICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdFx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuXHQgKiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0XHR2YXIgayA9IDA7XG5cdFx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0XHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdFx0Ly8gRG9uJ3QgdXNlIFVDUy0yXG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHQgICAgb3V0LFxuXHRcdCAgICBpID0gMCxcblx0XHQgICAgbiA9IGluaXRpYWxOLFxuXHRcdCAgICBiaWFzID0gaW5pdGlhbEJpYXMsXG5cdFx0ICAgIGJhc2ljLFxuXHRcdCAgICBqLFxuXHRcdCAgICBpbmRleCxcblx0XHQgICAgb2xkaSxcblx0XHQgICAgdyxcblx0XHQgICAgayxcblx0XHQgICAgZGlnaXQsXG5cdFx0ICAgIHQsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBiYXNlTWludXNUO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdFx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0XHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHRcdGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0XHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0XHRiYXNpYyA9IDA7XG5cdFx0fVxuXG5cdFx0Zm9yIChqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0XHRlcnJvcignbm90LWJhc2ljJyk7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGopKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdFx0Ly8gcG9pbnRzIHdlcmUgY29waWVkOyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG90aGVyd2lzZS5cblxuXHRcdGZvciAoaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOyAvKiBubyBmaW5hbCBleHByZXNzaW9uICovKSB7XG5cblx0XHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHRcdC8vIERlY29kZSBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyIGludG8gYGRlbHRhYCxcblx0XHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdFx0Ly8gdmFsdWUgYXQgdGhlIGVuZCB0byBvYnRhaW4gYGRlbHRhYC5cblx0XHRcdGZvciAob2xkaSA9IGksIHcgPSAxLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblxuXHRcdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0XHRlcnJvcignaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0ID49IGJhc2UgfHwgZGlnaXQgPiBmbG9vcigobWF4SW50IC0gaSkgLyB3KSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA8IHQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXG5cdFx0XHR9XG5cblx0XHRcdG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdFx0YmlhcyA9IGFkYXB0KGkgLSBvbGRpLCBvdXQsIG9sZGkgPT0gMCk7XG5cblx0XHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdFx0aWYgKGZsb29yKGkgLyBvdXQpID4gbWF4SW50IC0gbikge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRcdGkgJT0gb3V0O1xuXG5cdFx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0XG5cdFx0XHRvdXRwdXQuc3BsaWNlKGkrKywgMCwgbik7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdWNzMmVuY29kZShvdXRwdXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG5cdCAqIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHRcdHZhciBuLFxuXHRcdCAgICBkZWx0YSxcblx0XHQgICAgaGFuZGxlZENQQ291bnQsXG5cdFx0ICAgIGJhc2ljTGVuZ3RoLFxuXHRcdCAgICBiaWFzLFxuXHRcdCAgICBqLFxuXHRcdCAgICBtLFxuXHRcdCAgICBxLFxuXHRcdCAgICBrLFxuXHRcdCAgICB0LFxuXHRcdCAgICBjdXJyZW50VmFsdWUsXG5cdFx0ICAgIG91dHB1dCA9IFtdLFxuXHRcdCAgICAvKiogYGlucHV0TGVuZ3RoYCB3aWxsIGhvbGQgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyBpbiBgaW5wdXRgLiAqL1xuXHRcdCAgICBpbnB1dExlbmd0aCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50UGx1c09uZSxcblx0XHQgICAgYmFzZU1pbnVzVCxcblx0XHQgICAgcU1pbnVzVDtcblxuXHRcdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIFVuaWNvZGVcblx0XHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG5cdFx0Ly8gQ2FjaGUgdGhlIGxlbmd0aFxuXHRcdGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGVcblx0XHRuID0gaW5pdGlhbE47XG5cdFx0ZGVsdGEgPSAwO1xuXHRcdGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHNcblx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoY3VycmVudFZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cblx0XHQvLyBgaGFuZGxlZENQQ291bnRgIGlzIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblx0XHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0XHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyAtIGlmIGl0IGlzIG5vdCBlbXB0eSAtIHdpdGggYSBkZWxpbWl0ZXJcblx0XHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRcdG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHRcdHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG5cblx0XHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0XHRmb3IgKG0gPSBtYXhJbnQsIGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93XG5cdFx0XHRoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0XHRpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRcdG4gPSBtO1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHQvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlclxuXHRcdFx0XHRcdGZvciAocSA9IGRlbHRhLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcdFx0XHRcdFx0aWYgKHEgPCB0KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goXG5cdFx0XHRcdFx0XHRcdHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCsrZGVsdGE7XG5cdFx0XHQrK247XG5cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzXG5cdCAqIHRvIFVuaWNvZGUuIE9ubHkgdGhlIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgaW5wdXQgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS5cblx0ICogaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgb24gYSBzdHJpbmcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuXG5cdCAqIGNvbnZlcnRlZCB0byBVbmljb2RlLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZWQgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBjb252ZXJ0IHRvIFVuaWNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVbmljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBQdW55Y29kZVxuXHQgKiBzdHJpbmcuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b1VuaWNvZGUoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/IGRlY29kZShzdHJpbmcuc2xpY2UoNCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIFB1bnljb2RlLiBPbmx5IHRoZSBub24tQVNDSUkgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHdpbGwgYmUgY29udmVydGVkLFxuXHQgKiBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW5cblx0ICogQVNDSUkuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG8gY29udmVydCwgYXMgYVxuXHQgKiBVbmljb2RlIHN0cmluZy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFB1bnljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBkb21haW4gbmFtZSBvclxuXHQgKiBlbWFpbCBhZGRyZXNzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9BU0NJSShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gJ3huLS0nICsgZW5jb2RlKHN0cmluZylcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG5cdHB1bnljb2RlID0ge1xuXHRcdC8qKlxuXHRcdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBTdHJpbmdcblx0XHQgKi9cblx0XHQndmVyc2lvbic6ICcxLjMuMicsXG5cdFx0LyoqXG5cdFx0ICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcblx0XHQgKiByZXByZXNlbnRhdGlvbiAoVUNTLTIpIHRvIFVuaWNvZGUgY29kZSBwb2ludHMsIGFuZCBiYWNrLlxuXHRcdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIE9iamVjdFxuXHRcdCAqL1xuXHRcdCd1Y3MyJzoge1xuXHRcdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0XHQnZW5jb2RlJzogdWNzMmVuY29kZVxuXHRcdH0sXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0XHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG5cdH07XG5cblx0LyoqIEV4cG9zZSBgcHVueWNvZGVgICovXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKCdwdW55Y29kZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHB1bnljb2RlO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IHB1bnljb2RlO1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5wdW55Y29kZSA9IHB1bnljb2RlO1xuXHR9XG5cbn0odGhpcykpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3VybC9+L3B1bnljb2RlL3B1bnljb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZy9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrXS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBUaGUgRE9NU3RvcmFnZVxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIERPTVN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIHNob3VsZCBhY2NlcHQgYSBoYXNoIHRvIHNlcGFyYXRlIHRoZSBzY29wZXMgb2Ygc3RvcmFnZVxuICAgICAqIEBwYXJhbSBoYXNoIHtzdHJpbmd9XG4gICAgICovXG4gICAgZnVuY3Rpb24gRE9NU3RvcmFnZShoYXNoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBET01TdG9yYWdlKTtcblxuICAgICAgICB0aGlzLnJlZ1ZhbGlkS2V5ID0gbmV3IFJlZ0V4cChcIihbYS16QS1aMC05Xy1dezAsfSlcIiwgXCJpXCIpO1xuICAgICAgICB0aGlzLmhhc2ggPSBoYXNoIHx8IGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgICAgICB0aGlzLmRvbVN0b3JhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmhhc2gpO1xuICAgICAgICBpZiAoIXRoaXMuZG9tU3RvcmFnZSkge1xuICAgICAgICAgICAgdGhpcy5kb21TdG9yYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRoaXMuZG9tU3RvcmFnZS5pZCA9IHRoaXMuaGFzaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbVN0b3JhZ2UpO1xuICAgICAgICAgICAgdGhpcy5kb21TdG9yYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5oYXNoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbVN0b3JhZ2Uuc3R5bGUuYmVoYXZpb3IgPSBcInVybCgjZGVmYXVsdCN1c2VyRGF0YSlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGZsYWcgd2hldGhlciBzdXBwb3J0ZWQgdGhpcyBzdG9yYWdlIHR5cGUgb3Igbm90XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIERPTVN0b3JhZ2UucHJvdG90eXBlLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiBfdHlwZW9mKHRoaXMuZG9tU3RvcmFnZSkgPT09IFwib2JqZWN0XCIgJiYgX3R5cGVvZih0aGlzLmRvbVN0b3JhZ2UucGFyZW50Tm9kZSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHRoaXMuZG9tU3RvcmFnZS5hZGRCZWhhdmlvciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2Qgc2V0cyB0aGUgdmFsdWUgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBoYXMgYmVlbiBzZXRcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET01TdG9yYWdlLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICh2YWx1ZSA9PT0gXCJcIiB8fCB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3QodmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNldCBkb20gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tU3RvcmFnZS5zZXRBdHRyaWJ1dGUobG9jYWxLZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21TdG9yYWdlLnNhdmUodGhpcy5oYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAgICovXG5cblxuICAgIERPTVN0b3JhZ2UucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tU3RvcmFnZS5sb2FkKHRoaXMuaGFzaCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZG9tU3RvcmFnZS5nZXRBdHRyaWJ1dGUobG9jYWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgdmFsdWUgZXhpc3QsIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgcmVtb3ZlcyB0aGUgdmFsdWUgYW5kIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET01TdG9yYWdlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIHRoaXMucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQ2xlYW4gdmFsdWUgYW5kIHJlbW92ZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tU3RvcmFnZS5yZW1vdmVBdHRyaWJ1dGUobG9jYWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbVN0b3JhZ2Uuc2F2ZSh0aGlzLmhhc2gpO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuXG5cbiAgICBET01TdG9yYWdlLnByb3RvdHlwZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cygpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBUaGUgYXJyYXkgb2YgYXZhaWxhYmxlIGtleXNcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFycktleXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEdldCB0aGUgYXJyYXkgZnJvbSBkb2N1bWVudCBjb29raWUgc3BsaXQgYnkgO1xuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYWxBcnJLZXlzID0gdGhpcy5kb21TdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBnbG9iYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2FsQXJyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGxvY2FsQXJyS2V5c1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiB0aGUga2V5IGNvbnRhaW5zIGhhc2ggYWRkIGl0IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmhhc2gpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQWRkIGtleSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycktleXMucHVzaChrZXkuc3Vic3RyKHRoaXMuaGFzaC5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycktleXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET01TdG9yYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFycktleXMgPSB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycktleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycktleXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRE9NU3RvcmFnZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRE9NU3RvcmFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9TdG9yYWdlcy9ET01TdG9yYWdlLnRzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFRoZSBHbG9iYWxTdG9yYWdlXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgR2xvYmFsU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3Igc2hvdWxkIGFjY2VwdCBhIGhhc2ggdG8gc2VwYXJhdGUgdGhlIHNjb3BlcyBvZiBzdG9yYWdlXG4gICAgICogQHBhcmFtIGhhc2gge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBHbG9iYWxTdG9yYWdlKGhhc2gpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdsb2JhbFN0b3JhZ2UpO1xuXG4gICAgICAgIHRoaXMucmVnVmFsaWRLZXkgPSBuZXcgUmVnRXhwKFwiKFthLXpBLVowLTlfLV17MCx9KVwiLCBcImlcIik7XG4gICAgICAgIHRoaXMuaGFzaCA9IGhhc2ggfHwgbG9jYXRpb24uaG9zdG5hbWU7XG4gICAgICAgIGlmICghd2luZG93Lmdsb2JhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHdpbmRvdy5nbG9iYWxTdG9yYWdlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF3aW5kb3cuZ2xvYmFsU3RvcmFnZVtkb2N1bWVudC5kb21haW5dKSB7XG4gICAgICAgICAgICB3aW5kb3cuZ2xvYmFsU3RvcmFnZVtkb2N1bWVudC5kb21haW5dID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nbG9iYWxTdG9yYWdlID0gd2luZG93Lmdsb2JhbFN0b3JhZ2VbZG9jdW1lbnQuZG9tYWluXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBHbG9iYWxTdG9yYWdlLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gX3R5cGVvZih0aGlzLmdsb2JhbFN0b3JhZ2UpID09PSBcIm9iamVjdFwiO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEdsb2JhbFN0b3JhZ2UucHJvdG90eXBlLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgKHZhbHVlID09PSBcIlwiIHx8IHRoaXMucmVnVmFsaWRLZXkudGVzdCh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogU2V0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFN0b3JhZ2VbbG9jYWxLZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgcmVhZHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIGl0IG9yIHJldHVybnMgZmFsc2UgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBHbG9iYWxTdG9yYWdlLnByb3RvdHlwZS5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIHRoaXMucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogR2V0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmdsb2JhbFN0b3JhZ2VbbG9jYWxLZXldO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgdmFsdWUgZXhpc3QsIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgcmVtb3ZlcyB0aGUgdmFsdWUgYW5kIHJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBHbG9iYWxTdG9yYWdlLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIHRoaXMucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogQ2xlYW4gdmFsdWUgYW5kIHJlbW92ZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RvcmFnZVtsb2NhbEtleV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZ2xvYmFsU3RvcmFnZVtsb2NhbEtleV07XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgYXJyYXkgb2Ygc3RyaW5nIG9mIGF2YWlsYWJsZSBrZXlzXG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG5cblxuICAgIEdsb2JhbFN0b3JhZ2UucHJvdG90eXBlLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbEFycktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmdsb2JhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBnbG9iYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBsb2NhbEFycktleXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiB0aGUga2V5IGNvbnRhaW5zIGhhc2ggYWRkIGl0IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmhhc2gpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQWRkIGtleSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycktleXMucHVzaChrZXkuc3Vic3RyKHRoaXMuaGFzaC5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycktleXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBHbG9iYWxTdG9yYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFycktleXMgPSB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycktleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJLZXlzLCBfaXNBcnJheTIgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjIpLCBfaTIgPSAwLCBfaXRlcmF0b3IyID0gX2lzQXJyYXkyID8gX2l0ZXJhdG9yMiA6IF9pdGVyYXRvcjJbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pMiA9IF9pdGVyYXRvcjIubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kyLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IF9yZWYyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gR2xvYmFsU3RvcmFnZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gR2xvYmFsU3RvcmFnZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9TdG9yYWdlcy9HbG9iYWxTdG9yYWdlLnRzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFRoZSBMb2NhbFN0b3JhZ2VcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBzaG91bGQgYWNjZXB0IGEgaGFzaCB0byBzZXBhcmF0ZSB0aGUgc2NvcGVzIG9mIHN0b3JhZ2VcbiAgICAgKiBAcGFyYW0gaGFzaCB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExvY2FsU3RvcmFnZShoYXNoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMb2NhbFN0b3JhZ2UpO1xuXG4gICAgICAgIHRoaXMucmVnVmFsaWRLZXkgPSBuZXcgUmVnRXhwKFwiKFthLXpBLVowLTlfLV17MCx9KVwiLCBcImlcIik7XG4gICAgICAgIHRoaXMuaGFzaCA9IGhhc2ggfHwgbG9jYXRpb24uaG9zdG5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgZmxhZyB3aGV0aGVyIHN1cHBvcnRlZCB0aGlzIHN0b3JhZ2UgdHlwZSBvciBub3RcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgTG9jYWxTdG9yYWdlLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHdpbmRvdy5sb2NhbFN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHNldHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaGFzIGJlZW4gc2V0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgTG9jYWxTdG9yYWdlLnByb3RvdHlwZS5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICh2YWx1ZSA9PT0gXCJcIiB8fCB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3QodmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNldCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsS2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgcmVhZHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIGl0IG9yIHJldHVybnMgZmFsc2UgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge3N0cmluZ3xib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBMb2NhbFN0b3JhZ2UucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbEtleSk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiB2YWx1ZSBleGlzdCwgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIExvY2FsU3RvcmFnZS5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oKSB7XG4gICAgICAgIHZhciBjaGVja1N1cHBvcnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XG4gICAgICAgIHZhciBrZXkgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBUaGUgaGFzaCBuZWVkcyBmb3Igc3BsaXR0aW5nIHNjb3BlcyBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYWxLZXkgPSB0aGlzLmhhc2ggKyBcIl9cIiArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIENsZWFuIHZhbHVlIGFuZCByZW1vdmVcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuXG5cbiAgICBMb2NhbFN0b3JhZ2UucHJvdG90eXBlLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2Uua2V5KGkpLmluZGV4T2YodGhpcy5oYXNoKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycktleXMucHVzaCh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKS5zdWJzdHIodGhpcy5oYXNoLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogUmV0dXJuIGtleXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJLZXlzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCBjbGVhbnMgdGhlIHN0b3JhZ2UgYW5kIHJldHVybiB0cnVlIGlmIGl0IGlzIGVtcHR5XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgTG9jYWxTdG9yYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFycktleXMgPSB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycktleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycktleXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gTG9jYWxTdG9yYWdlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBMb2NhbFN0b3JhZ2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvU3RvcmFnZXMvTG9jYWxTdG9yYWdlLnRzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFRoZSBTZXNzaW9uU3RvcmFnZVxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTZXNzaW9uU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3Igc2hvdWxkIGFjY2VwdCBhIGhhc2ggdG8gc2VwYXJhdGUgdGhlIHNjb3BlcyBvZiBzdG9yYWdlXG4gICAgICogQHBhcmFtIGhhc2gge3N0cmluZ31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTZXNzaW9uU3RvcmFnZShoYXNoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTZXNzaW9uU3RvcmFnZSk7XG5cbiAgICAgICAgdGhpcy5yZWdWYWxpZEtleSA9IG5ldyBSZWdFeHAoXCIoW2EtekEtWjAtOV8tXXswLH0pXCIsIFwiaVwiKTtcbiAgICAgICAgdGhpcy5oYXNoID0gaGFzaCB8fCBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBTZXNzaW9uU3RvcmFnZS5wcm90b3R5cGUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHNldHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaGFzIGJlZW4gc2V0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgU2Vzc2lvblN0b3JhZ2UucHJvdG90eXBlLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgKHZhbHVlID09PSBcIlwiIHx8IHRoaXMucmVnVmFsaWRLZXkudGVzdCh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFRoZSBoYXNoIG5lZWRzIGZvciBzcGxpdHRpbmcgc2NvcGVzIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbEtleSA9IHRoaXMuaGFzaCArIFwiX1wiICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogU2V0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShsb2NhbEtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHJlYWRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyBpdCBvciByZXR1cm5zIGZhbHNlIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgU2Vzc2lvblN0b3JhZ2UucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGxvY2FsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIHZhbHVlIGV4aXN0LCByZXR1cm4gaXRcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHJlbW92ZXMgdGhlIHZhbHVlIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgU2Vzc2lvblN0b3JhZ2UucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiByZW1vdmVJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGhhc2ggbmVlZHMgZm9yIHNwbGl0dGluZyBzY29wZXMgc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsS2V5ID0gdGhpcy5oYXNoICsgXCJfXCIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBDbGVhbiB2YWx1ZSBhbmQgcmVtb3ZlXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGFycmF5IG9mIHN0cmluZyBvZiBhdmFpbGFibGUga2V5c1xuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuXG5cbiAgICBTZXNzaW9uU3RvcmFnZS5wcm90b3R5cGUuZ2V0S2V5cyA9IGZ1bmN0aW9uIGdldEtleXMoKSB7XG4gICAgICAgIHZhciBjaGVja1N1cHBvcnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IHRoaXMuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGFycmF5IG9mIGF2YWlsYWJsZSBrZXlzXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnJLZXlzID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIFNlc3Npb25TdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5rZXkoaSkuaW5kZXhPZih0aGlzLmhhc2gpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyS2V5cy5wdXNoKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5rZXkoaSkuc3Vic3RyKHRoaXMuaGFzaC5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFJldHVybiBrZXlzXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyS2V5cztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIFNlc3Npb25TdG9yYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCB0aGlzLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFycktleXMgPSB0aGlzLmdldEtleXMoY2hlY2tTdXBwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycktleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycktleXMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5cyhjaGVja1N1cHBvcnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gU2Vzc2lvblN0b3JhZ2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNlc3Npb25TdG9yYWdlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1N0b3JhZ2VzL1Nlc3Npb25TdG9yYWdlLnRzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIl0sInNvdXJjZVJvb3QiOiIifQ==