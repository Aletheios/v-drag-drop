# v-drag-drop

**Minimalistic drag & drop directives for [Vue.js 2](https://vuejs.org/)**

Designed to encapsulate some of the peculiarities of the native Drag & Drop API and make it easier to use with Vue.js. Also adds some handy features like namespaces.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)


## Installation

Install `v-drag-drop` via npm:

```bash
npm install --save v-drag-drop
```

Then import it in your project:

```javascript
import Vue from 'vue';
import vDragDrop from 'v-drag-drop';
Vue.use(vDragDrop);
```

Or include the files via `<script>` tag:
```html
<script src="node_modules/vue/dist/vue.min.js"></script>
<script src="node_modules/v-drag-drop/dist/vDragDrop.min.js"></script>
<script>
    Vue.use(vDragDrop);
</script>
```

You can also register the directives locally in your Vue component:

```javascript
import { draggable, droppable } from 'v-drag-drop';
export default {
    name: 'MyComponent',
    directives: {
        draggable, droppable
    }
};
```


## Usage

The following template example is the minimum setup required to get a draggable element and a drop zone with `v-drag-drop`:

```html
<div v-draggable="myData"></div>
<div v-droppable @drag-drop="handleDrop"></div>
```

This template example shows all the features supported by `v-drag-drop`. Check the [API section](#api) for details.

```html
<div v-draggable:namespace.move="myData"
     @drag-start="onDragStart"
     @drag-move="onDragMove"
     @drag-end="onDragEnd">
</div>

<div v-droppable:namespace
     @drag-enter="onDragEnter"
     @drag-over="onDragOver"
     @drag-leave="onDragLeave"
     @drag-drop="onDragDrop">
</div>
```

Also check the demos in the `demo` directory. You can run the demos with `npm run demo`. Open your browser at `http://127.0.0.1:1337/demo`.


## API

`v-drag-drop` provides two directives: `v-draggable` for draggable elements and `v-droppable` for drop zones.

### `v-draggable`

#### Value

This is the data you want to transfer to the drop zone. The data can be arbitrary objects or primitives.

Example:

```javascript
Vue.component('my-component', {
    template: '<div v-draggable="myData"></div>',
    data() {
        return {
            myData: { foobar: 42 }
        };
    }
});
```

#### Argument

You can pass an argument to `v-draggable`. This argument is a namespace that defines in which drop zones the draggable item can be dropped (requires the drop zone to have the same namespace). Namespaces allow you to place multiple drop zones on the same page that accept different items.

If no namespace is defined (default), the items can be dropped on any drop zone.

Example:

```html
<div v-draggable:foo="myData"></div>
<div v-droppable:foo @drag-drop="handleDrop"></div> <!-- supports drop -->
<div v-droppable:bar @drag-drop="handleDrop"></div> <!-- drop prevented -->
```

Namespaces can also be assigned dynamically using [dynamic arguments](https://vuejs.org/v2/guide/syntax.html#Dynamic-Arguments) starting with Vue 2.6:

```html
<div v-draggable:[namespaceName]="myData"></div>
<div v-droppable:[namespaceName] @drag-drop="handleDrop"></div> <!-- supports drop -->
<div v-droppable:foobar @drag-drop="handleDrop"></div> <!-- drop prevented -->
```

#### Modifiers

* `move`: Optional. Add this modifier to get a crosshair cursor on the element: `v-draggable.move`

#### Events

* `drag-start`: Fired when the user starts dragging.

* `drag-move`: Fired repeatedly while dragging is in progress.

* `drag-end`: Fired when dragging is finished.

All event listeners are called with two arguments:
1. The dragged data
2. The native JavaScript event


### `v-droppable`

#### Argument

The namespace of the drop zone, see `v-draggable`. If no namespace is given, all items can be dropped on this drop zone.

#### Events

* `drag-enter`: Fired when a dragged item enters the drop zone.

* `drag-over`: Fired repeatedly while a dragged item is over the drop zone.

* `drag-leave`: Fired when a dragged item leaves the drop zone.

* `drag-drop`: Fired when an item has been dropped on the drop zone. Called with the dragged data and the original drop event. This enables you for example to retrieve the precise mouse coordinates of the drop.

All event listeners are called with three parameters:
1. The dragged data
2. Whether or not dropping will be possible (i.e. the namespaces of the dragged item and the drop zone match)
3. The native JavaScript event