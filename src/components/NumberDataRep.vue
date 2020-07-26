<template>
    <div>
        <input v-model="value" type="number" v-on:change="onValueChange" />
    </div>
</template>
<script>
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    methods: {
        processValue: function (val) {
            return this.data.suffix ? val.toString() + this.data.suffix : val.toString();
        }
    }
}
</script>