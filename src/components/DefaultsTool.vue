<template>
    <div>
        <select app-controll v-model="selectedOption" v-on:change="emitValue()">
            <option value="inherit">
                inherit
            </option>
            <option value="initial">
                initial
            </option>
            <option v-for="(v, i) in options" :key="'font-'+i.toString()" :value="v">
                {{v}}
            </option>
        </select>
    </div>
</template>

<script>
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    data () {
        return {
            selectedOption: 'inherit',
            options: []
        }
    },
    methods: {
        emitValue: function () {
            this.$emit('value-change', {value: this.$data.selectedOption, name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        }
    },
    created: function () {
        this.$data.options = this.propertyManifest[this.name].booleans ? this.propertyManifest[this.name].booleans : [];
    }
}
</script>

<style>

</style>