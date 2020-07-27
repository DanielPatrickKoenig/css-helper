<template>
    <div>
        <PropertyEditorGroup :names="propertyNames" :types="selectePropertyTypes" sig="a" v-on:data-type-selected="onDataTypeSelected" v-on:value-change="onValueChange" multiples="true" />
        <HTMLPreview markup="<span>sup</span>" :css="classStructure" selector="" :sig="previewSig" />
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditorGroup from '../components/PropertyEditorGroup.vue';

import HTMLPreview from '../components/HTMLPreview.vue';

export default {
    components: {
        PropertyEditorGroup,
        HTMLPreview
    },
    data () {
        return {
            propertyNames: Utilities.getParameterByName('names').split(','),
            selectePropertyTypes: {},
            DataReps: Utilities.DataReps,
            classStructure: {},
            previewSig: Utilities.createUniqueID(),
            editorGroupSig: Utilities.getValueTypeByID()
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