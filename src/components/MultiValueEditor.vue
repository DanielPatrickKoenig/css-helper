<template>
    <div>
        <div v-for="(v, i) in values" :key="'property-value-'+i.toString()">
            <PropertyEditor :name="name" :index="i" v-on:data-type-selected="onDataTypeSelected" listed="true">
                <div v-if="propertyTypes[i]">
                    <SelectDataRep v-if="propertyTypes[i].rep == DataReps.SELECT" :data="propertyTypes[i]" :name="name" v-on:value-change="onValueChange" :index="i" />
                    <NumberDataRep v-else-if="propertyTypes[i].rep == DataReps.NUMBER" :data="propertyTypes[i]" :name="name" v-on:value-change="onValueChange" :index="i" />
                    <StringDataRep v-else :data="propertyTypes[i]" :name="name" v-on:value-change="onValueChange" :index="i" />
                </div>
            </PropertyEditor>
        </div>
        <button v-on:click="addValue">Add</button>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
import PropertyEditor from '../components/PropertyEditor.vue';
import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
import StringDataRep from '../components/StringDataRep.vue';
export default {
    components: {
        PropertyEditor,
        SelectDataRep,
        NumberDataRep,
        StringDataRep
    },
    props: ['name'],
    data () {
        return {
            values: [],
            output: [],
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
            // this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            // console.log(this.$data.selectePropertyTypes);
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            // this.$emit('value-change', {value: this.processValue(this.$data.value), name: this.name}
            // console.log(e.value.toString());
            // let propertyData = this.$data.propertyManifest[this.name];
            // let prefix = Utilities.getValueTypeByID(propertyData.property_types[0]).prefix ? Utilities.getValueTypeByID(propertyData.property_types[0]).prefix : '';
            // let suffix = Utilities.getValueTypeByID(propertyData.property_types[0]).suffix ? Utilities.getValueTypeByID(propertyData.property_types[0]).suffix : '';
            this.$data.values.splice(e.index, 1, e.value.toString());
            // console.log(e.index)
            this.$emit('value-change', {value: this.$data.values.join(' '), name: this.name, index: this.index});
            // this.$data.classStructure[e.name] = e.value;
            // this.$data.previewSig = Utilities.createUniqueID();
            // console.log(this.$data.classStructure);
        }
    },
    mounted: function () {
        this.addValue();
    }
}
</script>