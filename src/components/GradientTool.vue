<template>
    <div v-if="shouldDisplay">
        <div class="editor-section-sub-header">
            Gradient Type: 
            <select v-model="gradientType">
                <option v-for="(g, k, i) in gradientTypes" :key="'type-'+i.toString()" :value="g">
                    {{k}}
                </option>
            </select>
        </div>
        <div v-if="gradientType == gradientTypes.LINEAR">
            <AngleControl width="100" :max="360" :angle="angle" class="angle-control" v-on:slider-moved="onAngleChange">
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </AngleControl>
            <div>Angle <input type="number" v-model="angle" /></div>
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
            <li v-for="(c, i) in colors" :key="'color-'+i.toString()" class="colapsable-section" style="display:block;">
                <input :id="uniqueID + '-' + i.toString()" type="checkbox" style="display:none;" />
                <label :for="uniqueID + '-' + i.toString()"><span :style="'background-color:'+c.hue+';box-shadow:0 0 0 1px rgba(0,0,0,.4);display:inline-block;padding:8px;'"></span> Color {{(i + 1).toString()}}</label>
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
                width: 280,
                max: 1,
                constraint: 'horizontal'
            },
            uniqueID: Utilities.createUniqueID()
        }
    },
    computed: {
        styleString: function () {
            console.log(this.getStyleString());
            return `background-image:${this.getStyleString()}`;
        }
    },
    methods: {
        emitValue: function () {
            this.$emit('value-change', {value: this.getStyleString(), name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        },
        addColor: function () {
            this.$data.colors.push({hue: '#000000', position: 1});
            this.emitValue();
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
                this.emitValue();
            }, 10);
        },
        colorUpdate: function(e){
            console.log(e);
            this.$data.colors[e.index].hue = e.value;
            this.emitValue();

        },
        onAngleChange: function (e) {
            this.$data.angle = e.angle;
            this.emitValue();
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
            this.emitValue();
        },
        getRadialShapeAndPositionString: function () {
            const pos1 = this.$data.radialData.positions[0].position == Utilities.PositionDirectives.PERCENTAGE ? `${this.$data.radialData.positions[0].ratio}%` : this.$data.radialData.positions[0].position;
            const pos2 = this.$data.radialData.positions[1].position == Utilities.PositionDirectives.PERCENTAGE ? `${this.$data.radialData.positions[1].ratio}%` : this.$data.radialData.positions[1].position;
            return `${this.$data.radialData.shape} at ${pos1} ${pos2}`;
        },
        onPositionChanged: function (e) {
            console.log(e);
            this.$data.colors[e.sig].position = e.x;
            this.emitValue();
        },
        parseValue: function (val){
            if(val.split(Utilities.GradientTypes.LINEAR).length > 1 || val.split(Utilities.GradientTypes.RADIAL).length > 1){
                this.$data.shouldDisplay = false;
                let openParenList = val.split('(');
                this.$data.gradientType = val.split('(')[0];
                openParenList.splice(0, 1);
                let innerVal = openParenList.join('(');
                let closeList = innerVal.split(')');
                closeList.splice(closeList.length - 1, 1);
                innerVal = closeList.join(')');
                const sectionSep = 'SECTION_SEPERATOR'
                let valSectionList = innerVal.split(',rgb').join(sectionSep+'rgb').split('#').join(sectionSep+'#').split(sectionSep);
                console.log('innerVal', innerVal);
                if(val.split('(')[0] == Utilities.GradientTypes.LINEAR){
                    this.$data.angle = Number(valSectionList[0].split('deg')[0]);
                }
                else {
                    this.$data.radialData.shape = valSectionList[0].split(' at ')[0];
                    this.$data.radialData.positions[0].position = valSectionList[0].split(' at ')[1].split(' ')[0].split('%').length > 1 ? Utilities.PositionDirectives.PERCENTAGE : valSectionList[0].split(' at ')[1].split(' ')[0];
                    this.$data.radialData.positions[1].position = valSectionList[0].split(' at ')[1].split(' ')[1].split('%').length > 1 ? Utilities.PositionDirectives.PERCENTAGE : valSectionList[0].split(' at ')[1].split(' ')[1];
                    if(valSectionList[0].split(' at ')[1].split(' ')[0].split('%').length > 1){
                        this.$data.radialData.positions[0].ratio = Number(valSectionList[0].split(' at ')[1].split(' ')[0].split('%')[0]);
                    }
                    if(valSectionList[0].split(' at ')[1].split(' ')[1].split('%').length > 1){
                        this.$data.radialData.positions[1].ratio = Number(valSectionList[0].split(' at ')[1].split(' ')[1].split('%')[0]);
                    }
                }
                this.$data.colors = [];
                for(let i = 1;i<valSectionList.length;i++){
                    this.$data.colors.push({hue: valSectionList[i].split(' ')[0], position: Number(valSectionList[i].split(' ')[1].split('%')[0])/100});
                }
                setTimeout(()=>{
                    this.$data.shouldDisplay = true;
                }, 10);
            }
            
            // console.log(this.data);
            // let pre = this.data.prefix ? this.data.prefix : '';
            // let suf = this.data.suffix ? this.data.suffix : '';
            // // console.log(val.split(pre).join('').split(suf).join(''));
            // return val.split(pre).join('').split(suf).join('');
            return val;
        }
    }
}
</script>

<style lang="scss" scoped>
.angle-control{
    margin: 12px 0;
}
.angle-control + div{
    width:40px;
    text-align: center;
    margin: -82px auto 60px auto;
    > input{
        width:100%;
    }
}
.gradient-preview{
    width:100px;
    height:100px;
}
.gradient-position-sliders{
    display:block;
    padding: 3em 0;
    margin:0 !important;
    > li{
        display:block;
        margin:0;
        padding:0;
        > div{
            display:inline !important;
            margin:0 !important;
        }
    }
}
</style>