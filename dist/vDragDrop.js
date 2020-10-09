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
  _exports.default = void 0;
  var _default = {
    transferredData: {},
    dragInProgressKey: null,
    getNamespace: function getNamespace(binding) {
      var argument = binding.arg;

      if (typeof argument !== 'string') {
        return null;
      }

      if (binding.modifiers.dynamic) {
        var namespace = binding.instance[argument];
        return typeof namespace !== 'string' ? null : namespace;
      }

      return argument;
    }
  };
  _exports.default = _default;
  module.exports = exports.default;
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
  _common = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = {
    mounted: function mounted(el, binding, vnode) {
      var dragData = binding.modifiers.image ? binding.value.data : binding.value;
      el.setAttribute('draggable', true);

      if (binding.modifiers && binding.modifiers.move) {
        el.style.cursor = 'move';
      } // Only transfer the key and use an external store for the actual data


      var transferKey = +new Date() + '';
      el.addEventListener('dragstart', function (event) {
        _common.default.dragInProgressKey = transferKey;
        _common.default.transferredData[transferKey] = {
          dragData: dragData,
          namespace: _common.default.getNamespace(binding),
          onDropCallback: null // will be set in droppable directive

        };
        event.dataTransfer.setData('text/plain', transferKey);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';

        if (binding.modifiers.image) {
          event.dataTransfer.setDragImage(binding.value.image, 10, 10);
        }

        if (vnode.props['onDrag-start']) {
          vnode.props['onDrag-start'](dragData, event);
        }
      }, false);
      el.addEventListener('drag', function (event) {
        if (binding.modifiers.dynamic) {
          _common.default.transferredData[transferKey].namespace = _common.default.getNamespace(binding);
        }

        if (vnode.props['onDrag-move']) {
          vnode.props['onDrag-move'](dragData, event);
        }
      });
      el.addEventListener('dragend', function (event) {
        _common.default.dragInProgressKey = null;

        if (_common.default.transferredData[transferKey]) {
          if (typeof _common.default.transferredData[transferKey].onDropCallback === 'function') {
            var callback = _common.default.transferredData[transferKey].onDropCallback;
            setTimeout(function () {
              return callback();
            }, 0);
          }

          delete _common.default.transferredData[transferKey];
        }

        if (vnode.props['onDrag-end']) {
          vnode.props['onDrag-end'](dragData, event);
        }
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
  _common = _interopRequireDefault(_common);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = {
    mounted: function mounted(el, binding, vnode) {
      function isDropAllowed() {
        var dropTargetNamespace = _common.default.getNamespace(binding);

        var namespace = _common.default.transferredData[_common.default.dragInProgressKey].namespace;
        return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
      }

      el.addEventListener('dragenter', function (event) {
        event.preventDefault();

        if (vnode.props['onDrag-enter']) {
          var dragData = _common.default.transferredData[_common.default.dragInProgressKey].dragData;
          vnode.props['onDrag-enter'](dragData, isDropAllowed(), event);
        }
      }, false);
      el.addEventListener('dragover', function (event) {
        var dragData = _common.default.transferredData[_common.default.dragInProgressKey].dragData;
        var dropAllowed = isDropAllowed();

        if (dropAllowed) {
          event.preventDefault(); // required to allow dropping
        }

        if (vnode.props['onDrag-over']) {
          vnode.props['onDrag-over'](dragData, dropAllowed, event);
        }
      }, false);
      el.addEventListener('dragleave', function (event) {
        event.preventDefault();

        if (vnode.props['onDrag-leave']) {
          var dragData = _common.default.transferredData[_common.default.dragInProgressKey].dragData;
          vnode.props['onDrag-leave'](dragData, isDropAllowed(), event);
        }
      }, false);
      el.addEventListener('drop', function (event) {
        event.stopPropagation();
        event.preventDefault();
        var transferKey = event.dataTransfer.getData('text');
        var dragData = _common.default.transferredData[transferKey].dragData;

        _common.default.transferredData[transferKey].onDropCallback = function () {
          if (vnode.props['onDrag-leave']) {
            vnode.props['onDrag-leave'](dragData, true, event);
          }

          if (vnode.props['onDrag-drop']) {
            vnode.props['onDrag-drop'](dragData, true, event);
          }
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

module.exports = __webpack_require__(/*! D:\Simon\Code\opensource\v-drag-drop\src\index.js */"./src/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=vDragDrop.js.map