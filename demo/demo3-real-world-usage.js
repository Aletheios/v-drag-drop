// This demo shows a simple real-world use case scenario with draggable elements being moved into a container.

const Demo3DraggableElement = {
    template: `
        <div v-draggable.move="content" class="draggableContainer">
            {{ content }}
        </div>
    `,

    props: ['content']
};

const Demo3DropZone = {
    components: {
        Demo3DraggableElement
    },

    template: `
        <div v-droppable @v-drag-drop="onDrop" class="droppableContainer">
            <span v-if="droppedItems.length === 0">Drop items here</span>

            <!-- Render elements that have already been dropped -->
            <demo3-draggable-element
                v-else
                v-for="item in droppedItems" :key="item"
                :content="item"
            >
            </demo3-draggable-element>
        </div>
    `,

    props: ['droppedItems'],

    methods: {
        onDrop(item) {
            if (this.droppedItems.includes(item)) {
                // Enable re-sorting the items using drag&drop
                this.droppedItems.splice(this.droppedItems.indexOf(item), 1);
            }
            this.droppedItems.push(item);
        }
    }
};

window.demos.Demo3 = {
    components: {
        Demo3DraggableElement,
        Demo3DropZone
    },

    template: `
        <div>
            <h4>Demo 3: Real-world usage</h4>
            
            <!-- Elements that have not been dropped yet -->
            <demo3-draggable-element
                v-for="item in draggableItems" :key="item"
                v-if="isItemDraggable(item)"
                :content="item"
            >
            </demo3-draggable-element>

            <demo3-drop-zone :dropped-items="droppedItems"></demo3-drop-zone>
        </div>
    `,

    data() {
        return {
            draggableItems: [1, 2, 3],
            droppedItems: []
        };
    },

    methods: {
        isItemDraggable(item) {
            return !this.droppedItems.includes(item);
        }
    }
};