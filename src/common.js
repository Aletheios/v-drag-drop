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

    getNamespace(binding, vnode) {
        const argument = binding.arg;
        if (typeof argument !== 'string') {
            return null;
        }
        if (binding.modifiers.dynamic) {
            const namespace = vnode.context[argument];
            return typeof namespace !== 'string' ? null : namespace;
        }
        return argument;
    }
};