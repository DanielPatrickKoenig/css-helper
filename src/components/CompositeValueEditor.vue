<template>
    <div>
        <div v-for="(n, i) in names" :key="'property-'+i.toString()">
            <PropertyEditor :name="n" :index="i" v-on:data-type-selected="onDataTypeSelected">
                <DataRepGroup :type="propertyTypes[i]" :name="n" :index="i" composited="true" :initval="values[i]" v-on:value-change="onValueChange" />
            </PropertyEditor>
        </div>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
import BaseGroupValueEditor from './base/BaseGroupValueEditor.js';
export default {
    extends: BaseGroupValueEditor,
    props: ['names'],
    methods: {
        getValueSeparator: function (name) {
            let sepID = 'default';
            if(Utilities.ValueSeparatorMatrix[name]){
                sepID = name;
            }
            console.log(sepID);
            console.log(Utilities.ValueSeparatorMatrix);
            let sep = Utilities.ValueSeparatorMatrix[sepID].proxy;
            return sep;
        },
        onValueChange: function (e) {
            let valString = ''
            this.$data.values.splice(e.index, 1, e.value.toString());
            for(let i = 0; i < this.$data.values.length; i++){
                if(i>0){
                    valString += this.getValueSeparator(this.names[i])
                }
                valString += this.$data.values[i].toString();
            }
            this.$emit('value-change', {value: valString, name: this.name, index: e.index, type: this.$data.propertyTypes});
        }
    },
    mounted: function () {
        let valueList = [];
        
        if(Utilities.propertyisLogged(this, this.name)){
            let targetSeparator = Utilities.ValueSeparatorMatrix['default'].proxy;
            let currentValue = this.$root.selectorPropertyMatrix[this.$root.selectorList[this.$root.selectorIndex]].css[this.name];
            for(let v in Utilities.ValueSeparatorMatrix){
                currentValue = currentValue.split(Utilities.ValueSeparatorMatrix[v].proxy).join(targetSeparator);
            }
            valueList = currentValue.split(targetSeparator);
        }

        console.log(valueList);

        for(let i = 0; i < this.names.length; i++){
            let propertyData = this.$data.propertyManifest[this.names[i]];
            this.$data.propertyTypes.push(Utilities.getValueTypeByID(propertyData.property_types[0]));
            this.$data.values.push(valueList[i] ? valueList[i] : '0');
        }
        console.log(this.$data.values);
    }
}
</script>