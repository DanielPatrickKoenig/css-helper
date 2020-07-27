<template>
    <div>
        <div>
            <div v-for="(n, i) in propertyNames" :key="'property-'+i.toString()">
                <PropertyEditor v-if="propertyManifest[n].value_max == undefined" :name="n" :index="i" v-on:data-type-selected="onDataTypeSelected">
                    <DataRepGroup :type="selectePropertyTypes['type'+i]" :name="n" :index="i" v-on:value-change="onValueChange" />
                </PropertyEditor>
                <div v-else>
                    <MultiValueEditor :name="n" v-on:value-change="onValueChange" />
                </div>
            </div>
            <button v-if="!multiples">
                Add
            </button>
        </div>
        
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
import PropertyEditor from '../components/PropertyEditor.vue';
import MultiValueEditor from './MultiValueEditor.vue';
import DataRepGroup from './DataRepGroup.vue';

export default {
    components: {
        PropertyEditor,
        MultiValueEditor,
        DataRepGroup
    },
    props: ['names', 'types', 'sig', 'multiples'],
    data () {
        return {
            propertyNames: this.names,
            selectePropertyTypes: this.types,
            DataReps: Utilities.DataReps,
            propertyManifest: this.$root.propertyManifest
        }
    },
    watch: {
        sig: function () {
            this.$data.selectePropertyTypes = this.types;
        }
    },
    methods: {
        onDataTypeSelected: function (e) {
            this.$emit('data-type-selected', e);
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            console.log(this.$data.selectePropertyTypes);
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            this.$emit('value-change', e);
            // this.$data.classStructure[e.name] = e.value;
            // this.$data.previewSig = Utilities.createUniqueID();
            // console.log(this.$data.classStructure);
        }
    }
}
</script>