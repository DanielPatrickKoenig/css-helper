<template>
    <div>
        <label>Using Steps <input app-controll type="checkbox" v-model="useSteps" v-on:change="emitValue()" style="float:right;" /></label>
        <div v-if="useSteps">
            <button app-controll v-on:click="addRatio()">Add Step</button>
            <ul>
                <li v-for="(ratio, i) in ratios" :key="'ratio-'+i.toString()">
                    <button app-controll v-if="ratios.length > 2" v-on:click="removeRatio(i)" style="float:right;margin-right:15px;margin-top:-6px;"><font-awesome-icon icon="times" /></button>
                    <SliderComponent :width="sliderParams.width" :max="sliderParams.max" :ratiox="ratios[i]" constraint="horizontal" v-on:slider-moved="onSliderMoved" :sig="i" style="margin:6px 0;box-shadow:none;border-top:1px solid rgba(0,0,0,.5);">
                        <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
                    </SliderComponent>
                    <input app-controll type="number" v-model="ratios[i]" :style="ratios.length > 2 ? 'max-width:40px;margin-left:30px;margin-top:-6px;' : 'max-width:40px;margin-left:70px;margin-top:-6px;'" />
                </li>
            </ul>
        </div>
        <ul>
            <li v-for="(property, i) in properties" :key="'property-'+i.toString()" style="display:block;">
                <button app-controll v-on:click="removeProperty(i)" style="float:right;"><font-awesome-icon icon="times" /></button>
                <label>{{property.name}}</label>
                <ul style="margin-top:4px;">
                    <li v-for="(value, j) in properties[i].values" :key="'value-'+i.toString()+'-'+j.toString()" :style="!useSteps && j >= 2 ? 'display:none;' : ''">
                        <label>
                            <span v-if="useSteps">{{Math.round(ratios[j]*100)}}%: </span> 
                            <span v-else>{{j == 0 ? 'from' : 'to'}}: </span> 
                            <input app-controll type="text" v-model="properties[i].values[j]" v-on:change="emitValue()" style="width:30%;float:right;" />
                        </label>
                    </li>
                </ul>
            </li>
        </ul>
        <button app-controll v-on:click="addMode = true;propertyIndexToAdd = 0;">
            Insert Property
        </button>
        <div v-if="addMode">
            <select app-controll v-model="propertyIndexToAdd">
                <option v-for="(property, i) in availableProperties" :key="'available-property-'+i.toString()" :value="i">
                    {{property}}
                </option>
            </select>
            <button app-controll v-on:click="confirmAdd">Add</button>
            <button app-controll v-on:click="addMode = false;">Cancel</button>
        </div>
    </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import BaseDataRep from './base/BaseDataRep.js';
import SliderComponent from './SliderComponent.vue';
export default {
    extends: BaseDataRep,
    components: {
        SliderComponent
    },
    data () {
        return {
            useSteps: false,
            steps: [],
            availableProperties: Utilities.Animatables,
            propertyIndexToAdd: 0,
            properties: [],
            addMode: false,
            keyframeName: `frame-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`,
            ratios: [0, 1],
            sliderParams: {
                width: 160,
                max: 1
            }
        }
    },
    methods: {
        getInitialValues: function () {
            let iVals = [];
            for(let i = 0; i < this.$data.ratios.length; i++) {
                iVals.push(0);
            }
            return iVals;
        },
        confirmAdd: function () {
            this.$data.properties.push(
                {
                    name: this.$data.availableProperties[this.$data.propertyIndexToAdd],
                    values: this.getInitialValues()
                }
            );
            this.$data.addMode = false;
            this.emitValue();
        },
        removeProperty: function (index) {
            this.$data.properties.splice(index, 1);
            this.emitValue();
        },
        getKeyframeString: function () {
            /*
            @keyframes example {
                from {background-color: red;}
                to {background-color: yellow;}
            }
            */
            let frameString = '';
            if(this.$data.useSteps){
                let unitStrings = [];
                // console.log('sup');
                for(let i = 0; i < this.$data.ratios.length; i++){
                    let currentString = `${Math.round(this.$data.ratios[i]*100)}%{`;
                    for(let j = 0; j < this.$data.properties.length; j++){
                        currentString+=`${this.$data.properties[j].name}: ${this.$data.properties[j].values[i]};`;
                    }
                    currentString += '}';
                    unitStrings.push(currentString);
                }
                frameString = unitStrings.join('');
            }
            else{
                let fromString = '';
                let toString = '';
                for(let j = 0; j < this.$data.properties.length; j++){
                    fromString+=`${this.$data.properties[j].name}:${this.$data.properties[j].values[0]};`;
                    toString+=`${this.$data.properties[j].name}:${this.$data.properties[j].values[1]};`;
                }
                frameString+=`from{${fromString}}to{${toString}}`;
            }
            return `@keyframes ${this.$data.keyframeName}{${frameString}}`;
        },
        emitValue: function () {
            this.$emit('value-change', {value: this.$data.keyframeName, name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex, suppliment: this.getKeyframeString()});
            // console.log(this.getKeyframeString());
        },
        addRatio: function () {
            this.$data.ratios.push(0);
            for(let i = 0; i < this.$data.properties.length; i++){
                this.$data.properties[i].values.push(0);
            }
            this.emitValue();
        },
        removeRatio: function (index) {
            this.$data.ratios.splice(index, 1);
            for(let i = 0; i < this.$data.properties.length; i++){
                this.$data.properties[i].values.splice(index, 1);
            }
            this.emitValue();
        },
        onSliderMoved: function (e) {
            this.$data.ratios[e.sig] = e.x;
            this.$forceUpdate();
            this.emitValue();
        }
    }
}
</script>

<style>

</style>