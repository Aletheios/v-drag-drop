// This demo shows how to use namespaces for drop zones to define where items can be dropped.

window.Demo4 = Vue.component('demo4-namespaces', {
    template: `
        <div>
            <h4>Demo 4: Namespaces</h4>

            <div v-draggable:myNamespace1.move="myData"
                 class="draggableContainer">
                Drag me to #1!
            </div>
            <div v-draggable:myNamespace2.move="myData"
                 class="draggableContainer dark">
                Drag me to #2!
            </div>

            <div v-droppable:myNamespace1
                 @drag-drop="data => onDrop(data, '1')"
                 class="droppableContainer">
                Drop #1 here!
            </div>
            <div v-droppable:myNamespace2
                 @drag-drop="data => onDrop(data, '2')"
                 class="droppableContainer dark">
                Drop #2 here!
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
        onDrop(myData, namespace) {
            alert(`Dropped ${myData.foobar} on drop zone #${namespace}!`);
        }
    }
});