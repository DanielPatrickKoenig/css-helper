<template>
    <div v-if="propertyDetails">
        <h3 v-if="!listed || index == 0">{{name}}</h3>
        <p v-if="!listed || index == 0">{{propertyDetails.description}}</p>
        <p v-if="listed">Value {{(index + 1).toString()}}</p>
        <ul>
            <li v-for="(v, i) in propertyDetails.property_types" :key="'type-'+i.toString()">
                <a v-on:click="onPropertyTypeSelected(v)">{{getValueTypeByID(v).label}}</a>
            </li>
        </ul>
        <slot></slot>
        <!-- <select>
            <option v-for="(v, i) in propertyDetails.property_types" :key="'type-'+i.toString()" :value="v">{{getValueTypeByID(v).label}}</option>
        </select> -->
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
export default {
    props: ['name', 'index', 'listed'],
    computed: {
        propertyDetails: function () {
            return this.$root.propertyManifest[this.name];
        }
    },
    methods: {
        getValueTypeByID: Utilities.getValueTypeByID,
        onPropertyTypeSelected: function (pt) {
            this.$emit('data-type-selected', {pt: pt, index: this.index, name: this.name});
        }
    },
    mounted: function () {
        let firstSelection = 0;
        // this.onPropertyTypeSelected(firstSelection);
        
        if(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]]){
            if(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type){
                if(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]){
                    if(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]){
                        console.log('this should be the index', this.index.toString());
                        console.log('this should show types', this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]);
                        console.log('this should show type', this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]['type_'+this.index.toString()]);
                        console.log('this should show type object', Utilities.getValueTypeByID(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]['type_'+this.index.toString()]));
                    }
                    this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]['type_'+this.index.toString()]
                    let propertyType = Utilities.hasPropertyTypeList(this, this.name) ? Utilities.getValueTypeByID(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]['type_'+this.index.toString()]) : Utilities.getValueTypeByID(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]);
                    for(let i = 0; i < this.propertyDetails.property_types.length; i++) {
                        if (propertyType.id == Utilities.getValueTypeByID(this.propertyDetails.property_types[i]).id){
                            firstSelection = i;
                        }
                    }
                    if(Utilities.hasPropertyTypeList(this, this.name)){
                        console.log(Utilities.getValueTypeByID(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]['type_'+this.index.toString()]));
                    }
                    else{
                        console.log(Utilities.getValueTypeByID(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]));
                    }
                    
                }
            }
        }
        
        this.$emit('data-type-selected', {pt: this.propertyDetails.property_types[firstSelection], index: this.index, name: this.name});
        console.log(this.$root.selectorPropertyMatrix);
        console.log(this.$root.selectorTypeMatrix[this.$root.selectorList[this.$root.selectorIndex]].type[this.name]);
    }
}
</script>