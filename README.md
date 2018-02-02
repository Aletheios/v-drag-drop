# v-drag-drop

**Minimalistic drag & drop directives for [Vue.js 2](https://vuejs.org/)**

Designed to encapsulate some of the peculiarities of the Drag & Drop API and make it easier to use with Vue.js.

## Usage

Install *v-drag-drop* via *npm*:

```bash
npm install --save-exact v-drag-drop
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

Full usage example:

```html
<div v-draggable:namespace.move="myData"
     @drag-start="onDragStart"
     @drag-end="onDragEnd">
</div>

<div v-droppable:namespace
     @drag-enter="onDragEnter"
     @drag-over="onDragOver"
     @drag-leave="onDragLeave"
     @drag-drop="onDragDrop">
</div>
```

```javascript
Vue.component('myComponent', {
    data() {
        return { myData: { foobar: 42 } };
    },
    methods: {
        onDragStart: data => console.log(data),
        onDragEnd: data => console.log(data),
        onDragEnter: data => console.log(data),
        onDragOver: data => console.log(data),
        onDragLeave: data => console.log(data),
        onDragDrop: data => console.log(data)
    }
});
```

## API Description

### `v-draggable`

* Mark draggable elements with `v-draggable`
* Pass the data you want to transfer: `v-draggable="myData"` The data can be arbitrary objects or primitives.
* Optionally add the `move` modifier to get a crosshair cursor on the element: `v-draggable.move`
* Optionally limit drop targets by adding a namespace argument: `v-draggable:namespace` When no namespace is given, the items can be dropped on any target.
* When the user starts dragging, the `drag-start` event is emitted. When dragging stops, the `drag-end` event is triggered. The event listeners are called with the dragged data.

### `v-droppable`

* Mark drop targets with `v-droppable`
* Optionally add a namespace to define where draggable items may come from: `v-droppable:namespace` When no namespace is given, all items can be dropped on the target.
* When a dragged item enters the drop target, the `drag-enter` event is emitted. While it is over the target, `drag-over` is triggered. When it leaves the target, the `drag-leave` event is triggered. The event listeners are called with the dragged data.
* When a drop occurs, the `drag-drop` event is emitted with the transferred data.