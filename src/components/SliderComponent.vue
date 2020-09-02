<template>
    <div :id="uniqueID" class="drag-container">
        <div v-on:mousedown="onDown" v-on:touchstart="onDown" v-on:touchmove="onMove" v-on:touchend="onUp" :class="constraint ? 'drag-element-' + constraint : 'drag-element'" :style="cssParams">
            <slot>Insert Content</slot>
        </div>
        <div v-on:mousemove="onMove" v-on:mouseup="onUp" class="drag-blocker" v-if="dragging && mDragging"></div>
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
    },
    mounted: function () {
        setTimeout(() => {
            // const xPos = bounds.left+((this.ratiox/this.max)*this.width);
            const targetElement = document.querySelector(`div#${this.$data.uniqueID} > div:first-child`);
            const bounds = targetElement.getBoundingClientRect();
            console.log(this.sig, bounds.left+((this.ratiox/this.max)*this.width));
            this.initDrag({pageX: bounds.left, pageY: bounds.top, currentTarget: targetElement});
            this.processDrag({pageX: bounds.left+((this.ratiox/this.max)*this.width), pageY: bounds.top+((this.ratioy/this.max)*this.height), currentTarget: targetElement});
            this.$forceUpdate();
            // this.onUp();
        }, 10);
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