<template>
    <div :id="uniqueID" class="drag-container" :style="cssParams">
        <div v-on:mousedown="onDown" v-on:touchstart="onDown" v-on:touchmove="onMove" v-on:touchend="onUp" :class="'drag-element'" :style="cssParams">
            <slot>Insert Content</slot>
        </div>
        <div v-on:mousemove="onMove" v-on:mouseup="onUp" class="drag-blocker" v-if="dragging"></div>
    </div>
</template>
<script>
import BaseDraggable from './base/BaseDraggable.js';
import jstrig from 'jstrig';
export default {
    extends: BaseDraggable,
    props: ['angle'],
    data () {
        return {
            controlSize: this.width ? this.width : this.height
        }
    },
    methods: {
        updateAngle: function (a){
            const center = {x: this.$data.componentPosition.x + (this.$data.controlSize / 2), y: this.$data.componentPosition.y + (this.$data.controlSize / 2)};
            this.$data.position = {x: jstrig.orbit(center.x, this.$data.controlSize / 2, a, 'cos'), y: jstrig.orbit(center.y, this.$data.controlSize / 2, a, 'sin')};
        },
        dispatchMoveEvent: function () {
            const angleValue = jstrig.angle({x: this.$data.componentPosition.x + (this.$data.controlSize/2), y: this.$data.componentPosition.y + (this.$data.controlSize/2)}, this.$data.position);
            this.$emit('slider-moved', {angle: angleValue, sig: this.sig});
        },
    },
    computed: {
        cssParams: function () {
            const size = this.$data.controlSize;
            const center = {x: this.$data.componentPosition.x + (size / 2), y: this.$data.componentPosition.y + (size / 2)};
            const angle = jstrig.angle(center, this.$data.position);
            const pos = {x: jstrig.orbit(center.x, size / 2, angle, 'cos'), y: jstrig.orbit(center.y, size / 2, angle, 'sin')};
            return {
                '--x': `${pos.x - this.$data.componentPosition.x}px`,
                '--y': `${pos.y - this.$data.componentPosition.y}px`,
                '--padding': `${this.$data.controlSize/2}px`
            };
        }
    },
    watch: {
        angle: function () {
            this.updateAngle(this.angle);
            // const center = {x: this.$data.componentPosition.x + (this.$data.controlSize / 2), y: this.$data.componentPosition.y + (this.$data.controlSize / 2)};
            // this.$data.position = {x: jstrig.orbit(center.x, this.$data.controlSize / 2, this.angle, 'cos'), y: jstrig.orbit(center.y, this.$data.controlSize / 2, this.angle, 'sin')};
        }
    },
    mounted: function () {
        setTimeout(() => {
            this.updateAngle(this.angle);
        }, 10);
    }
}
</script>
<style lang="scss" scoped>
div.drag-container{
    padding: var(--padding);
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