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
import PropertyEditor from '../components/PropertyEditor.vue';
import DataRepGroup from './DataRepGroup.vue';
export default {
    components: {
        PropertyEditor,
        DataRepGroup
    },
    props: ['name'],
    data () {
        return {
            values: [],
            propertyManifest: this.$root.propertyManifest,
            propertyTypes: [],
            DataReps: Utilities.DataReps
        }
    },
    methods: {
        addValue: function () {
            let propertyData = this.$data.propertyManifest[this.name];
            this.$data.propertyTypes.push(Utilities.getValueTypeByID(propertyData.property_types[0]));
            this.$data.values.push('0');
        },
        onDataTypeSelected: function (e) {
            this.$emit('data-type-selected', e);
            console.log(e.pt);
            this.$data.propertyTypes.splice(e.index, 1, Utilities.getValueTypeByID(e.pt));
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            this.$data.values.splice(e.index, 1, e.value.toString());
            this.$emit('value-change', {value: this.$data.values.join(' '), name: this.name, index: this.index});
        },
        removeValue: function (index) {
            this.$data.values.splice(index, 1);
            this.$data.propertyTypes.splice(index, 1);
            this.$emit('value-change', {value: this.$data.values.join(' '), name: this.name, index: this.index});
        }
    },
    mounted: function () {
        this.addValue();
    }
}
</script>