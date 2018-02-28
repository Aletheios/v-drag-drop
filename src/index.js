import draggable from '@/draggable';
import droppable from '@/droppable';

export default {
    install(Vue) {
        Vue.directive('draggable', draggable);
        Vue.directive('droppable', droppable);
    }
};