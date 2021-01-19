// This demo shows how to use the local registration of the directives.

window.demos.Demo6 = {
    template: `
        <div>
            <h4>Demo 6: Local registration</h4>

            <div
                v-my-draggable.move="myData"
                class="draggableContainer"
            >
                Drag me!
            </div>

            <div
                v-my-droppable
                @v-drag-drop="onDrop"
                class="droppableContainer"
            >
                Drop me here!
            </div>
        </div>
    `,

    directives: {
        myDraggable: window.vDragDrop.draggable,
        myDroppable: window.vDragDrop.droppable
    },

    data() {
        return {
            myData: {
                foobar: 'some data'
            }
        };
    },

    methods: {
        onDrop(myData) {
            alert(`Dropped ${myData.foobar} on the drop zone!`);
        }
    }
};