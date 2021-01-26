import {
    setElementData,
    forgetElement,
    getNamespace,
    transferredData,
    dragInProgressKey,
    emit
} from './common';

export default {
    updated(el, binding, vnode) {
        setElementData(el, binding, vnode);
    },

    beforeUnmount(el) {
        forgetElement(el);
    },

    mounted(el, binding, vnode) {
        function isDropAllowed() {
            const dropTargetNamespace = getNamespace(el);
            const { namespace } = transferredData[dragInProgressKey];
            return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
        }

        setElementData(el, binding, vnode);

        el.addEventListener('dragenter', function(event){
            event.preventDefault();

            const { dragData } = transferredData[dragInProgressKey];
            emit(el, 'onVDragEnter', dragData, isDropAllowed(), event);
        }, false);


        el.addEventListener('dragover', function(event){
            const { dragData } = transferredData[dragInProgressKey];
            const dropAllowed = isDropAllowed();

            if (dropAllowed) {
                event.preventDefault(); // required to allow dropping
            }

            emit(el, 'onVDragOver', dragData, dropAllowed, event);
        }, false);


        el.addEventListener('dragleave', function(event){
            event.preventDefault();

            const { dragData } = transferredData[dragInProgressKey];
            emit(el, 'onVDragLeave', dragData, isDropAllowed(), event);
        }, false);


        el.addEventListener('drop', function(event){
            if (!isDropAllowed()) {
                return event.preventDefault();
            }
            event.stopPropagation();
            event.preventDefault();

            const transferKey = event.dataTransfer.getData('text');
            const { dragData } = transferredData[transferKey];

            transferredData[transferKey].onDropCallback = function(){
                emit(el, 'onVDragLeave', dragData, true, event);
                emit(el, 'onVDragDrop', dragData, true, event);
            };
        }, false);
    }
};
