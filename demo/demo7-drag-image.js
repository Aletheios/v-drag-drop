// This demo shows how to use a custom drag image

window.Demo7 = Vue.component('demo7-drag-image', {
    template: `
        <div>
            <h4>Demo 7: Custom drag image</h4>

            <div v-draggable.image.move="{ data: myData, image: myImage }"
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
        const myImage = new Image();
        myImage.src = 'http://placekitten.com/200/150';

        return {
            myImage,
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