import Common from '@/common';

export default {
    inserted(el, binding, vnode) {
        const dragData = binding.value;
        const listeners = Common.getListeners(vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only transfer the key and use an external store for the actual data
        const transferKey = +new Date() + '';


        el.addEventListener('dragstart', function(event){
            Common.dragInProgressKey = transferKey;
            
            Common.transferredData[transferKey] = {
                dragData,
                namespace: Common.getNamespace(binding, vnode),
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text', transferKey);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';

            if (listeners['drag-start']) {
                listeners['drag-start'](dragData, event);
            }
        }, false);


        el.addEventListener('drag', function(event){
            if (binding.modifiers.dynamic) {
                Common.transferredData[transferKey].namespace = Common.getNamespace(binding, vnode);
            }

            if (listeners['drag-move']) {
                listeners['drag-move'](dragData, event);
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

            if (listeners['drag-end']) {
                listeners['drag-end'](dragData, event);
            }
        });
    }
};