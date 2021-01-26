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

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setDragInProgressKey = setDragInProgressKey;
  _exports.setElementData = setElementData;
  _exports.getElementData = getElementData;
  _exports.forgetElement = forgetElement;
  _exports.getNamespace = getNamespace;
  _exports.emit = emit;
  _exports.dragInProgressKey = _exports.transferredData = void 0;
  var elementMap = new WeakMap();
  var transferredData = {};
  _exports.transferredData = transferredData;
  var dragInProgressKey = null;
  _exports.dragInProgressKey = dragInProgressKey;

  function setDragInProgressKey(key) {
    _exports.dragInProgressKey = dragInProgressKey = key;
  }

  function setElementData(el, binding, vnode) {
    elementMap.set(el, {
      binding: binding,
      vnode: vnode
    });
  }

  function getElementData(el) {
    return elementMap.get(el);
  }

  function forgetElement(el) {
    elementMap.delete(el);
  }

  function getNamespace(el) {
    var _getElementData = getElementData(el),
        binding = _getElementData.binding;

    return binding.arg;
  }

  function emit(el, event) {
    var _getElementData2 = getElementData(el),
        vnode = _getElementData2.vnode;

    if (vnode.props && vnode.props[event]) {
      var _vnode$props;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      (_vnode$props = vnode.props)[event].apply(_vnode$props, args);
    }
  }
});

/***/ }),

/***/ "./src/draggable.js":
/*!**************************!*\
  !*** ./src/draggable.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./common */ "./src/common.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _common) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function getDragValue(el) {
    var _getElementData = (0, _common.getElementData)(el),
        binding = _getElementData.binding;

    return binding.modifiers.image ? binding.value.data : binding.value;
  }

  var _default = {
    updated: function updated(el, binding, vnode) {
      (0, _common.setElementData)(el, binding, vnode);
    },
    beforeUnmount: function beforeUnmount(el) {
      (0, _common.forgetElement)(el);
    },
    mounted: function mounted(el, binding, vnode) {
      (0, _common.setElementData)(el, binding, vnode);
      el.setAttribute('draggable', true);

      if (binding.modifiers && binding.modifiers.move) {
        el.style.cursor = 'move';
      } // Only transfer the key and use an external store for the actual data


      var transferKey = Date.now() + '';
      el.addEventListener('dragstart', function (event) {
        var dragData = getDragValue(el);
        (0, _common.setDragInProgressKey)(transferKey);
        _common.transferredData[transferKey] = {
          dragData: dragData,
          namespace: (0, _common.getNamespace)(el),
          onDropCallback: null // will be set in droppable directive

        };
        event.dataTransfer.setData('text/plain', transferKey);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';

        var _getElementData2 = (0, _common.getElementData)(el),
            _binding = _getElementData2.binding;

        if (_binding.modifiers.image) {
          event.dataTransfer.setDragImage(_binding.value.image, 10, 10);
        }

        (0, _common.emit)(el, 'onVDragStart', dragData, event);
      }, false);
      el.addEventListener('drag', function (event) {
        (0, _common.emit)(el, 'onVDragMove', getDragValue(el), event);
      });
      el.addEventListener('dragend', function (event) {
        (0, _common.setDragInProgressKey)(null);

        if (_common.transferredData[transferKey]) {
          if (typeof _common.transferredData[transferKey].onDropCallback === 'function') {
            var callback = _common.transferredData[transferKey].onDropCallback;
            setTimeout(function () {
              return callback();
            }, 0);
          }

          delete _common.transferredData[transferKey];
        }

        (0, _common.emit)(el, 'onVDragEnd', getDragValue(el), event);
      });
    }
  };
  _exports.default = _default;
  module.exports = exports.default;
});

/***/ }),

/***/ "./src/droppable.js":
/*!**************************!*\
  !*** ./src/droppable.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./common */ "./src/common.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _common) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    updated: function updated(el, binding, vnode) {
      (0, _common.setElementData)(el, binding, vnode);
    },
    beforeUnmount: function beforeUnmount(el) {
      (0, _common.forgetElement)(el);
    },
    mounted: function mounted(el, binding, vnode) {
      function isDropAllowed() {
        var dropTargetNamespace = (0, _common.getNamespace)(el);
        var namespace = _common.transferredData[_common.dragInProgressKey].namespace;
        return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
      }

      (0, _common.setElementData)(el, binding, vnode);
      el.addEventListener('dragenter', function (event) {
        event.preventDefault();
        var dragData = _common.transferredData[_common.dragInProgressKey].dragData;
        (0, _common.emit)(el, 'onVDragEnter', dragData, isDropAllowed(), event);
      }, false);
      el.addEventListener('dragover', function (event) {
        var dragData = _common.transferredData[_common.dragInProgressKey].dragData;
        var dropAllowed = isDropAllowed();

        if (dropAllowed) {
          event.preventDefault(); // required to allow dropping
        }

        (0, _common.emit)(el, 'onVDragOver', dragData, dropAllowed, event);
      }, false);
      el.addEventListener('dragleave', function (event) {
        event.preventDefault();
        var dragData = _common.transferredData[_common.dragInProgressKey].dragData;
        (0, _common.emit)(el, 'onVDragLeave', dragData, isDropAllowed(), event);
      }, false);
      el.addEventListener('drop', function (event) {
        if (!isDropAllowed()) {
          return event.preventDefault();
        }

        event.stopPropagation();
        event.preventDefault();
        var transferKey = event.dataTransfer.getData('text');
        var dragData = _common.transferredData[transferKey].dragData;

        _common.transferredData[transferKey].onDropCallback = function () {
          (0, _common.emit)(el, 'onVDragLeave', dragData, true, event);
          (0, _common.emit)(el, 'onVDragDrop', dragData, true, event);
        };
      }, false);
    }
  };
  _exports.default = _default;
  module.exports = exports.default;
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./draggable */ "./src/draggable.js"), __webpack_require__(/*! ./droppable */ "./src/droppable.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _draggable, _droppable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _draggable = _interopRequireDefault(_draggable);
  _droppable = _interopRequireDefault(_droppable);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = {
    draggable: _draggable.default,
    droppable: _droppable.default,
    install: function install(Vue) {
      Vue.directive('draggable', _draggable.default);
      Vue.directive('droppable', _droppable.default);
    }
  };
  _exports.default = _default;
  module.exports = exports.default;
});

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /srv/www/Projects/try-outs/v-drag-drop/src/index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=vDragDrop.js.map