<template>
    <div>
        <AttributeRow v-for="(a, i) in attributes" :key="'attribute-'+i.toString()" :name="a.name" :data="a.data" :sig="a.sig" v-on:remove-attribute="removeAttribute" />
        <AttributeSelector :data="data" v-on:property-added="added" v-on:property-info="info" />
    </div>
</template>
<script>
import AttributeRow from './AttributeRow.vue';
import AttributeSelector from './AttributeSelector.vue';
import Utilities from '../utils/Utilities.js';
export default {
    props: ['data'],
    data () {
        return {
            attributes: []
        }
    },
    components: {
        AttributeSelector,
        AttributeRow
    },
    methods: {
        added: function (e) {
            this.$data.attributes.push({name: e.name, data: e.data, sig: Utilities.createUniqueID()});
            // // console.log(e);
        },
        info: function (e) {
            // console.log(e);
        },
        removeAttribute: function (e) {
            this.$data.attributes.splice(Utilities.getArrayIndexByValue(this.$data.attributes, e, 'sig'), 1);
        }
    }
}
</script>