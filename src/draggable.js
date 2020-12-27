import Common from './common';

export default {
    mounted(el, binding, vnode) {
        let dragData = binding.modifiers.image ? binding.value.data : binding.value;

        binding.dir.updated = (_, _binding) => {
            dragData = _binding.modifiers.image ? _binding.value.data : _binding.value;
        };

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
                vnode.props.onDragMove(dragData, event);
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
                vnode.props.onDragEnd(dragData, event);
            }
        });
    }
};
