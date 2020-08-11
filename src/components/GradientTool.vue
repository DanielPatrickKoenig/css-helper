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
        <PositionDirectiveSelector v-else v-on:selection-change="onRadialSelectionChange" :shape="radialData.shape" :position1="radialData.positions[0].position" :position2="radialData.positions[1].position" :ratio1="radialData.positions[0].ratio" :ratio2="radialData.positions[1].ratio" />
        <ul class="gradient-position-sliders" :style="'background-image:'+getStyleString(true)+';width:'+gradiantPositionParams.width.toString()+'px;'">
            <li v-for="(c, i) in colors" :key="'color-'+i.toString()">
                <SliderComponent :width="gradiantPositionParams.width" :max="gradiantPositionParams.max" :ratiox="colors[i].position" :constraint="gradiantPositionParams.constraint" :sig="i" v-on:slider-moved="onPositionChanged">
                    <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;box-shadow: 0 0 0 1px #ffffff"></div>
                </SliderComponent>
            </li>
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
import SliderComponent from './SliderComponent.vue';
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    components: {
        ColorTool,
        AngleControl,
        PositionDirectiveSelector,
        SliderComponent
    },
    data () {
        return {
            colors: [{hue: '#000000', position: 0}, {hue: '#ffffff', position: 1}],
            gradientTypes: Utilities.GradientTypes,
            gradientType: Utilities.GradientTypes.LINEAR,
            shouldDisplay: true,
            angle: 0,
            outputString: '',
            radialData: {
                shape: 'circle',
                positions: [{position: Utilities.PositionDirectives.CENTER, ratio: 50},{position: Utilities.PositionDirectives.CENTER, ratio: 50}]
            },
            gradiantPositionParams: {
                width: 200,
                max: 1,
                constraint: 'horizontal'
            }
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
            let gradientFunc = forSlider ? Utilities.GradientTypes.LINEAR : this.$data.gradientType;
            sString += this.$data.gradientType == Utilities.GradientTypes.LINEAR || forSlider ? `${gradientFunc}(${forSlider ? 90 : this.$data.angle}deg` : `${this.$data.gradientType}(${this.getRadialShapeAndPositionString()}`;
            sString += ',';
            for(let i = 0; i < this.$data.colors.length; i++){
                if(i > 0){
                    sString += ',';
                }
                sString += `${this.$data.colors[i].hue} ${(this.$data.colors[i].position*100).toString()}%`;
            }
            sString += ')';
            console.log(sString);
            return sString;
        },
        onRadialSelectionChange: function (e) {
            this.$data.radialData = e;
        },
        getRadialShapeAndPositionString: function () {
            const pos1 = this.$data.radialData.positions[0].position == Utilities.PositionDirectives.PERCENTAGE ? `${this.$data.radialData.positions[0].ratio}%` : this.$data.radialData.positions[0].position;
            const pos2 = this.$data.radialData.positions[1].position == Utilities.PositionDirectives.PERCENTAGE ? `${this.$data.radialData.positions[1].ratio}%` : this.$data.radialData.positions[1].position;
            return `${this.$data.radialData.shape} at ${pos1} ${pos2}`;
        },
        onPositionChanged: function (e) {
            console.log(e);
            this.$data.colors[e.sig].position = e.x;
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
.gradient-position-sliders{
    display:block;
    padding: 3em 0;
    margin:0;
    > li{
        display:block;
        margin:0;
        padding:0;
    }
}
</style>