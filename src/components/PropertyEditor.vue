<template>
    <div v-if="propertyDetails">
        <h3>{{name}}</h3>
        <p>{{propertyDetails.description}}</p>
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
    props: ['name', 'index'],
    computed: {
        propertyDetails: function () {
            return this.$root.propertyManifest[this.name];
        }
    },
    methods: {
        getValueTypeByID: Utilities.getValueTypeByID,
        onPropertyTypeSelected: function (pt) {
            this.$emit('data-type-selected', {pt: pt, index: this.index});
        }
    }
}
</script>