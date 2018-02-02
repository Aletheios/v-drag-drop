import { draggable, droppable } from '@/vDragDrop';

export default {
    install(Vue) {
        Vue.directive('draggable', draggable);
        Vue.directive('droppable', droppable);
    }
};