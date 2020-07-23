<template>
    <div class="attribute-row">
        <label>
            <button v-on:click="options">
                <font-awesome-icon icon="cog" />
            </button>
            <span>{{name}}</span>
            <input type="text" v-model="value" />
            <button v-on:click="remove">
                <font-awesome-icon icon="times" />
            </button>
        </label>
    </div>
</template>
<script>
export default {
    props: ['name', 'data', 'sig'],
    data() {
        return {
            value: ''
        }
    },
    methods: {
        remove: function () {
            this.$emit('remove-attribute', this.sig)
        },
        options: function () {
            this.$emit('attribute-options', this.sig)
        }
    }
}
</script>
<style lang="scss" scoped>
div.attribute-row{
    width:100%;
    display:block;
    > label{
        width: 100%;
        display: flex;
        align-items:center;
        flex-direction: row;
        > span{
            display:inline-flex;
            flex-grow: 4;
            width: 55%;
        }
        > input{
            display:inline-flex;
            flex-grow:2;
        }
        > button{
            display:inline-flex;
            flex-grow:1;
        }
    }
    
}
</style>