<template>
    <div>
        <input v-model="value" type="text" v-on:change="onValueChange" />
    </div>
</template>
<script>
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    methods: {
        processValue: function (val) {
            let prefix = this.data.prefix ? this.data.prefix : '';
            let suffix = this.data.suffix ? this.data.suffix : '';
            return  prefix + val.toString() + suffix;
        }
    }
}
</script>