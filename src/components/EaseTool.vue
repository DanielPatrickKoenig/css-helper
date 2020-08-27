<template>
    <div>
        <select v-model="selectedType" v-on:change="typeSelected">
            <option v-for="(type, k, i) in types" :key="'types-'+i.toString()" :value="types[k]">
                {{type}}
            </option>
        </select>
        <div class="bezier-controls" :style="cssStyle">
            <svg>
                <path fill="transparent" stroke="#000000" stroke-width="1" :d="'M 0 0 C '+(sliderProps.start.x*sliderProps.width).toString()+' '+(sliderProps.start.y*sliderProps.height).toString()+' '+(sliderProps.end.x*sliderProps.width).toString()+' '+(sliderProps.end.y*sliderProps.width).toString()+' '+sliderProps.width.toString()+' '+sliderProps.height.toString()"></path>
                <line x1="0" y1="0" :x2="sliderProps.start.x*sliderProps.width" :y2="sliderProps.start.y*sliderProps.height" stroke="rgba(0,0,0,.5)" stroke-width="1" stroke-dasharray="1 3"/>
                <line :x1="sliderProps.width" :y1="sliderProps.height" :x2="sliderProps.end.x*sliderProps.width" :y2="sliderProps.end.y*sliderProps.height" stroke="rgba(0,0,0,.5)" stroke-width="1" stroke-dasharray="1 3" />
            </svg>
            <div class="motion-test" :id="followerID">
                <span :style="cssStyle"></span>
                <span class="curve-folower"></span>
                <span :style="cssStyle"></span>
            </div>
            <SliderComponent :width="sliderProps.width" :height="sliderProps.height" :max="sliderProps.max" :ratiox="sliderProps.start.x" :ratioy="sliderProps.start.y" v-on:slider-moved="onStartMoved" :style="selectedType == types.CUBIC_BEZIIR ? '' : 'display:none;' ">
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </SliderComponent>
            <SliderComponent :width="sliderProps.width" :height="sliderProps.height" :max="sliderProps.max" :ratiox="sliderProps.end.x" :ratioy="sliderProps.end.y" v-on:slider-moved="onEndMoved" :style="selectedType == types.CUBIC_BEZIIR ? '' : 'display:none;' ">
                <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
            </SliderComponent>
        </div>
    </div>
</template>

<script>
import SliderComponent from './SliderComponent.vue';
import BaseDataRep from './base/BaseDataRep.js';
import {TweenLite} from 'gsap';
export default {
    extends: BaseDataRep,
    components: {
        SliderComponent
    },
    data () {
        return {
            types: {
                LINEAR: 'linear',
                EASE: 'ease',
                EASE_IN: 'ease-in',
                EASE_OUT: 'ease-out',
                EASE_IN_OUT: 'ease-in-out',
                CUBIC_BEZIIR: 'cubic-bezier'
            },
            selectedType: 'linear',
            sliderProps: {
                width: 200,
                height: 200,
                max: 1,
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 1,
                    y: 1
                }
            },
            curveFollowerPosition: {left: '0px', top: '0px'},
            followerID: `f-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`
        }
    },
    computed: {
        cssStyle: function () {
            return {
                '--width': `${this.$data.sliderProps.width}px`, 
                '--height': `${this.$data.sliderProps.height}px`,
                '--animation-timing-function-x': 'linear',
                '--animation-timing-function-y': this.getOutput(),
                '--left': this.$data.curveFollowerPosition.left,
                '--top': this.$data.curveFollowerPosition.top
            };
        }
    },
    methods: {
        setStartEndPosition: function () {
            switch(this.$data.selectedType){
                case this.$data.types.LINEAR:
                    {
                        this.$data.sliderProps.start.x = 0;
                        this.$data.sliderProps.start.y = 0;
                        this.$data.sliderProps.end.x = 1;
                        this.$data.sliderProps.end.y = 1;
                        break;
                    }
                case this.$data.types.EASE:
                    {
                        this.$data.sliderProps.start.x = .33;
                        this.$data.sliderProps.start.y = .28;
                        this.$data.sliderProps.end.x = .22;
                        this.$data.sliderProps.end.y = .96;
                        break;
                    }
                case this.$data.types.EASE_IN:
                    {
                        this.$data.sliderProps.start.x = .45;
                        this.$data.sliderProps.start.y = 0;
                        this.$data.sliderProps.end.x = 1;
                        this.$data.sliderProps.end.y = 1;
                        break;
                    }
                case this.$data.types.EASE_OUT:
                    {
                        this.$data.sliderProps.start.x = 0;
                        this.$data.sliderProps.start.y = 0;
                        this.$data.sliderProps.end.x = .61;
                        this.$data.sliderProps.end.y = 1;
                        break;
                    }
                case this.$data.types.EASE_IN_OUT:
                    {
                        this.$data.sliderProps.start.x = .405;
                        this.$data.sliderProps.start.y = 0;
                        this.$data.sliderProps.end.x = .595;
                        this.$data.sliderProps.end.y = 1;
                        break;
                    }
            }
        },
        onStartMoved: function (e) {
            this.$data.sliderProps.start.x = e.x;
            this.$data.sliderProps.start.y = e.y;
            this.emitValue();
        },
        onEndMoved: function (e) {
            this.$data.sliderProps.end.x = e.x;
            this.$data.sliderProps.end.y = e.y;
            this.emitValue();
        },
        getOutput: function () {
            let argString = '';
            if(this.$data.selectedType == this.$data.types.CUBIC_BEZIIR){
                argString = `(${this.$data.sliderProps.start.x},${this.$data.sliderProps.start.y},${this.$data.sliderProps.end.x},${this.$data.sliderProps.end.y})`;
            }
            return `${this.$data.selectedType}${argString}`;
        },
        emitValue: function () {
            this.$emit('value-change', {value: this.getOutput(), name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        },
        runThread: function (self) {
            let threadVehicle = {n: 0};
            TweenLite.to(threadVehicle, 5, {
                n: 1,
                onComplete: self.runThread,
                onCompleteParams: [self],
                onUpdate: function (_self) {
                    _self.$data.curveFollowerPosition = {
                        left: (document.querySelector(`#${_self.$data.followerID} span:first-child`).getBoundingClientRect().left-document.querySelector(`#${_self.$data.followerID}`).getBoundingClientRect().left).toString()+'px',
                        top: (document.querySelector(`#${_self.$data.followerID} span:last-child`).getBoundingClientRect().top-document.querySelector(`#${_self.$data.followerID}`).getBoundingClientRect().top).toString()+'px'
                    }
                    // console.log(_self.$data.curveFollowerPosition);
                },
                onUpdateParams: [self]
            });
        },
        typeSelected: function(){
            this.setStartEndPosition();
            this.emitValue();
        }
    },
    mounted: function () {
        this.runThread(this);
    }
}
</script>

<style lang="scss" scoped>
@keyframes testmove-x {
    from{
        left: 0;
    }
    to{
        left: var(--width);
    }
}
@keyframes testmove-y {
    from{
        top: 0;
    }
    to{
        top: var(--height);
    }
}
div.bezier-controls{
    width: var(--width);
    height: var(--height);
    box-shadow: 0 0 0 1px rgba(0,0,0,.5);
    position: relative;
    > svg{
        position:absolute;
        width:100%;
        height:100%;
    }
    > div.motion-test{
        position:absolute;
        width:100%;
        height:100%;
        > span{
            position: absolute;
            width: 8px;
            height: 8px;
            display: block;
            
            animation-duration: 5s;
            animation-iteration-count: infinite;
            
        }
        > span:first-child{
            animation-name: testmove-x;
            animation-timing-function: var(--animation-timing-function-x);
            
        }
        > span:first-child + span{
            left: var(--left);
            top: var(--top);
            margin-left:-4px;
            margin-top:-4px;
            border-radius: 8px;
            background-color:#cc0000;
        }
        > span:last-child{
            animation-name: testmove-y;
            animation-timing-function: var(--animation-timing-function-y);
        }
    }
}
</style>