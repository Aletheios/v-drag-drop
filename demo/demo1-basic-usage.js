// This demo shows the most basic usage of v-drag-drop.

window.Demo1 = Vue.component('demo1-basic-usage', {
    template: `
        <div>
            <h4>Demo 1: Basic usage</h4>

            <div v-draggable.move="myData"
                 class="draggableContainer">
                Drag me!
            </div>

            <div v-droppable
                 @drag-drop="onDrop"
                 class="droppableContainer">
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
        onDrop(myData) {
            alert(`Dropped ${myData.foobar} on the drop zone!`);
        }
    }
});