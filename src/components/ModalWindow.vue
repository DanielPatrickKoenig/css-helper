<template>
    <div class="modal-shell-window">
        <div class="modal-outer-window" v-on:click="closedClicked"></div>
        <div class="modal-inner-widnow">
            <label>
                {{title}}
                <button app-controll v-on:click="closedClicked"><font-awesome-icon icon="times" /></button>
            </label>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title'],
    methods: {
        closedClicked: function () {
            this.$emit('modal-close-clicked', {});
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../scss/variables.scss';
@import '../scss/mixins.scss';
div.modal-shell-window{
    position:fixed;
    z-index:200;
    left:0;
    top:0;
    right:0;
    bottom:0;
    > div.modal-outer-window{
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background-color:$blocker-bg;
    }
    > div.modal-inner-widnow{
        margin:10em auto;
        max-width:100%;
        width:40em;
        padding:8px;
        background-color: $modal-bg;
        position:relative;
    }
}

</style>