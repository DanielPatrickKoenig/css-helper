<template>
    <div class="inset-tool" :style="cssStyle">
        <svg>
            <line :x1="left*size.width" :x2="left*size.width" y1="0" :y2="size.height" stroke-width="1" fill="transparent" stroke-dasharray="1 2" stroke="rgba(0,0,0,.5)"/>
            <line :x1="right*size.width" :x2="right*size.width" y1="0" :y2="size.height" stroke-width="1" fill="transparent" stroke-dasharray="1 2" stroke="rgba(0,0,0,.5)"/>
            <line :y1="top*size.height" :y2="top*size.height" x1="0" :x2="size.width" stroke-width="1" fill="transparent" stroke-dasharray="1 2" stroke="rgba(0,0,0,.5)"/>
            <line :y1="bottom*size.height" :y2="bottom*size.height" x1="0" :x2="size.width" stroke-width="1" fill="transparent" stroke-dasharray="1 2" stroke="rgba(0,0,0,.5)"/>
            <rect :x="left*size.width" :y="top*size.height" :width="(right-left)*size.width" :height="(bottom-top)*size.height" fill="transparent" stroke="rgba(0,0,0.5)" stroke-width="1" />
        </svg>
        <SliderComponent :width="size.width" :max="max" constraint="horizontal" :ratiox="left"  v-on:slider-moved="onLeftMoved" class="slider-horizontal">
            <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
        </SliderComponent>
        <SliderComponent :height="size.height" :max="max" constraint="vertical" :ratioy="top"  v-on:slider-moved="onTopMoved" class="slider-vertical">
            <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
        </SliderComponent>
        <SliderComponent :width="size.width" :max="max" constraint="horizontal" :ratiox="right"  v-on:slider-moved="onRightMoved" class="slider-horizontal">
            <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
        </SliderComponent>
        <SliderComponent :height="size.height" :max="max" constraint="vertical" :ratioy="bottom"  v-on:slider-moved="onBottomMoved" class="slider-vertical">
            <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
        </SliderComponent>
    </div>
</template>

<script>
import BaseShapeSubTool from './base/BaseShapeSubTool.js';
export default {
    extends: BaseShapeSubTool,
    data () {
        return {
            left: .2,
            top: .2,
            right: .8,
            bottom: .8
        }
    },
    methods: {
        onLeftMoved: function (e) {
            this.$data.left = e.x;
        },
        onTopMoved: function (e) {
            this.$data.top = e.y;
        },
        onRightMoved: function (e) {
            this.$data.right = e.x;
        },
        onBottomMoved: function (e) {
            this.$data.bottom = e.y;
        },
        getOutput: function () {
            return `inset(${this.$data.top*100}% ${this.$data.right*100}% ${this.$data.bottom*100}% ${this.$data.left*100}%)`;
        }
    },
    computed: {
        cssStyle: function () {
            return {
                '--left':`${(this.$data.x*100).toString()}%`,
                '--top':`${(this.$data.y*100).toString()}%`,
                '--width':`${this.$data.size.width}px`,
                '--height':`${this.$data.size.height}px`
            };
        }
    }
}
</script>

<style lang="scss" scoped>
div.inset-tool{
    box-shadow: 0 0 0 1px rgba(0,0,0,.5);
    position: relative;
    width:var(--width);
    height:var(--height);
    svg{
        width:100%;
        height:100%;
        position:absolute;
    }
    .slider-horizontal{
        top:50%;
        
    }
    .slider-vertical{
        left:50%;
    }
}
</style>