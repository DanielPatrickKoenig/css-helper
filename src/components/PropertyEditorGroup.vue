<template>
    <div>
        <div>
            <div v-for="(n, i) in propertyNames" :key="'property-'+i.toString()">
                <div v-if="propertyManifest[n].property_types[0] == PropertyValueTypes.CSS_CLASS_UI.id">
                    <CompositeValueEditor :sindex="sindex" :names="getSubProperties(n)" :name="n" v-on:value-change="onValueChange" />
                </div>
                <PropertyEditor v-else-if="propertyManifest[n].value_max == undefined" :name="n" :sindex="sindex" :index="i" v-on:data-type-selected="onDataTypeSelected">
                    <DataRepGroup :sindex="sindex" :type="selectePropertyTypes['type'+i]" :name="n" :index="i" v-on:value-change="onValueChange" :initval="iVals[i]" />
                </PropertyEditor>
                <div v-else>
                    <MultiValueEditor :sindex="sindex" :name="n" v-on:value-change="onValueChange" />
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
import CompositeValueEditor from './CompositeValueEditor.vue';
import {mapState} from 'vuex';
export default {
    components: {
        PropertyEditor,
        MultiValueEditor,
        DataRepGroup,
        CompositeValueEditor
    },
    props: ['names', 'types', 'sig', 'multiples', 'sindex'],
    data () {
        return {
            propertyNames: this.names,
            selectePropertyTypes: this.types,
            DataReps: Utilities.DataReps,
            // propertyManifest: this.$root.propertyManifest,
            PropertyValueTypes: Utilities.PropertyValueTypes,
            ready: false,
            iVals: []
        }
    },
    watch: {
        sig: function () {
            this.$data.selectePropertyTypes = this.types;
        }
    },
    computed: {
        ...mapState(['propertyManifest', 'selectorIndex', 'selectorList', 'selectorPropertyMatrix', 'selectorTypeMatrix'])
    },
    methods: {
        onDataTypeSelected: function (e) {
            this.$emit('data-type-selected', e);
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            // console.log(this.$data.selectePropertyTypes);
            Utilities.addToTypeLog(this, e.name, e.index, e.sindex, e.pt);
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            // this.$emit('value-change', e);
            console.log(this.$store.state);
            this.$store.dispatch('setPropertyMatrixValue', [this.selectorList[this.sindex], 'css', e.name, e.value]);
            this.$emit('value-change', e);
            
            // this.$data.classStructure[e.name] = e.value;
            // this.$data.previewSig = Utilities.createUniqueID();
            // console.log(this.$data.classStructure);
        },
        getSubProperties: function (name) {
            let subProperties = this.propertyManifest[name].sub_properties;
            let pNames = [];
            for(let i = 0; i < subProperties.length; i++){
                pNames.push(Utilities.getPropertyDataByIndex(this.propertyManifest, subProperties[i]).name);
            }
            return pNames;
        }
    },
    mounted: function () {
        setTimeout(function (self) {
            
            for(let i = 0; i < self.$data.propertyNames.length; i++){
                let name = self.$data.propertyNames[i];
                if(this.selectorPropertyMatrix[this.selectorList[this.sindex]].css[self.$data.propertyNames[i]]){

                    let iVal = this.selectorPropertyMatrix[this.selectorList[this.sindex]].css[self.$data.propertyNames[i]] != undefined ? this.selectorPropertyMatrix[this.selectorList[this.sindex]].css[self.$data.propertyNames[i]] : '';
                    this.$data.iVals.push(iVal);
                }
                if(self.selectorTypeMatrix[self.selectorList[self.sindex]].type[name]){
                    self.$data.selectePropertyTypes['type'+i.toString()] = Utilities.getValueTypeByID(self.selectorTypeMatrix[self.selectorList[self.sindex]].type[name]);
                }
            }
            self.$forceUpdate();
            console.log('these are the property types', self.$data.selectePropertyTypes);
        }, 100, this);
        
        // this.$data.selectePropertyTypes['type'+i]
    }
}
</script>