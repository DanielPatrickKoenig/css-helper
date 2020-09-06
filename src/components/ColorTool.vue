<template>
    <div>
        <!-- <ColorPicker :granularity="swatchCount" :offset="sliderData.o.value-512" /> -->
        <Swatches :colors="colorPresets" :size="pickerSize" v-on:color-selected="onColorSelected">
            <circle :r="pickerSize*.4" :cx="pickerSize/2" :cy="pickerSize/2" :fill="'rgba('+sliderData.r.value.toString()+','+sliderData.g.value.toString()+','+sliderData.b.value.toString()+','+sliderData.a.value.toString()+')'" />
        </Swatches>
        <ul>
            <li v-for="(v, k, i) in sliderData" :key="'slider-container-'+i.toString()">
                <label>{{k}}</label>
                <SliderComponent :width="width" :max="v.max" :ratiox="sliderData[k].value" constraint="horizontal" v-on:slider-moved="onSliderMoved" :sig="k" :noinit="k == 'a'">
                    <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
                </SliderComponent>
                <input :class="v.name+'-value-input'" type="number" v-model="sliderData[k].value" />
            </li>
        </ul>
    </div>
</template>
<script>
import BaseDataRep from './base/BaseDataRep.js';
import SliderComponent from './SliderComponent.vue';
import Swatches from './Swatches.vue';
import Utilities from '../utils/Utilities';
import {mapState} from 'vuex';
// import ColorPicker from './ColorPicker.vue';
export default {
    props: ['start'],
    extends: BaseDataRep,
    components: {
        Swatches,
        SliderComponent
    },
    data () {
       return {
           selectorGranularity: 2,
           colorOffset: -144,
           width: 160,
           swatchCount: 64,
           sliderData: {
               r: {value: this.start ? Utilities.colorStringToRGB(this.start).r : 0, max: 255, name: 'red'},
               g: {value: this.start ? Utilities.colorStringToRGB(this.start).g : 0, max: 255, name: 'green'},
               b: {value: this.start ? Utilities.colorStringToRGB(this.start).b : 0, max: 255, name: 'blue'},
               a: {value: 1, max: 1, name: 'alpha'}
           },
           pickerSize: 280
       }
    },
    computed: {
        ...mapState(['colorPresets'])
    },
    methods: {
        emitValue: function () {
            this.$emit('value-change', {value: `rgba(${this.$data.sliderData.r.value},${this.$data.sliderData.g.value},${this.$data.sliderData.b.value},${this.$data.sliderData.a.value})`, name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        },
        onSliderMoved: function (e) {
            this.$data.sliderData[e.sig].value = e.x;
            this.emitValue();
        },
        onColorSelected: function (e) {
            console.log(e);
            this.$data.sliderData.r.value = e.r;
            this.$data.sliderData.g.value = e.g;
            this.$data.sliderData.b.value = e.b;
            this.emitValue();
        }
    }
}
</script>