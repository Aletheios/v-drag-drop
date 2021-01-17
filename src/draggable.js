import Common from './common';

const dataMap = new WeakMap();

function updateDragData(el, binding) {
    dataMap.set(el, binding.modifiers.image ? binding.value.data : binding.value);
}

export default {
    updated(el, binding) {
        updateDragData(el, binding);
    },

    beforeUnmount(el) {
        dataMap.delete(el);
    },

    mounted(el, binding, vnode) {
        updateDragData(el, binding);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only transfer the key and use an external store for the actual data
        const transferKey = Date.now() + '';

        el.addEventListener('dragstart', function(event){
            const dragData = dataMap.get(el);
            Common.dragInProgressKey = transferKey;

            Common.transferredData[transferKey] = {
                dragData,
                namespace: Common.getNamespace(binding),
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text/plain', transferKey);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';

            if (binding.modifiers.image) {
                event.dataTransfer.setDragImage(binding.value.image, 10, 10);
            }

            if (vnode.props.onDragStart) {
                vnode.props.onDragStart(dragData, event);
            }
        }, false);


        el.addEventListener('drag', function(event){
            if (binding.modifiers.dynamic) {
                Common.transferredData[transferKey].namespace = Common.getNamespace(binding);
            }

            if (vnode.props.onDragMove) {
                vnode.props.onDragMove(dataMap.get(el), event);
            }
        });


        el.addEventListener('dragend', function(event){
            Common.dragInProgressKey = null;

            if (Common.transferredData[transferKey]) {
                if (typeof Common.transferredData[transferKey].onDropCallback === 'function') {
                    const callback = Common.transferredData[transferKey].onDropCallback;
                    setTimeout(() => callback(), 0);
                }
                delete Common.transferredData[transferKey];
            }

            if (vnode.props.onDragEnd) {
                vnode.props.onDragEnd(dataMap.get(el), event);
            }
        });
    }
};
