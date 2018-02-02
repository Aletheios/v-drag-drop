const transferredData = { };

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
        const listeners = getListeners(vnode);

        el.setAttribute('draggable', true);

        if (binding.modifiers && binding.modifiers.move) {
            el.style.cursor = 'move';
        }

        // Only strings are supported in dataTransfer, therefore we only transfer the key and use an external store
        const transferKey = +new Date() + '';

        el.addEventListener('dragstart', function(event){
            if (listeners['drag-start']) {
                listeners['drag-start'](dragData);
            }
            
            transferredData[transferKey] = {
                dragData,
                onDropCallback: null // will be set in droppable directive
            };

            event.dataTransfer.setData('text', transferKey);

            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.dropEffect = 'move';
        }, false);
        
        el.addEventListener('dragend', function(){
            if (transferredData[transferKey]) {
                if (typeof transferredData[transferKey].onDropCallback === 'function') {
                    const callback = transferredData[transferKey].onDropCallback;
                    setTimeout(() => callback(), 0);
                }
                delete transferredData[transferKey];
            }
            else {
                console.warn('v-drag-drop: No draggable data found!'); // eslint-disable-line
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

        // Necessary to enable drop event
        el.addEventListener('dragenter', function(event){
            event.preventDefault();
        }, false);
        el.addEventListener('dragover', function(event){
            event.preventDefault();
        }, false);

        el.addEventListener('drop', function(event){
            event.stopPropagation();
            event.preventDefault();
            
            const key = event.dataTransfer.getData('text');
            const data = transferredData[key] ? transferredData[key].dragData : null;
            if (!data) {
                console.warn('v-drag-drop: No droppable data found!'); // eslint-disable-line
            }
            
            transferredData[key].onDropCallback = function(){
                if (listeners['drag-drop'] && data) {
                    listeners['drag-drop'](data);
                }
            };
        }, false);
    }
};