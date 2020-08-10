<template>
    <div v-if="shouldDisplay">
        <select v-model="gradientType">
            <option v-for="(g, k, i) in gradientTypes" :key="'type-'+i.toString()" :value="g">
                {{k}}
            </option>
        </select>
        <div v-if="gradientType == gradientTypes.LINEAR">
            <AngleControl width="100" :max="360" :angle="angle" class="angle-control" v-on:slider-moved="onAngleChange">
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </AngleControl>
            <input type="number" v-model="angle" />
        </div>
        <PositionDirectiveSelector v-else v-on:selection-change="onRadialSelectionChange" />
        <ul class="gradient-position-sliders">

        </ul>
        <ul>
            <li v-for="(c, i) in colors" :key="'color-'+i.toString()">
                <ColorTool :start="c.hue" :index="i" v-on:value-change="colorUpdate" />
                <button v-if="colors.length>2" v-on:click="removeColor(i)">Remove Color</button>
            </li>
            <li><button v-on:click="addColor">Add Color</button></li>
        </ul>
        <div class="gradient-preview" :style="styleString"></div>
    </div>
</template>

<script>
import ColorTool from './ColorTool.vue';
import Utilities from '../utils/Utilities.js';
import AngleControl from './AngleControl.vue';
import PositionDirectiveSelector from './PositionDirectiveSelector.vue';
export default {
    components: {
        ColorTool,
        AngleControl,
        PositionDirectiveSelector
    },
    data () {
        return {
            colors: [{hue: '#000000', position: 0}, {hue: '#ffffff', position: 1}],
            gradientTypes: Utilities.GradientTypes,
            gradientType: Utilities.GradientTypes.LINEAR,
            shouldDisplay: true,
            angle: 0,
            outputString: ''
        }
    },
    computed: {
        styleString: function () {
            console.log(this.getStyleString());
            return `background-image:${this.getStyleString()}`;
        }
    },
    methods: {
        addColor: function () {
            this.$data.colors.push({hue: '#000000', position: 1});
        },
        removeColor: function (index) {
            console.log(index);
            let colorList = [];
            for(let i = 0; i < this.$data.colors.length; i++){
                if(i!=index){
                    colorList.push(this.$data.colors[i]);
                }
            }
            this.$data.colors = colorList;
            this.$data.shouldDisplay = false;
            setTimeout(()=>{
                this.$data.shouldDisplay = true;
            }, 10);
        },
        colorUpdate: function(e){
            console.log(e);
            this.$data.colors[e.index].hue = e.value;

        },
        onAngleChange: function (e) {
            this.$data.angle = e.angle;
        },
        getStyleString: function (forSlider) {
            let sString = '';
            sString += this.$data.gradientType == Utilities.GradientTypes.LINEAR || forSlider ? `${this.$data.gradientType}(${forSlider ? 90 : this.$data.angle}deg` : `${this.$data.gradientType}(circle at top right`;
            sString += ',';
            for(let i = 0; i < this.$data.colors.length; i++){
                if(i > 0){
                    sString += ',';
                }
                sString += `${this.$data.colors[i].hue} ${(this.$data.colors[i].position*100).toString()}%`;
            }
            sString += ')';
            return sString;
        },
        onRadialSelectionChange: function (e) {
            console.log(e);
        }
    }
}
</script>

<style lang="scss" scoped>
.angle-control{
    margin: 12px 0;
}
.gradient-preview{
    width:100px;
    height:100px;
}
</style>