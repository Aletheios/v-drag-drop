window.demos.Demo8 = {
    template: `
        <div>
            <h4>Demo 8: Dynamic drag Data</h4>
            <br><br>
            <div
                v-draggable.move="dragData"
                class="draggableContainer"
                @drag-start="onDragStart"
            >
                Drag me to myNamespace1!
                <div>My Data: {{dragData}}</div>
            </div>
            <div
                v-droppable
                @drag-drop="onDrop"
                :class="{ droppableContainer: true, dark: dynamicNamespace1 === 'myNamespace2' }"
            >
                Drop something here!
                <div v-if="droppedData">Dropped Data: {{droppedData}}</div>
            </div>
        </div>
    `,
    data() {
        return {
            counter: 1,
            droppedData: null
        };
    },
    computed: {
        dragData() {
            return {counter: this.counter}
        }
    },
    created() {
        this.interval = setInterval(() => this.counter++, 500)
    },
    beforeUnmount() {
        clearInterval(this.interval)
    },
    methods: {
        onDragStart(dragData, e) {
          console.log('dragstart', dragData, e)
        },
        onDragOver(myData, isDropAllowed) {
            console.log('Draggable item is over a drop zone. Drop is allowed:', isDropAllowed);
        },
        onDrop(data) {
            console.log('dropped!', data)
            this.droppedData = data
        }
    },
};
