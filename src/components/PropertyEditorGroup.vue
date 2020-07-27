<template>
    <div>
        <div>
            <div v-for="(n, i) in propertyNames" :key="'property-'+i.toString()">
                <PropertyEditor v-if="propertyManifest[n].value_max == undefined" :name="n" :index="i" v-on:data-type-selected="onDataTypeSelected">
                    <div v-if="selectePropertyTypes['type'+i.toString()]">
                        <SelectDataRep v-if="selectePropertyTypes['type'+i.toString()].rep == DataReps.SELECT" :data="selectePropertyTypes['type'+i.toString()]" :name="n" v-on:value-change="onValueChange" />
                        <NumberDataRep v-else-if="selectePropertyTypes['type'+i.toString()].rep == DataReps.NUMBER" :data="selectePropertyTypes['type'+i.toString()]" :name="n" v-on:value-change="onValueChange"  />
                        <StringDataRep v-else :data="selectePropertyTypes['type'+i.toString()]" :name="n" v-on:value-change="onValueChange"  />
                    </div>
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
import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
import StringDataRep from '../components/StringDataRep.vue';
// import MultiValueDataRep from '../components/MultiValueDataRep.vue';
import MultiValueEditor from './MultiValueEditor.vue';

export default {
    components: {
        PropertyEditor,
        SelectDataRep,
        NumberDataRep,
        StringDataRep,
        MultiValueEditor
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