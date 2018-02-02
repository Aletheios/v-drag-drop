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
var dragInProgressKey = null;

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
        var namespace = binding.arg || null;
        var listeners = getListeners(vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only transfer the key and use an external store for the actual data
        var transferKey = +new Date() + '';

        el.addEventListener('dragstart', function (event) {
            dragInProgressKey = transferKey;

            transferredData[transferKey] = {
                dragData: dragData,
                namespace: namespace,
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text', transferKey);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';

            if (listeners['drag-start']) {
                listeners['drag-start'](dragData);
            }
        }, false);

        el.addEventListener('dragend', function () {
            dragInProgressKey = null;

            if (transferredData[transferKey]) {
                if (typeof transferredData[transferKey].onDropCallback === 'function') {
                    var callback = transferredData[transferKey].onDropCallback;
                    setTimeout(function () {
                        return callback();
                    }, 0);
                }
                delete transferredData[transferKey];
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
        var dropTargetNamespace = binding.arg || null;

        function getDraggedConfig(key) {
            if (!key) {
                return null;
            }
            return transferredData[key] || null;
        }

        // Necessary to enable drop event
        el.addEventListener('dragenter', function (event) {
            event.preventDefault();

            if (listeners['drag-enter']) {
                var _getDraggedConfig = getDraggedConfig(dragInProgressKey),
                    dragData = _getDraggedConfig.dragData;

                listeners['drag-enter'](dragData);
            }
        }, false);

        el.addEventListener('dragover', function (event) {
            var _getDraggedConfig2 = getDraggedConfig(dragInProgressKey),
                dragData = _getDraggedConfig2.dragData,
                namespace = _getDraggedConfig2.namespace;

            if (!namespace || !dropTargetNamespace || namespace === dropTargetNamespace) {
                event.preventDefault(); // required to allow dropping
            }

            if (listeners['drag-over']) {
                listeners['drag-over'](dragData);
            }
        }, false);

        el.addEventListener('dragleave', function (event) {
            event.preventDefault();

            if (listeners['drag-leave']) {
                var _getDraggedConfig3 = getDraggedConfig(dragInProgressKey),
                    dragData = _getDraggedConfig3.dragData;

                listeners['drag-leave'](dragData);
            }
        }, false);

        el.addEventListener('drop', function (event) {
            event.stopPropagation();
            event.preventDefault();

            var key = event.dataTransfer.getData('text');

            var _getDraggedConfig4 = getDraggedConfig(key),
                dragData = _getDraggedConfig4.dragData;

            transferredData[key].onDropCallback = function () {
                if (listeners['drag-leave']) {
                    listeners['drag-leave'](dragData);
                }
                if (listeners['drag-drop']) {
                    listeners['drag-drop'](dragData);
                }
            };
        }, false);
    }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=vDragDrop.js.map