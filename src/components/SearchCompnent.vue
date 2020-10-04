<template>
    <div class="search-component">
        <input app-controll class="search-box" type="text" v-model="searchTerm" />
        <ul>
            <li v-for="(v, k, i) in searchables" :key="'item-' + i.toString()">
                <slot :name="'content-' + k">
                    {{k}}
                </slot>
            </li>
        </ul>
    </div>    
</template>
<script>
export default {
    props: ['data', 'showonempty'],
    data () {
        return {
            searchTerm: '',
            searchItems: this.data,
            showOnEmpty: this.showonempty
        }
    },
    computed: {
        searchables: function () {
            let items = {}
            for (let k in this.$data.searchItems) {
                if (k.toLowerCase().split(this.$data.searchTerm.toLowerCase()).length > 1 && (this.showOnEmpty || this.$data.searchTerm != '')) {
                    items[k] = this.$data.searchItems[k];
                }
            }
            return items;
        }
    }
}
</script>
<style lang="scss" scoped>
div.search-component{
    > input.search-box{
        width:100%;
    }
    > ul{
        margin:0;
        padding:0;
        width:100%;
        > li{
            display: flex;
            flex-direction: column;
            width:100%;
        }
    }
}
</style>