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
    }
};