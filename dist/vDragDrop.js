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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    }
};
module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _draggable = __webpack_require__(3);

var _draggable2 = _interopRequireDefault(_draggable);

var _droppable = __webpack_require__(4);

var _droppable2 = _interopRequireDefault(_droppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    install: function install(Vue) {
        Vue.directive('draggable', _draggable2.default);
        Vue.directive('droppable', _droppable2.default);
    }
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = __webpack_require__(0);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    inserted: function inserted(el, binding, vnode) {
        var dragData = binding.value;
        var namespace = binding.arg || null;
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

        el.addEventListener('drag', function () {
            if (listeners['drag-move']) {
                listeners['drag-move'](dragData);
            }
        }, false);

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
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = __webpack_require__(0);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    inserted: function inserted(el, binding, vnode) {
        var listeners = _common2.default.getListeners(vnode);
        var dropTargetNamespace = binding.arg || null;

        function getDraggedConfig(key) {
            if (!key) {
                return null;
            }
            return _common2.default.transferredData[key] || null;
        }

        // Necessary to enable drop event
        el.addEventListener('dragenter', function (event) {
            event.preventDefault();

            if (listeners['drag-enter']) {
                var _getDraggedConfig = getDraggedConfig(_common2.default.dragInProgressKey),
                    dragData = _getDraggedConfig.dragData;

                listeners['drag-enter'](dragData);
            }
        }, false);

        el.addEventListener('dragover', function (event) {
            var _getDraggedConfig2 = getDraggedConfig(_common2.default.dragInProgressKey),
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
                var _getDraggedConfig3 = getDraggedConfig(_common2.default.dragInProgressKey),
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

            _common2.default.transferredData[key].onDropCallback = function () {
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
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=vDragDrop.js.map