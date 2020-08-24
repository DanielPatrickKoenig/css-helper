<template>
    <div class="ellipse-tool" :style="cssStyle">
        <svg>
            <ellipse :rx="(size.width*wide).toString()" :ry="(size.height*high).toString()" :cx="(size.width*x).toString()" :cy="(size.height*y).toString()" stroke="rgba(0,0,0,.5)" stroke-width="1" fill="transparent" />
        </svg>
        <svg>
            <ellipse :rx="(size.width*wide).toString()" :ry="(size.height*high).toString()" :cx="(size.width*x).toString()" :cy="(size.height*y).toString()" stroke="rgba(0,0,0,.5)" stroke-width="1" fill="transparent" stroke-dasharray="1 5" />
        </svg>
        <SliderComponent :width="size.width" :height="size.height" :max="max" :ratiox="x" :ratioy="y" v-on:slider-moved="onCenterMoved" :sig="sigs.center">
            <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
        </SliderComponent>
        <div class="size-slider" :style="cssStyle">
            <SliderComponent :width="size.width" :max="max" constraint="horizontal" :ratiox="wide"  v-on:slider-moved="onWidthMoved" :sig="sigs.center" >
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </SliderComponent>
        </div>
        <div v-if="!circular" class="size-slider" :style="cssStyle">
            <SliderComponent :height="size.height" :max="max" constraint="vertical" :ratioy="high"  v-on:slider-moved="onHeightMoved" :sig="sigs.center" >
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </SliderComponent>
        </div>
    </div>
</template>

<script>
import SliderComponent from './SliderComponent.vue';
export default {
    components: {
        SliderComponent
    },
    props: ['circular', 'width', 'height'],
    data () {
        return {
            x: .5,
            y: .5,
            wide: .5,
            high: .5,
            size: {
                width: this.width ? this.width : 100,
                height: this.height ? this.height : 100
            },
            max: 1,
            sigs: {
                center: 'center',
                wide: 'wide',
                high: 'high'
            }
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
    },
    methods: {
        onCenterMoved: function (e) {
            this.$data.x = e.x;
            this.$data.y = e.y;
            this.emitValue();
            // console.log(e);
        },
        onWidthMoved: function (e) {
            this.$data.wide = e.x;
            if(this.circular){
                this.$data.high = this.$data.wide;
            }
            this.emitValue();
        },
        onHeightMoved: function (e) {
            this.$data.high = e.y;
            this.emitValue();
        },
        emitValue: function () {
            const output = this.circular ? `circle(${this.$data.wide*100}% at ${this.$data.x*100}% ${this.$data.y*100}%)` : `ellipse(${this.$data.wide*100}% ${this.$data.high*100}% at ${this.$data.x*100}% ${this.$data.y*100}%)`;
            this.$emit('ellipse-changed', output);
        }
    }
}
</script>

<style lang="scss" scoped>
div.ellipse-tool{
    position:relative;
    width: var(--width);
    height: var(--height);
    box-shadow: 0 0 0 1px rgba(0,0,0,.5);
    svg{
        width:100%;
        height:100%;
        position:absolute;
    }
    svg + svg{
        overflow: visible;
    }
    .size-slider{
        position: absolute;
        left: var(--left);
        top: var(--top);
    }
}
</style>