<template>
    <div :id="uniqueID" class="drag-container">
        <div v-on:mousedown="onDown" :class="constraint ? 'drag-element-' + constraint : 'drag-element'" :style="cssParams">
            <slot>Insert Content</slot>
        </div>
        <div v-on:mousemove="onMove" v-on:mouseup="onUp" class="drag-blocker" v-if="dragging"></div>
    </div>
</template>
<script>
import BaseDraggable from './base/BaseDraggable.js';
export default {
    extends: BaseDraggable,
    props: ['constraint'],
    computed: {
        cssParams: function () {
            return {'--x': `${this.$data.position.x - this.componentPosition.x}px`, '--y': `${this.$data.position.y - this.componentPosition.y}px`};
        }
    }
}
</script>
<style lang="scss" scoped>
div.drag-container{
    position: relative;
    > div.drag-element{
        position:absolute;
        left: var(--x);
        top: var(--y);
    }
    > div.drag-element-vertical{
        position:absolute;
        top: var(--y);
    }
    > div.drag-element-horizontal{
        position:absolute;
        left: var(--x);
    }
    > div.drag-blocker{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }
}
</style>