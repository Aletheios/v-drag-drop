(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vDragDrop", [], factory);
	else if(typeof exports === 'object')
		exports["vDragDrop"] = factory();
	else
		root["vDragDrop"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    transferredData: {},
    dragInProgressKey: null,

    getListeners: function getListeners(vnode) {
        if (vnode.data && vnode.data.on) {
            return vnode.data.on;
        }
        if (vnode.componentOptions && vnode.componentOptions.listeners) {
            return vnode.componentOptions.listeners;
        }
        return {};
    },
    getNamespace: function getNamespace(binding, vnode) {
        var argument = binding.arg;
        if (typeof argument !== 'string') {
            return null;
        }
        if (binding.modifiers.dynamic) {
            var namespace = vnode.context[argument];
            return typeof namespace !== 'string' ? null : namespace;
        }
        return argument;
    }
};
module.exports = exports.default;

/***/ }),

/***/ "./src/draggable.js":
/*!**************************!*\
  !*** ./src/draggable.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = __webpack_require__(/*! @/common */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    inserted: function inserted(el, binding, vnode) {
        var dragData = binding.value;
        var listeners = _common2.default.getListeners(vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only transfer the key and use an external store for the actual data
        var transferKey = +new Date() + '';

        el.addEventListener('dragstart', function (event) {
            _common2.default.dragInProgressKey = transferKey;

            _common2.default.transferredData[transferKey] = {
                dragData: dragData,
                namespace: _common2.default.getNamespace(binding, vnode),
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text', transferKey);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';

            if (listeners['drag-start']) {
                listeners['drag-start'](dragData);
            }
        }, false);

        el.addEventListener('drag', function () {
            if (binding.modifiers.dynamic) {
                _common2.default.transferredData[transferKey].namespace = _common2.default.getNamespace(binding, vnode);
            }

            if (listeners['drag-move']) {
                listeners['drag-move'](dragData);
            }
        });

        el.addEventListener('dragend', function () {
            _common2.default.dragInProgressKey = null;

            if (_common2.default.transferredData[transferKey]) {
                if (typeof _common2.default.transferredData[transferKey].onDropCallback === 'function') {
                    var callback = _common2.default.transferredData[transferKey].onDropCallback;
                    setTimeout(function () {
                        return callback();
                    }, 0);
                }
                delete _common2.default.transferredData[transferKey];
            }

            if (listeners['drag-end']) {
                listeners['drag-end'](dragData);
            }
        });
    }
};
module.exports = exports.default;

/***/ }),

/***/ "./src/droppable.js":
/*!**************************!*\
  !*** ./src/droppable.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = __webpack_require__(/*! @/common */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    inserted: function inserted(el, binding, vnode) {
        var listeners = _common2.default.getListeners(vnode);

        function isDropAllowed() {
            var dropTargetNamespace = _common2.default.getNamespace(binding, vnode);
            var namespace = _common2.default.transferredData[_common2.default.dragInProgressKey].namespace;

            return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
        }

        el.addEventListener('dragenter', function (event) {
            event.preventDefault();

            if (listeners['drag-enter']) {
                var dragData = _common2.default.transferredData[_common2.default.dragInProgressKey].dragData;

                listeners['drag-enter'](dragData, isDropAllowed());
            }
        }, false);

        el.addEventListener('dragover', function (event) {
            var dragData = _common2.default.transferredData[_common2.default.dragInProgressKey].dragData;

            var dropAllowed = isDropAllowed();

            if (dropAllowed) {
                event.preventDefault(); // required to allow dropping
            }

            if (listeners['drag-over']) {
                listeners['drag-over'](dragData, dropAllowed);
            }
        }, false);

        el.addEventListener('dragleave', function (event) {
            event.preventDefault();

            if (listeners['drag-leave']) {
                var dragData = _common2.default.transferredData[_common2.default.dragInProgressKey].dragData;

                listeners['drag-leave'](dragData, isDropAllowed());
            }
        }, false);

        el.addEventListener('drop', function (event) {
            event.stopPropagation();
            event.preventDefault();

            var transferKey = event.dataTransfer.getData('text');
            var dragData = _common2.default.transferredData[transferKey].dragData;


            _common2.default.transferredData[transferKey].onDropCallback = function () {
                if (listeners['drag-leave']) {
                    listeners['drag-leave'](dragData, true);
                }
                if (listeners['drag-drop']) {
                    listeners['drag-drop'](dragData, event);
                }
            };
        }, false);
    }
};
module.exports = exports.default;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _draggable = __webpack_require__(/*! @/draggable */ "./src/draggable.js");

var _draggable2 = _interopRequireDefault(_draggable);

var _droppable = __webpack_require__(/*! @/droppable */ "./src/droppable.js");

var _droppable2 = _interopRequireDefault(_droppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: function install(Vue) {
        Vue.directive('draggable', _draggable2.default);
        Vue.directive('droppable', _droppable2.default);
    }
};
module.exports = exports.default;

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Simon\Code\_opensource\v-drag-drop\src\index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=vDragDrop.js.map