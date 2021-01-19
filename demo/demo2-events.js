// This demo shows the different events triggered by v-drag-drop. Open the browser console to see log messages.

window.demos.Demo2 = {
    template: `
        <div>
            <h4>Demo 2: Events</h4>
            Open the browser console to see log messages.
            <br><br>

            <div
                v-draggable.move="myData"
                @v-drag-start="onDragStart"
                @v-drag-move="onDragMove"
                @v-drag-end="onDragEnd"
                class="draggableContainer"
            >
                Drag me!
            </div>

            <div
                v-droppable
                @v-drag-enter="onDragEnter"
                @v-drag-over="onDragOver"
                @v-drag-leave="onDragLeave"
                @v-drag-drop="onDrop"
                class="droppableContainer"
            >
                Drop me here!
            </div>
        </div>
    `,

    data() {
        return {
            myData: {
                foobar: 'some data'
            }
        };
    },

    methods: {
        onDragStart(myData) {
            console.log('Draggable element: Started dragging', myData);
        },
        onDragMove(myData) { // eslint-disable-line
            // This is triggered repeatedly and will log a lot of messages. Remove comments if you want to see the messages.
            // console.log('Draggable element: Dragging is in progress');
        },
        onDragEnd(myData) {
            console.log('Draggable element: Stopped dragging', myData);
        },

        onDragEnter(myData) {
            console.log('Drop zone: Draggable element entered the zone', myData);
        },
        onDragOver(myData) { // eslint-disable-line
            // This is triggered repeatedly and will log a lot of messages. Remove comments if you want to see the messages.
            // console.log('Drop zone: Draggable element is over the zone');
        },
        onDragLeave(myData) {
            console.log('Drop zone: Draggable element left the zone', myData);
        },
        onDrop(myData) {
            console.log('Drop zone: Draggable element was dropped', myData);
        }
    }
};