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
module.exports = exports['default'];

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