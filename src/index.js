import draggable from '@/draggable';
import droppable from '@/droppable';

export default {
    draggable,
    droppable,
    
    install(Vue) {
        Vue.directive('draggable', draggable);
        Vue.directive('droppable', droppable);
    }
};