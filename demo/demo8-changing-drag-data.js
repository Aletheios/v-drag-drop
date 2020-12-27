window.demos.Demo8 = {
    template: `
        <div>
            <h4>Demo 8: Changing drag data</h4>

            <div
                v-draggable.move="dragData"
                class="draggableContainer"
                @drag-start="onDragStart"
            >
                Drag me!
                <div>My data: {{ dragData }}</div>
            </div>

            <div
                v-droppable
                @drag-drop="onDrop"
                class="droppableContainer"
            >
                Drop something here!
                <div v-if="droppedData">Dropped data: {{ droppedData }}</div>
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
            return {
                counter: this.counter
            };
        }
    },

    created() {
        this.interval = setInterval(() => ++this.counter, 500);
    },

    beforeUnmount() {
        clearInterval(this.interval);
    },

    methods: {
        onDragStart(myData) {
            console.log('Draggable element: Started dragging', myData);
        },

        onDrop(myData) {
            console.log('Drop zone: Draggable element was dropped', myData);
            this.droppedData = myData;
        }
    }
};
