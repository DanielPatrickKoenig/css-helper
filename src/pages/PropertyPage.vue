<template>
    <div>
        <PropertyEditor v-for="(n, i) in propertyNames" :name="n" :key="'property-'+i.toString()" />
    </div>
</template>
<script>
import Utilities from '../utils/Utilities.js';
import PropertyEditor from '../components/PropertyEditor.vue';
export default {
    components: {
        PropertyEditor
    },
    data () {
        return {
            propertyNames: Utilities.getParameterByName('names').split(',')
        }
    }
}
</script>