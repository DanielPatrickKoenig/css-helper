<template>
    <div>
        <PropertyEditor v-for="(n, i) in propertyNames" :name="n" :index="i" :key="'property-'+i.toString()" v-on:data-type-selected="onDataTypeSelected">
            <div v-if="selectePropertyTypes['type'+i.toString()]">
                <SelectDataRep v-if="selectePropertyTypes['type'+i.toString()].rep == DataReps.SELECT" :data="selectePropertyTypes['type'+i.toString()]" :name="n" v-on:value-change="onValueChange" />
                <NumberDataRep v-if="selectePropertyTypes['type'+i.toString()].rep == DataReps.NUMBER" :data="selectePropertyTypes['type'+i.toString()]" :name="n" v-on:value-change="onValueChange"  />
            </div>
        </PropertyEditor>
        <HTMLPreview markup="<span>sup</span>" :css="classStructure" selector="" :sig="previewSig" />
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditor from '../components/PropertyEditor.vue';
import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
import HTMLPreview from '../components/HTMLPreview.vue';
export default {
    components: {
        PropertyEditor,
        SelectDataRep,
        NumberDataRep,
        HTMLPreview
    },
    data () {
        return {
            propertyNames: Utilities.getParameterByName('names').split(','),
            selectePropertyTypes: {},
            DataReps: Utilities.DataReps,
            classStructure: {},
            previewSig: Utilities.createUniqueID()
        }
    },
    methods: {
        onDataTypeSelected: function (e) {
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            console.log(this.$data.selectePropertyTypes);
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            this.$data.classStructure[e.name] = e.value;
            this.$data.previewSig = Utilities.createUniqueID();
            console.log(this.$data.classStructure);
        }
    }
}
</script>