<template>
    <div class="property-selection-item">
        <span>{{name}}</span>
        <button class="button-add" v-on:click="addClicked">
            <font-awesome-icon icon="plus" />
        </button>
        <button class="button-info" v-on:click="infoClicked">
            <font-awesome-icon icon="info" />
        </button>
    </div>
</template>
<script>
export default {
    props: ['data', 'name'],
    methods: {
        addClicked: function () {
            this.$emit('property-added', {name: this.name, data: this.data});
        },
        infoClicked: function () {
            this.$emit('property-info', {name: this.name, data: this.data});
        }
    }
}
</script>
<style lang="scss" scoped>
div.property-selection-item{
    display:flex;
    align-items:center;
    > span {
        display:inline-flex;
        flex-grow: 3;
        width:60%;
    }
    > button{
        display:inline-flex;
        flex-grow: 1;
    }
}
</style>