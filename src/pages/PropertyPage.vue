<template>
    <div>
        <PropertyEditor v-for="(n, i) in propertyNames" :name="n" :index="i" :key="'property-'+i.toString()" v-on:data-type-selected="onDataTypeSelected">
            <div v-if="selectePropertyTypes['type'+i.toString()]">
                <SelectDataRep v-if="selectePropertyTypes['type'+i.toString()].rep == DataReps.SELECT" :data="selectePropertyTypes['type'+i.toString()]" />
                <NumberDataRep v-if="selectePropertyTypes['type'+i.toString()].rep == DataReps.NUMBER" :data="selectePropertyTypes['type'+i.toString()]" />
            </div>
        </PropertyEditor>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditor from '../components/PropertyEditor.vue';
import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
export default {
    components: {
        PropertyEditor,
        SelectDataRep,
        NumberDataRep
    },
    data () {
        return {
            propertyNames: Utilities.getParameterByName('names').split(','),
            selectePropertyTypes: {},
            DataReps: Utilities.DataReps
        }
    },
    methods: {
        onDataTypeSelected: function (e) {
            this.$data.selectePropertyTypes['type'+e.index.toString()] = Utilities.getValueTypeByID(e.pt);
            console.log(this.$data.selectePropertyTypes);
            this.$forceUpdate();
        }
    }
}
</script>