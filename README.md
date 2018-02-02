# v-drag-drop

**Minimalistic drag & drop directives for [Vue.js 2](https://vuejs.org/)**

Designed to encapsulate some of the peculiarities of the Drag & Drop API and make it easier to use with Vue.js.

## Usage

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
<div v-draggable.move="myData" @drag-start="onDragStart" @drop-end="onDragEnd"></div>

<div v-droppable @drag-drop="onDragDrop"></div>
```

```javascript
Vue.component('myComponent', {
    data() {
        return { myData: { foobar: 42 } };
    },
    methods: {
        onDragStart: data => console.log(data),
        onDragEnd: data => console.log(data),
        onDragDrop: data => console.log(data)
    }
});
```

## API Description

### `v-draggable`

* Mark draggable elements with `v-draggable`
* Add the `move` modifier to get a crosshair cursor on the element: `v-draggable.move`
* Pass the data you want to transfer: `v-draggable="myData"`
* When the user starts dragging, the `drag-start` event is emitted. When dragging stops, the `drag-end` event is triggered.

### `v-droppable`

* Mark drop targets with `v-droppable`
* When a drop occurs, the `drag-drop` event is emitted with the transferred data