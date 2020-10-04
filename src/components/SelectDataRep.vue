<template>
    <div>
        <select app-controll v-model="value" v-on:change="onValueChange">
            <option v-for="(v, i) in data.options" :key="'option-' + i.toString()">
                {{v}}
            </option>
        </select>
    </div>
</template>
<script>
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    methods: {
        getDefaultValue: function () {
            return this.data.options[0];
        }
    }
}
</script>