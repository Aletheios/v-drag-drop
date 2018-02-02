const transferredData = { };
let dragInProgressKey = null;

function getListeners(vnode) {
    if (vnode.data && vnode.data.on) {
        return vnode.data.on;
    }
    if (vnode.componentOptions && vnode.componentOptions.listeners) {
        return vnode.componentOptions.listeners;
    }
    return { };
}

export const draggable = {
    inserted(el, binding, vnode) {
        const dragData = binding.value;
        const namespace = binding.arg || null;
        const listeners = getListeners(vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only transfer the key and use an external store for the actual data
        const transferKey = +new Date() + '';

        el.addEventListener('dragstart', function(event){
            dragInProgressKey = transferKey;
            
            transferredData[transferKey] = {
                dragData,
                namespace,
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text', transferKey);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';

            if (listeners['drag-start']) {
                listeners['drag-start'](dragData);
            }
        }, false);
        
        el.addEventListener('dragend', function(){
            dragInProgressKey = null;

            if (transferredData[transferKey]) {
                if (typeof transferredData[transferKey].onDropCallback === 'function') {
                    const callback = transferredData[transferKey].onDropCallback;
                    setTimeout(() => callback(), 0);
                }
                delete transferredData[transferKey];
            }

            if (listeners['drag-end']) {
                listeners['drag-end'](dragData);
            }
        });
    }
};

export const droppable = {
    inserted(el, binding, vnode) {
        const listeners = getListeners(vnode);
        const dropTargetNamespace = binding.arg || null;

        function getDraggedConfig(key) {
            if (!key) {
                return null;
            }
            return transferredData[key] || null;
        }

        // Necessary to enable drop event
        el.addEventListener('dragenter', function(event){
            event.preventDefault();

            if (listeners['drag-enter']) {
                const { dragData } = getDraggedConfig(dragInProgressKey);
                listeners['drag-enter'](dragData);
            }
        }, false);

        el.addEventListener('dragover', function(event){
            const { dragData, namespace } = getDraggedConfig(dragInProgressKey);
            if (!namespace || !dropTargetNamespace || namespace === dropTargetNamespace) {
                event.preventDefault(); // required to allow dropping
            }

            if (listeners['drag-over']) {
                listeners['drag-over'](dragData);
            }
        }, false);

        el.addEventListener('dragleave', function(event){
            event.preventDefault();

            if (listeners['drag-leave']) {
                const { dragData } = getDraggedConfig(dragInProgressKey);
                listeners['drag-leave'](dragData);
            }
        }, false);

        el.addEventListener('drop', function(event){
            event.stopPropagation();
            event.preventDefault();
            
            const key = event.dataTransfer.getData('text');
            const { dragData } = getDraggedConfig(key);
            
            transferredData[key].onDropCallback = function(){
                if (listeners['drag-leave']) {
                    listeners['drag-leave'](dragData);
                }
                if (listeners['drag-drop']) {
                    listeners['drag-drop'](dragData);
                }
            };
        }, false);
    }
};