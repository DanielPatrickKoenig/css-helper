<template>
    <div v-if="propertyManifest">
        <h3 v-if="!listed || index == 0">{{name}}</h3>
        <p v-if="!listed || index == 0">{{propertyManifest.description}}</p>
        <p v-if="listed">Value {{(index + 1).toString()}}</p>
        <ul>
            <li v-for="(v, i) in propertyManifest[this.name].property_types" :key="'type-'+i.toString()">
                <a v-on:click="onPropertyTypeSelected(v)">{{getValueTypeByID(v).label}}</a>
            </li>
        </ul>
        <slot></slot>
        <!-- <select>
            <option v-for="(v, i) in propertyManifest[this.name].property_types" :key="'type-'+i.toString()" :value="v">{{getValueTypeByID(v).label}}</option>
        </select> -->
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
import {mapState} from 'vuex';
export default {
    props: ['name', 'index', 'listed'],
    computed: {
        ...mapState(['propertyManifest', 'selectorIndex', 'selectorList', 'selectorPropertyMatrix', 'selectorTypeMatrix'])
        // propertyDetails: function () {
        //     return this.$store.propertyManifest[this.name];
        // }
    },
    methods: {
        getValueTypeByID: Utilities.getValueTypeByID,
        onPropertyTypeSelected: function (pt) {
            this.$emit('data-type-selected', {pt: pt, index: this.index, name: this.name});
        }
    },
    mounted: function () {
        console.log('manifest - ',this.propertyManifest);
        let firstSelection = 0;
        // this.onPropertyTypeSelected(firstSelection);
        // scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[scope.$store.state.selectorIndex], 'type', name]);
        if(this.selectorTypeMatrix[this.selectorList[this.selectorIndex]]){
            if(this.selectorTypeMatrix[this.selectorList[this.selectorIndex]].type){
                if(this.selectorTypeMatrix[this.selectorList[this.selectorIndex]].type[this.name]){
                    this.selectorTypeMatrix[this.selectorList[this.selectorIndex]].type[this.name]['type_'+this.index.toString()]
                    let propertyType = Utilities.hasPropertyTypeList(this, this.name) ? Utilities.getValueTypeByID(this.selectorTypeMatrix[this.selectorList[this.selectorIndex]].type[this.name]['type_'+this.index.toString()]) : Utilities.getValueTypeByID(this.selectorTypeMatrix[this.selectorList[this.selectorIndex]].type[this.name]);
                    for(let i = 0; i < this.propertyManifest[this.name].property_types.length; i++) {
                        if (propertyType.id == Utilities.getValueTypeByID(this.propertyManifest[this.name].property_types[i]).id){
                            firstSelection = i;
                        }
                    }
                }
            }
        }
        this.$emit('data-type-selected', {pt: this.propertyManifest[this.name].property_types[firstSelection], index: this.index, name: this.name});
    }
}
</script>