<template>
  <div>
      <ul>
          <li v-for="(v, k, i) in measures" :key="'meadsure-'+i.toString()" style="display:block;position:relative;">
              <span v-if="measures[k].enabled != undefined" style="display:block;">Include spred</span><input v-if="measures[k].enabled != undefined" type="checkbox" v-model="measures[k].enabled" v-on:change="emitValue()" class="enabler-box"/>
              <label class="value-and-label">
                  <span>{{k}}</span>
                  <input type="number" v-model="measures[k].value" v-on:change="emitValue()" />
              </label>
              <select v-model="measures[k].unit" v-on:change="emitValue()">
                  <option v-for="(u, _k, j) in unitManifest" :key="'init-'+j.toString()+'-'+i.toString()" :value="unitManifest[_k]">
                      {{_k}}
                  </option>
              </select>
          </li>
      </ul>
      <div class="colapsable-section">
        <input :id="uniqueID + '-color'" type="checkbox" style="display:none;" />
        <label :for="uniqueID + '-color'"><span :style="'background-color:'+color+';box-shadow:0 0 0 1px rgba(0,0,0,.4);display:inline-block;padding:8px;'"></span> Color</label>
        <ColorTool :start="color" :index="index" v-on:value-change="colorUpdate" />
      </div>
      <span>Invert</span><input type="checkbox" v-model="invert" v-on:change="emitValue()" style="float:right;"/>
  </div>
</template>

<script>
import Utilities from '../utils/Utilities';
import ColorTool from './ColorTool.vue';
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    components: {
        ColorTool
    },
    data () {
        return {
            unitManifest: {
                PX: Utilities.PropertyValueTypes.PX,
                PT: Utilities.PropertyValueTypes.PT,
                EM: Utilities.PropertyValueTypes.EM,
                REM: Utilities.PropertyValueTypes.REM,
                IN: Utilities.PropertyValueTypes.IN,
                CM: Utilities.PropertyValueTypes.CM,
                PERCENT: Utilities.PropertyValueTypes.PERCENT
            },
            invert: false,
            measures: {
                x: {value: 0, unit: Utilities.PropertyValueTypes.PX},
                y: {value: 0, unit: Utilities.PropertyValueTypes.PX},
                blur: {value: 0, unit: Utilities.PropertyValueTypes.PX},
                spread: {value: 0, unit: Utilities.PropertyValueTypes.PX, enabled: false}
            },
            color: '#000000'
        }
    },
    methods: {
        colorUpdate: function (e) {
            this.$data.color = e.value;
            this.emitValue();
        },
        emitValue: function () {
            this.$emit('value-change', {value: this.getStyleString(), name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        },
        getStyleString: function () {
            let spreadValue = this.$data.measures.spread.enabled ? ` ${this.$data.measures.spread.value}${this.$data.measures.spread.unit.suffix}` : '';
            return `${this.$data.measures.x.value}${this.$data.measures.x.unit.suffix} ${this.$data.measures.y.value}${this.$data.measures.y.unit.suffix} ${this.$data.measures.blur.value}${this.$data.measures.blur.unit.suffix} ${spreadValue} ${this.$data.color}${this.$data.invert ? ' inset' : ''}`;
        }
    }
}
</script>

<style lang="scss" scoped>
label.value-and-label{
    display:inline-flex;
    flex-direction:row;
    width:160px;
    > *:first-child{
        display:inline-flex;
        width:40%;

    }
    > *:last-child{
        display:inline-flex;
        width:60%;

    }
}
label.value-and-label + select{
    float:right;
}
input.enabler-box{
    position: absolute;
    right:0;
    top:8px;
}
input.enabler-box:not(:checked) + label,
input.enabler-box:not(:checked) + label + select{
    display:none !important;
}
</style>