<template>
    <div>
        <label>Using Steps <input type="checkbox" v-model="useSteps" v-on:change="emitValue()" /></label>
        <ul>
            <li v-for="(property, i) in properties" :key="'property-'+i.toString()">
                <button v-on:click="removeProperty(i)">remove</button>
                <label>{{property.name}}</label>
                <ul>
                    <li v-for="(value, j) in properties[i].values" :key="'value-'+i.toString()+'-'+j.toString()">
                        <label>
                            <span v-if="useSteps">step-{{j}}: </span> 
                            <span v-else>{{j == 0 ? 'from' : 'to'}}: </span> 
                            <input type="text" v-model="properties[i].values[j]" v-on:change="emitValue()" />
                        </label>
                    </li>
                </ul>
            </li>
        </ul>
        <button v-on:click="addMode = true;propertyIndexToAdd = 0;">
            Insert Property
        </button>
        <div v-if="addMode">
            <select v-model="propertyIndexToAdd">
                <option v-for="(property, i) in availableProperties" :key="'available-property-'+i.toString()" :value="i">
                    {{property}}
                </option>
            </select>
            <button v-on:click="confirmAdd">Add</button>
            <button v-on:click="addMode = false;">Cancel</button>
        </div>
    </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    data () {
        return {
            useSteps: false,
            steps: [],
            availableProperties: Utilities.Animatables,
            propertyIndexToAdd: 0,
            properties: [],
            addMode: false,
            keyframeName: `frame-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}` 
        }
    },
    methods: {
        getInitialValues: function () {
            return [0,0];
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
                console.log('sup')
                // for(let i = 0; i < this.$data.steps.length; i++){

                // }
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
        }
    }
}
</script>

<style>

</style>