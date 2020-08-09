<template>
    <div>
        HOME
        <ColorTool />
        <!-- <ColorSelector style="width:300px;" :cols="20" :incrament="incrament" v-on:color-selected="onColorSelected" />
        <div :style="'position:relative;left:200px;top:120px;box-shadow:0 -1px 0 #000000;height:1px;width:' + dimensions.width + 'px;'">
            <SliderComponent constraint="horizontal" :width="dimensions.width" :ratiox="rat" :max="255" v-on:slider-moved="onSliderMoved">
                
            </SliderComponent>
            <input type="number" v-model="rat" />
        </div> -->
    </div>
</template>
<script>
import ColorTool from '../components/ColorTool.vue';
// import SliderComponent from '../components/SliderComponent.vue';
export default {
    components: {
        ColorTool
    },
    methods: {
        onColorSelected: function (e) {
            console.log(e);
        },
        onSliderMoved: function (e) {
            console.log(e.x);
            this.$data.rat = e.x;
        }
    }
}
</script>