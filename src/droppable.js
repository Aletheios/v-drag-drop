import Common from './common';

export default {
    mounted(el, binding, vnode) {
        function isDropAllowed() {
            const dropTargetNamespace = Common.getNamespace(binding);
            const { namespace } = Common.transferredData[Common.dragInProgressKey];
            return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
        }

        el.addEventListener('dragenter', function(event){
            event.preventDefault();

            if (vnode.props.onVDragEnter) {
                const { dragData } = Common.transferredData[Common.dragInProgressKey];
                vnode.props.onVDragEnter(dragData, isDropAllowed(), event);
            }
        }, false);


        el.addEventListener('dragover', function(event){
            const { dragData } = Common.transferredData[Common.dragInProgressKey];
            const dropAllowed = isDropAllowed();

            if (dropAllowed) {
                event.preventDefault(); // required to allow dropping
            }

            if (vnode.props.onVDragOver) {
                vnode.props.onVDragOver(dragData, dropAllowed, event);
            }
        }, false);


        el.addEventListener('dragleave', function(event){
            event.preventDefault();

            if (vnode.props.onVDragLeave) {
                const { dragData } = Common.transferredData[Common.dragInProgressKey];
                vnode.props.onVDragLeave(dragData, isDropAllowed(), event);
            }
        }, false);


        el.addEventListener('drop', function(event){
            event.stopPropagation();
            event.preventDefault();

            const transferKey = event.dataTransfer.getData('text');
            const { dragData } = Common.transferredData[transferKey];

            Common.transferredData[transferKey].onDropCallback = function(){
                if (vnode.props.onVDragLeave) {
                    vnode.props.onVDragLeave(dragData, true, event);
                }
                if (vnode.props.onVDragDrop) {
                    vnode.props.onVDragDrop(dragData, true, event);
                }
            };
        }, false);
    }
};
