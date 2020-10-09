export default {
    transferredData: { },
    dragInProgressKey: null,

    getNamespace(binding) {
        const argument = binding.arg;
        if (typeof argument !== 'string') {
            return null;
        }
        if (binding.modifiers.dynamic) {
            const namespace = binding.instance[argument];
            return typeof namespace !== 'string' ? null : namespace;
        }
        return argument;
    }
};