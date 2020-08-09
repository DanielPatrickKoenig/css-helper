<template>
    <div class="color-selector-component">
        <div :style="'background-color:' + items[0].str + ';'" v-on:click="colorSelected(items[0].param)"></div>
        <ul class="color-selector-color-grid" v-if="ready">
            <li v-for="(item, i) in itemMatrix.abc" :key="'item1-'+i.toString()" :style="cssProps" v-on:click="colorSelected(item.params)">
                <div :style="'background-color:' + item.str + ';'"></div>
                <span>{{item.str}}</span>
            </li>
            <li v-for="(item, i) in itemMatrix.cab" :key="'item2-'+i.toString()" :style="cssProps" v-on:click="colorSelected(item.params)">
                <div :style="'background-color:' + item.str + ';'"></div>
                <span>{{item.str}}</span>
            </li>
            <li v-for="(item, i) in itemMatrix.bca" :key="'item3-'+i.toString()" :style="cssProps" v-on:click="colorSelected(item.params)">
                <div :style="'background-color:' + item.str + ';'"></div>
                <span>{{item.str}}</span>
            </li>
        </ul>
        <div :style="'background-color:' + items[items.length - 1].str + ';'" v-on:click="colorSelected(items[items.length - 1].params)"></div>
    </div>
</template>
<script>
export default {
    props: ['incrament'],
    data () {
        return {
            items: [{str: 'rgb(0,0,0)', params: {r: 0, g: 0, b: 0}}],
            itemMatrix: {
                abc: [{str: 'rgb(0,0,0)', params: {r: 0, g: 0, b: 0}}],
                cab: [{str: 'rgb(0,0,0)', params: {r: 0, g: 0, b: 0}}],
                bca: [{str: 'rgb(0,0,0)', params: {r: 0, g: 0, b: 0}}]
            },
            ready: false
        }
    },
    methods: {
        createGrid: function(){
            for(let i = this.incrament; i < 1000; i+=this.incrament){
                let threeNums = (i/1000).toString().split('.')[1].split('');
                let a = (Number(threeNums[0]) / 8) * 255;
                let b = threeNums.length >= 2 ? (Number(threeNums[1]) / (10 - this.incrament)) * 255 : 0;
                let c = threeNums.length >= 3 ? (Number(threeNums[2]) / (10 - this.incrament)) * 255 : 0;
                this.$data.items.push({str: 'rgb(' + a.toString() + ',' + b.toString() + ',' + c.toString() + ')', params: {r: a, g: b, b: c}});
                this.$data.itemMatrix.abc.push({str: 'rgb(' + a.toString() + ',' + b.toString() + ',' + c.toString() + ')', params: {r: a, g: b, b: c}});
                this.$data.itemMatrix.cab.push({str: 'rgb(' + c.toString() + ',' + a.toString() + ',' + b.toString() + ')', params: {r: a, g: b, b: c}});
                this.$data.itemMatrix.bca.push({str: 'rgb(' + b.toString() + ',' + c.toString() + ',' + a.toString() + ')', params: {r: a, g: b, b: c}});
            }
        },
        colorSelected: function (params){
            this.$emit('color-selected', params);
        } 
    },
    computed: {
        cssProps: function () {
            return {
                '--wide': `${this.incrament.toString()}%`
            }
        }
    },
    created: function () {
        this.createGrid();
        this.$data.ready = true;
    }
}
</script>
<style lang="scss" scoped>
div.color-selector-component{
    box-shadow:0 0 0 1px rgba(0,0,0,.5);
    div{
        width:100%;
        height:1em;
    }
    ul.color-selector-color-grid{
        display:flex;
        padding:0;
        margin:0;
        align-items: center;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        > li{
            display:inline-flex;
            flex-direction: row;
            width:var(--wide);
            height:.5em;
            padding:0;
            margin:0;
            > span{
                display: none;
            }
            > div{
                width:100%;
                height: 100%;;
            }
        }
    }
}
</style>