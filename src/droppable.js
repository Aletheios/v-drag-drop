import Common from '@/common';

export default {
    inserted(el, binding, vnode) {
        const listeners = Common.getListeners(vnode);
        const dropTargetNamespace = binding.arg || null;

        function getDraggedConfig(key) {
            if (!key) {
                return null;
            }
            return Common.transferredData[key] || null;
        }

        // Necessary to enable drop event
        el.addEventListener('dragenter', function(event){
            event.preventDefault();

            if (listeners['drag-enter']) {
                const { dragData } = getDraggedConfig(Common.dragInProgressKey);
                listeners['drag-enter'](dragData);
            }
        }, false);

        el.addEventListener('dragover', function(event){
            const { dragData, namespace } = getDraggedConfig(Common.dragInProgressKey);
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
                const { dragData } = getDraggedConfig(Common.dragInProgressKey);
                listeners['drag-leave'](dragData);
            }
        }, false);

        el.addEventListener('drop', function(event){
            event.stopPropagation();
            event.preventDefault();
            
            const key = event.dataTransfer.getData('text');
            const { dragData } = getDraggedConfig(key);
            
            Common.transferredData[key].onDropCallback = function(){
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