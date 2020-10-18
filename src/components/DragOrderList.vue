<template>
    <div :id="uniqueID">
        <ul class="drag-order-items-container">
            <li v-for="(v, i) in indexList" :key="'index-'+i.toString()" :class="draggedIndex == i ? 'dragged-item' : ''" :style="itemStyle(i)">
                <button app-controll v-on:mousedown="down" :index="i">
                    <font-awesome-icon icon="sort" />
                </button>
                <div>
                    <slot :name="'item-'+v.toString()">
                        Item {{v}}
                    </slot>
                </div>
            </li>
        </ul>
        <div v-if="dragging" v-on:mouseup="up" v-on:mousemove="move" class="drag-blocker"></div>
    </div>
</template>
<script>
import Utilities from '../utils/Utilities';
export default {
    props: ['count'],
    data () {
        return {
            uniqueID: Utilities.createUniqueID(),
            dragging: false,
            offset: {x: 0, y: 0},
            position: {x: 0, y: 0},
            draggedIndex: -1
        }
    },
    methods: {
        down: function (e) {
            this.$data.draggedIndex = Number(e.currentTarget.getAttribute('index'));
            this.$data.dragging = true;
            let event = this.processEvent(e);
            this.$data.offset = {x: event.x, y: event.y};
        },
        up: function () {
            // let itemIndex = 0;
            let aboveCount = 0;
            for(let i = 0; i < this.count; i++){
                if(i != this.$data.dragging) {
                    if(document.querySelector('ul.drag-order-items-container > li:nth-child('+(this.$data.draggedIndex+1).toString()+')').getBoundingClientRect().top > document.querySelector('ul.drag-order-items-container > li:nth-child('+(i+1).toString()+')').getBoundingClientRect().top){
                        aboveCount++;
                    }
                }
            }
            // // console.log(this.$data.draggedIndex.toString() + ' / ' + aboveCount.toString());
            this.$emit('order-changed', {moved: this.$data.draggedIndex, target: aboveCount});
            this.$data.dragging = false;
            this.$data.draggedIndex = -1;
            this.$forceUpdate();
        },
        move: function (e) {
            if(this.$data.dragging){
                let event = this.processEvent(e);
                this.$data.position = {x: event.x, y: event.y - document.querySelector('#'+this.$data.uniqueID).getBoundingClientRect().top};
            }
        },
        processEvent: function (e) {
            return {x: e.pageX, y: e.pageY};
        },
        itemStyle: function (index) {
            let outputStyle = '';
            // // console.log('ul.drag-order-items-container > li:nth-child('+(index+1).toString()+')');
            let thisIndex = index + 1;
            if(index == this.$data.draggedIndex){
                outputStyle = 'top:'+this.$data.position.y+'px;';
            }
            else if(document.querySelector('ul.drag-order-items-container > li:nth-child('+thisIndex.toString()+')') && this.$data.draggedIndex >= 0){
                let isAboveIndex = this.$data.position.y + document.querySelector('#'+this.$data.uniqueID).getBoundingClientRect().top < document.querySelector('ul.drag-order-items-container > li:nth-child('+thisIndex.toString()+')').getBoundingClientRect().top;
                let isFirst = index == 0 || (index == 1 && this.$data.draggedIndex == 0);
                let isBelowLast = false;
                // // console.log('ul.drag-order-items-container > li:nth-child('+(thisIndex - 1).toString()+')');
                let reducer = this.$data.draggedIndex == index - 1 ? 2 : 1;
                if(document.querySelector('ul.drag-order-items-container > li:nth-child('+(thisIndex - reducer).toString()+')')){
                    // // console.log(document.querySelector('ul.drag-order-items-container > li:nth-child('+(thisIndex - 1).toString()+')').getBoundingClientRect().top);
                    isBelowLast = this.$data.position.y + document.querySelector('#'+this.$data.uniqueID).getBoundingClientRect().top > document.querySelector('ul.drag-order-items-container > li:nth-child('+(thisIndex - reducer).toString()+')').getBoundingClientRect().top;
                }
                if(isAboveIndex && (isFirst || isBelowLast)){
                    // // console.log(index);
                    outputStyle = 'padding-top:' + document.querySelector('ul.drag-order-items-container > li:nth-child('+(this.$data.draggedIndex+1).toString()+')').getBoundingClientRect().height.toString() + 'px;';
                }
                // 
            }
            return outputStyle;
        }
    },
    computed: {
        indexList: function () {
            let indexes = [];
            for(let i = 0; i < this.count; i++){
                indexes.push(i);
            }
            return indexes;
        }
    }
}
</script>
<style lang="scss" scoped>
div.drag-blocker{
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgba(0,0,0,.2);
    z-index:1000;
}
ul.drag-order-items-container{
    margin:0;
    padding:0;
    position:relative;
    > li{
        width: 100%;
        display:flex;
        flex-direction: row;
        > button{
            display:inline-flex;
            flex-grow:1;
            
        }
        > div{
            display:inline-flex;
            flex-grow:4;
            width: 80%;
        }
    }
    > li.dragged-item{
        position:absolute;
    }
}
</style>