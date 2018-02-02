(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vDragDrop", [], factory);
	else if(typeof exports === 'object')
		exports["vDragDrop"] = factory();
	else
		root["vDragDrop"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vDragDrop = __webpack_require__(2);

exports.default = {
    install: function install(Vue) {
        Vue.directive('draggable', _vDragDrop.draggable);
        Vue.directive('droppable', _vDragDrop.droppable);
    }
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var transferredData = {};

function getListeners(vnode) {
    if (vnode.data && vnode.data.on) {
        return vnode.data.on;
    }
    if (vnode.componentOptions && vnode.componentOptions.listeners) {
        return vnode.componentOptions.listeners;
    }
    return {};
}

var draggable = exports.draggable = {
    inserted: function inserted(el, binding, vnode) {
        var dragData = binding.value;
        var listeners = getListeners(vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only strings are supported in dataTransfer, therefore we only transfer the key and use an external store
        var transferKey = +new Date() + '';

        el.addEventListener('dragstart', function (event) {
            if (listeners['drag-start']) {
                listeners['drag-start'](dragData);
            }

            transferredData[transferKey] = {
                dragData: dragData,
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text', transferKey);

            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';
        }, false);

        el.addEventListener('dragend', function () {
            if (transferredData[transferKey]) {
                if (typeof transferredData[transferKey].onDropCallback === 'function') {
                    var callback = transferredData[transferKey].onDropCallback;
                    setTimeout(function () {
                        return callback();
                    }, 0);
                }
                delete transferredData[transferKey];
            } else {
                console.warn('v-drag-drop: No draggable data found!'); // eslint-disable-line
            }

            if (listeners['drag-end']) {
                listeners['drag-end'](dragData);
            }
        });
    }
};

var droppable = exports.droppable = {
    inserted: function inserted(el, binding, vnode) {
        var listeners = getListeners(vnode);

        // Necessary to enable drop event
        el.addEventListener('dragenter', function (event) {
            event.preventDefault();
        }, false);
        el.addEventListener('dragover', function (event) {
            event.preventDefault();
        }, false);

        el.addEventListener('drop', function (event) {
            event.stopPropagation();
            event.preventDefault();

            var key = event.dataTransfer.getData('text');
            var data = transferredData[key] ? transferredData[key].dragData : null;
            if (!data) {
                console.warn('v-drag-drop: No droppable data found!'); // eslint-disable-line
            }

            transferredData[key].onDropCallback = function () {
                if (listeners['drag-drop'] && data) {
                    listeners['drag-drop'](data);
                }
            };
        }, false);
    }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=vDragDrop.js.map