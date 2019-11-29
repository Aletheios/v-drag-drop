export default {
    transferredData: { },
    dragInProgressKey: null,
    
    getListeners(vnode) {
        if (vnode.data && vnode.data.on) {
            return vnode.data.on;
        }
        if (vnode.componentOptions && vnode.componentOptions.listeners) {
            return vnode.componentOptions.listeners;
        }
        return { };
    },

    getNamespace(binding) {
        const argument = binding.arg;
        if (typeof argument !== 'string') {
            return null;
        }
        return argument;
    }
};