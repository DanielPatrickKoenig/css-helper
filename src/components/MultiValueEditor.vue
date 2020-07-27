<template>
    <div>
        <div v-for="(v, i) in values" :key="'property-value-'+i.toString()">
            <button v-if="values.length > 1" v-on:click="removeValue(i)">
                <font-awesome-icon icon="times" />
            </button>
            <PropertyEditor :name="name" :index="i" v-on:data-type-selected="onDataTypeSelected" listed="true">
                <DataRepGroup :type="propertyTypes[i]" :name="name" :index="i" v-on:value-change="onValueChange" />
            </PropertyEditor>
        </div>
        <button v-if="values.length < propertyManifest[name].value_max || propertyManifest[name].value_max < 0" v-on:click="addValue">
            <font-awesome-icon icon="plus" /> Add Entry
        </button>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
import BaseGroupValueEditor from './base/BaseGroupValueEditor.js';
export default {
    extends: BaseGroupValueEditor,
    methods: {
        addValue: function () {
            let propertyData = this.$data.propertyManifest[this.name];
            this.$data.propertyTypes.push(Utilities.getValueTypeByID(propertyData.property_types[0]));
            this.$data.values.push('0');
        },
        removeValue: function (index) {
            this.$data.values.splice(index, 1);
            this.$data.propertyTypes.splice(index, 1);
            this.$emit('value-change', {value: this.$data.values.join(this.getValueSeparator(this.name)), name: this.name, index: this.index});
        }
    },
    mounted: function () {
        this.addValue();
    }
}
</script>