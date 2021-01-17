window.demos.Demo8 = {
    template: `
        <div>
            <h4>Demo 8: Changing drag data</h4>

            <div
                v-draggable.move="dragData1"
                class="draggableContainer"
                @drag-start="onDragStart"
            >
                Drag me!
                <div>My data: {{ dragData1 }}</div>
            </div>

            <div
                v-draggable.move="dragData2"
                class="draggableContainer"
                @drag-start="onDragStart"
            >
                Or drag me!
                <div>My data: {{ dragData2 }}</div>
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
            counter1: 1,
            counter2: 1,
            droppedData: null
        };
    },

    computed: {
        dragData1() {
            return {
                counter: this.counter1
            };
        },
        dragData2() {
            return {
                counter: this.counter2
            };
        }
    },

    created() {
        this.interval = setInterval(() => ++this.counter1, 500);
        this.interval = setInterval(() => ++this.counter2, 1000);
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
