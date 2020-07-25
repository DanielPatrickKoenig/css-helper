<template>
    <div v-if="propertyDetails">
        <h3>{{name}}</h3>
        <p>{{propertyDetails.description}}</p>
        <ul>
            <li v-for="(v, i) in propertyDetails.property_types" :key="'type-'+i.toString()">{{getValueTypeByID(v).label}}</li>
        </ul>
        <!-- <select>
            <option v-for="(v, i) in propertyDetails.property_types" :key="'type-'+i.toString()" :value="v">{{getValueTypeByID(v).label}}</option>
        </select> -->
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
export default {
    props: ['name'],
    computed: {
        propertyDetails: function () {
            return this.$root.propertyManifest[this.name];
        }
    },
    methods: {
        getValueTypeByID: Utilities.getValueTypeByID
    }
}
</script>