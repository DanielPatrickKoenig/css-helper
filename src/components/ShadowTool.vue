<template>
  <div>
      <ul>
          <li v-for="(v, k, i) in measures" :key="'meadsure-'+i.toString()">
              <label>
                  <span>{{k}}</span>
                  <input type="number" v-model="measures[k].value" v-on:change="emitValue()" />
              </label>
              <select v-model="measures[k].unit" v-on:change="emitValue()">
                  <option v-for="(u, _k, j) in unitManifest" :key="'init-'+j.toString()+'-'+i.toString()" :value="unitManifest[_k]">
                      {{_k}}
                  </option>
              </select>
              <input v-if="measures[k].enabled != undefined" type="checkbox" v-model="measures[k].enabled" v-on:change="emitValue()"/>
          </li>
      </ul>
      <ColorTool :start="color" :index="index" v-on:value-change="colorUpdate" />
      <input type="checkbox" v-model="invert" v-on:change="emitValue()"/>
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

<style>

</style>