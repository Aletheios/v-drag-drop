const elementMap = new WeakMap();

export const transferredData = { };

export let dragInProgressKey = null;
export function setDragInProgressKey(key) {
    dragInProgressKey = key;
}

export function setElementData(el, binding, vnode) {
    elementMap.set(el, { binding, vnode });
}
export function getElementData(el) {
    return elementMap.get(el);
}
export function forgetElement(el) {
    elementMap.delete(el);
}

export function getNamespace(el) {
    const { binding } = getElementData(el);
    return binding.arg;
}
export function emit(el, event, ...args) {
    const { vnode } = getElementData(el);
    if (vnode.props && vnode.props[event]) {
        vnode.props[event](...args);
    }
}
