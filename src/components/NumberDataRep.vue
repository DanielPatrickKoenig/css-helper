<template>
    <div>
        <input type="number" v-on:change="onValueChange" />
    </div>
</template>
<script>
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep
}
</script>