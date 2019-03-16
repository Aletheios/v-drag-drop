# v-drag-drop

**Minimalistic drag & drop directives for [Vue.js 2](https://vuejs.org/)**

Designed to encapsulate some of the peculiarities of the Drag & Drop API and make it easier to use with Vue.js.

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


## Usage

The following template example is the minimum setup required to get a draggable element and a drop zone with `v-drag-drop`:

```html
<div v-draggable="myData"></div>
<div v-droppable @drag-drop="handleDrop"></div>
```

This template example shows all the features supported by `v-drag-drop`. Check the [API section](#api) for details.

```html
<div v-draggable:namespace.dynamic.move="myData"
     @drag-start="onDragStart"
     @drag-move="onDragMove"
     @drag-end="onDragEnd">
</div>

<div v-droppable:namespace.dynamic
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

If no namespace is defined (default), the items can be dropped on any drop zone. Namespaces can be assigned dynamically, see the `dynamic` modifier.

Example:

```html
<div v-draggable:foo="myData"></div>
<div v-droppable:foo @drag-drop="handleDrop"></div> <!-- supports drop -->
<div v-droppable:bar @drag-drop="handleDrop"></div> <!-- drop prevented -->
```

#### Modifiers

* `move`: Optional. Add this modifier to get a crosshair cursor on the element: `v-draggable.move`

* `dynamic`: Optional. Enables dynamic namespace names. When `dynamic` is set, the given namespace attribute is treated as a property ("variable") name; the property must be of type `String` and must be present in the parent component (can be a computed property).

    Example:
    ```javascript
    Vue.component('my-component', {
        template: '<div v-draggable:myNamespace.dynamic="myData"></div>',
        data() {
            return {
                myData: { foobar: 42 },
                myNamespace: 'actualNamespaceName' // can be changed later
            };
        }
    });
    ```

    **Note:** The `dynamic` modifier is required to enable truly dynamic arguments whose values can change later in time. By contrast, [the new "dynamic" arguments in Vue 2.6+](https://vuejs.org/v2/guide/syntax.html#Dynamic-Arguments) are evaluated only once at the beginning and then statically passed to the directive. You can use those with `v-drag-drop` if you want, but they won't have the same effect as you'd get with `dynamic`.

#### Events

All event listeners are called with the dragged data as first argument.

* `drag-start`: Fired when the user starts dragging.

* `drag-move`: Fired repeatedly while dragging is in progress.

* `drag-end`: Fired when dragging is finished.


### `v-droppable`

#### Value

Unused.

#### Argument

The namespace of the drop zone, see `v-draggable`. If no namespace is given, all items can be dropped on this drop zone.

#### Modifiers

* `dynamic`: Optional. Enables dynamic namespace names. See `v-draggable`.

#### Events

All event listeners (except `drag-drop`) are called with two parameters: (1) the dragged data, (2) whether or not dropping will be possible (i.e. the namespaces of the dragged item and the drop zone match)

* `drag-enter`: Fired when a dragged item enters the drop zone.

* `drag-over`: Fired repeatedly while a dragged item is over the drop zone.

* `drag-leave`: Fired when a dragged item leaves the drop zone.

* `drag-drop`: Fired when an item has been dropped on the drop zone. Called with the dragged data and the original drop event. This enables you for example to retrieve the precise mouse coordinates of the drop.