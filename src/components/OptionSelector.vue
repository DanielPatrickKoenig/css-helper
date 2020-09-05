<template>
    <ul :style="'width:'+width+';'">
        <li v-for="(option, i) in options" :key="'option-'+i.toString()">
            <slot :name="'option-'+i.toString()">
                {{option}}
            </slot>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['options', 'width']
}
</script>

<style lang="scss" scoped>
ul{
    display:flex;
    flex-direction: row;
    justify-content: center;
    justify-self: center;
    padding:0;
    margin:0 auto;
    > li{
        display:flex;
        flex-grow: 1;
        padding: 3px 4px;
        background-image: linear-gradient(#eeeeee, #cccccc);
        justify-content: center;
        text-align:center;
        margin:0;
        box-shadow:0 0 0 1px rgba(0,0,0,.3);
        width:50%;
    }
    > li:first-child{
        border-radius: 6px 0 0 6px;
    }
    > li:last-child{
        border-radius: 0 6px 6px 0;
    }
}
</style>