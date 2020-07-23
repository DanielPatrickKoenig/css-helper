<template>
    <div>
        <SearchCompnent :data="data" :showonempty="false">
            <PropertySelectionRow v-for="(v, k, i) in data" :key="'searchable' + i.toString()" :slot="'content-' + k" :name="k" :data="v" v-on:property-added="added" v-on:property-info="info" />
        </SearchCompnent>
    </div>
</template>
<script>
import SearchCompnent from './SearchCompnent.vue';
import PropertySelectionRow from './PropertySelectionRow.vue';
export default {
    props: ['data'],
    components: {
        SearchCompnent,
        PropertySelectionRow
    },
    methods: {
        added: function (e) {
            this.$emit('property-added', e);
        },
        info: function (e) {
            this.$emit('property-info', e);
        }
    }
}
</script>