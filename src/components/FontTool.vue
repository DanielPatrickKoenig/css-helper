<template>
    <div>
        <select app-controll v-model="selectedFontIndex" v-on:change="emitValue()">
            <option v-for="(font, i) in fonts" :key="'font-'+i.toString()" :value="i">
                {{font}}
            </option>
        </select>
    </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    data () {
        return {
            fonts: Utilities.FontList,
            selectedFontIndex: 0
        }
    },
    methods: {
        emitValue: function () {
            this.$emit('value-change', {value: this.$data.fonts[this.$data.selectedFontIndex], name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        }
    }
}
</script>

<style>

</style>