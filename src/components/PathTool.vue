<template>
    <div>
        <div class="path-tool" :style="cssStyle">
            <svg>
                <path :d="pathString" stroke="rgba(0,0,0,.5)" stroke-width="1" fill="transparent" />
            </svg>
            <SliderComponent v-for="(p, i) in points" :key="'point-'+i.toString()" :width="size.width" :height="size.height" :max="max" :ratiox="points[i].x" :ratioy="points[i].y" v-on:slider-moved="onPointMoved" :sig="i" :disabled="deleting">
                <button v-if="deleting" v-on:click="deletePoint(i)" style="position:absolute;z-index:100;transform: translate(-50%, -50%);width: 20px;height: 20px;padding:0;"><font-awesome-icon icon="times"/></button>
                <div v-else style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </SliderComponent>
            <div 
                v-for="(a, i) in inserters" 
                :key="'inserter-'+i.toString()" 
                :class="'inserter insertion-item-'+(i+1).toString()" 
                :style="(adding ? '' : 'display:none;')+'left:'+(inserters[i].x*100).toString()+'%;top:'+(inserters[i].y*100).toString()+'%;'" 
                v-on:click="addPoint(inserters[i].x, inserters[i].y, i)" 
            />
            
        </div>
        <button app-controll v-if="!deleting" v-on:click="adding = !adding;">{{adding ? 'Cancel Add' : 'Add Point'}}</button>
        <button app-controll v-if="!adding && points.length > 3" v-on:click="deleting = !deleting;">{{deleting ? 'Cancel Delete' : 'Delete Point'}}</button>
    </div>
</template>

<script>
import BaseShapeSubTool from './base/BaseShapeSubTool.js';
export default {
    extends: BaseShapeSubTool,
    data () {
        return {
            points: [],
            deleting: false,
            adding: false
        }
    },
    methods: {
        deletePoint: function (index){
            setTimeout(() => {
                this.$data.points.splice(index, 1);
                this.$data.deleting = false;
            }, 100);
        },
        enableDeleting: function () {
            this.$data.deleting = true;
            this.cancelInsertMenu();
        },
        addPoint: function (x, y, index) {
            if(index){
                this.$data.points.splice(index, 0, {x: x, y: y});
            }
            else{
                this.$data.points.push({x: x, y: y});
            }
            this.emitValue();
            this.$data.adding = false;
        },
        onPointMoved: function (e) {
            console.log(e);
            this.$data.points[e.sig].x = e.x;
            this.$data.points[e.sig].y = e.y;
            this.$forceUpdate();
            this.emitValue();
        },
        getOutput: function () {
            let valueList = [];
            for(let i = 0; i < this.$data.points.length;i++){
                valueList.push(`${this.$data.points[i].x*100}% ${this.$data.points[i].y*100}%`);
            }
            return `polygon(${valueList.join(',')})`;
        }
    },
    computed: {
        inserters: function () {
            let insertionList = [];
            for(let i = 0; i < this.$data.points.length; i++){
                const prevPoint = i == 0 ? this.$data.points[this.$data.points.length-1] : this.$data.points[i-1];
                insertionList.push({x: prevPoint.x + ((this.$data.points[i].x - prevPoint.x) / 2), y: prevPoint.y + ((this.$data.points[i].y - prevPoint.y) / 2)});
            }
            return insertionList;
        },
        pathString: function () {
            let pString = '';
            for(let i = 0; i < this.$data.points.length;i++){
                let prefix = i == 0 ? 'M ' : ' L ';
                pString+=prefix + (this.$data.size.width*this.$data.points[i].x).toString() + ' ' + (this.$data.size.height*this.$data.points[i].y).toString();
            }
            pString+=' Z';
            return pString;
        },
        cssStyle: function () {
            return {
                '--width':`${this.$data.size.width}px`,
                '--height':`${this.$data.size.height}px`
            };
        }
    },
    mounted: function () {
        this.addPoint(0,0);
        this.addPoint(1,0);
        this.addPoint(.5,1);
    }
}
</script>

<style lang="scss" scoped>
div.path-tool{
    box-shadow: 0 0 0 1px rgba(0,0,0,.5);
    position: relative;
    width:var(--width);
    height:var(--height);
    margin: 0 auto 32px auto;
    > svg{
        width:100%;
        height:100%;
        position:absolute;
    }
    div.inserter{
        width: 12px;
        height: 12px;
        margin-left:-6px;
        margin-top:-6px;
        display:inline-block;
        border-radius: 20px;
        background-color:#cc0000;
        position:absolute;
    }
}
</style>