// This demo shows how to use dynamic namespaces which allow you to assign namespaces with property variables.

window.Demo5 = Vue.component('demo5-dynamic-namespaces', {
    template: `
        <div>
            <h4>Demo 5: Dynamic namespaces</h4>
            Open the browser console to see log messages.
            <br><br>
            <button @click="switchNamespaces">Switch drop zone namespaces</button>
            <br><br>
            <label>
                <input type="checkbox" v-model="switchAutomatically"> Switch automatically every second
            </label>
            <br><br><br>
            <!-- v-draggable also supports the "dynamic" modifier for namespaces, but we don't use it in this demo -->
            <div v-draggable:myNamespace1.move="myData"
                 class="draggableContainer">
                Drag me to myNamespace1!
            </div>
            <div v-draggable:myNamespace2.move="myData"
                 class="draggableContainer dark">
                Drag me to myNamespace2!
            </div>
            <div v-droppable:dynamicNamespace1.dynamic
                 @drag-over="onDragOver"
                 @drag-drop="data => onDrop(data, dynamicNamespace1)"
                 :class="{ droppableContainer: true, dark: dynamicNamespace1 === 'myNamespace2' }">
                {{ dynamicNamespace1 }}: Drop something here!
            </div>
            <div v-droppable:dynamicNamespace2.dynamic
                 @drag-over="onDragOver"
                 @drag-drop="data => onDrop(data, dynamicNamespace2)"
                 :class="{ droppableContainer: true, dark: dynamicNamespace2 === 'myNamespace2' }">
                {{ dynamicNamespace2 }}: Drop something here!
            </div>
        </div>
    `,

    data() {
        return {
            dynamicNamespace1: 'myNamespace1',
            dynamicNamespace2: 'myNamespace2',
            switchAutomatically: false,
            myData: {
                foobar: 'some data'
            }
        };
    },

    methods: {
        switchNamespaces() {
            const tmp = this.dynamicNamespace1;
            this.dynamicNamespace1 = this.dynamicNamespace2;
            this.dynamicNamespace2 = tmp;
        },

        onDragOver(myData, isDropAllowed) {
            console.log('Draggable item is over a drop zone. Drop is allowed:', isDropAllowed);
        },

        onDrop(myData, namespace) {
            alert(`Dropped ${myData.foobar} on drop zone ${namespace}!`);
        }
    },

    watch: {
        switchAutomatically() {
            if (this.switchAutomatically) {
                this.interval = setInterval(this.switchNamespaces, 1000);
            }
            else {
                clearInterval(this.interval);
            }
        }
    }
});