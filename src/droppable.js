import Common from '@/common';

export default {
    inserted(el, binding, vnode) {
        const listeners = Common.getListeners(vnode);

        function isDropAllowed() {
            const dropTargetNamespace = Common.getNamespace(binding, vnode);
            const { namespace } = Common.transferredData[Common.dragInProgressKey];
            return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
        }


        el.addEventListener('dragenter', function(event){
            event.preventDefault();

            if (listeners['drag-enter']) {
                const { dragData } = Common.transferredData[Common.dragInProgressKey];
                listeners['drag-enter'](dragData, isDropAllowed());
            }
        }, false);


        el.addEventListener('dragover', function(event){
            const { dragData } = Common.transferredData[Common.dragInProgressKey];
            const dropAllowed = isDropAllowed();
            
            if (dropAllowed) {
                event.preventDefault(); // required to allow dropping
            }

            if (listeners['drag-over']) {
                listeners['drag-over'](dragData, dropAllowed);
            }
        }, false);


        el.addEventListener('dragleave', function(event){
            event.preventDefault();

            if (listeners['drag-leave']) {
                const { dragData } = Common.transferredData[Common.dragInProgressKey];
                listeners['drag-leave'](dragData, isDropAllowed());
            }
        }, false);

        
        el.addEventListener('drop', function(event){
            event.stopPropagation();
            event.preventDefault();
            
            const transferKey = event.dataTransfer.getData('text');
            const { dragData } = Common.transferredData[transferKey];
            
            Common.transferredData[transferKey].onDropCallback = function(){
                if (listeners['drag-leave']) {
                    listeners['drag-leave'](dragData, true);
                }
                if (listeners['drag-drop']) {
                    listeners['drag-drop'](dragData, event);
                }
            };
        }, false);
    }
};