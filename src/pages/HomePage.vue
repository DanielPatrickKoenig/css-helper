<template>
    <div>
        HOME
        <EaseTool />
        <!-- <GradientTool :name="gProps.name" :type="gProps.type" :initval="gProps.startVals[2]" /> -->
        <!-- <ColorSelector style="width:300px;" :cols="20" :incrament="incrament" v-on:color-selected="onColorSelected" />
        <div :style="'position:relative;left:200px;top:120px;box-shadow:0 -1px 0 #000000;height:1px;width:' + dimensions.width + 'px;'">
            <SliderComponent constraint="horizontal" :width="dimensions.width" :ratiox="rat" :max="255" v-on:slider-moved="onSliderMoved">
                
            </SliderComponent>
            <input app-controll type="number" v-model="rat" />
        </div> -->
    </div>
</template>
<script>
// import GradientTool from '../components/GradientTool.vue';
import Utilities from '../utils/Utilities.js';
// import ShapeTool from '../components/ShapeTool.vue';
import EaseTool from '../components/EaseTool.vue';
// import TransformTool from '../components/TransformTool.vue';
//'type', 'name', 'index', 'composited', 'initval', 'sig'
// import SliderComponent from '../components/SliderComponent.vue';
export default {
    components: {
        EaseTool
        // GradientTool
    },
    data () {
        return {
            gProps: {
                name: 'background-image',
                type: Utilities.PropertyValueTypes.GRADIENT_UI,
                startVals: [
                    'radial-gradient(circle at center top,rgba(0,96.9,0,1) 0%,rgba(255,255,112.2,1) 66.5%,rgba(179.77499999999998,0,0,1) 100%)',
                    'linear-gradient(68.60018986791778deg,rgba(168.3,224.4,0,1) 11%,rgba(19.125,255,164.475,1) 40%,rgba(0,91.8,0,1) 64%,rgba(145.35,0,63.75,1) 92%)',
                    'radial-gradient(circle at 76% 17.5%,rgba(168.3,224.4,0,1) 11%,rgba(19.125,255,164.475,1) 40%,rgba(0,91.8,0,1) 64%,rgba(145.35,0,63.75,1) 92%)'
                ]
            }
        }
        
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