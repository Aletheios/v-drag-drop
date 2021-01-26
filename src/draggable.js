import {
    setElementData,
    getElementData,
    forgetElement,
    transferredData,
    setDragInProgressKey,
    getNamespace,
    emit
} from './common';

function getDragValue(el) {
    const { binding } = getElementData(el);
    return binding.modifiers.image ? binding.value.data : binding.value;
}

export default {
    updated(el, binding, vnode) {
        setElementData(el, binding, vnode);
    },

    beforeUnmount(el) {
        forgetElement(el);
    },

    mounted(el, binding, vnode) {
        setElementData(el, binding, vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only transfer the key and use an external store for the actual data
        const transferKey = Date.now() + '';

        el.addEventListener('dragstart', function(event){
            const dragData = getDragValue(el);
            setDragInProgressKey(transferKey);

            transferredData[transferKey] = {
                dragData,
                namespace: getNamespace(el),
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text/plain', transferKey);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';

            const { binding: _binding } = getElementData(el);
            if (_binding.modifiers.image) {
                event.dataTransfer.setDragImage(_binding.value.image, 10, 10);
            }

            emit(el, 'onVDragStart', dragData, event);
        }, false);


        el.addEventListener('drag', function(event){
            emit(el, 'onVDragMove', getDragValue(el), event);
        });


        el.addEventListener('dragend', function(event){
            setDragInProgressKey(null);

            if (transferredData[transferKey]) {
                if (typeof transferredData[transferKey].onDropCallback === 'function') {
                    const callback = transferredData[transferKey].onDropCallback;
                    setTimeout(() => callback(), 0);
                }
                delete transferredData[transferKey];
            }

            emit(el, 'onVDragEnd', getDragValue(el), event);
        });
    }
};
