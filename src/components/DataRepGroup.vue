<template>
    <div v-if="type">
        <SelectDataRep v-if="type.rep == DataReps.SELECT" :data="type" :name="name" v-on:value-change="onValueChange" :index="index" />
        <NumberDataRep v-else-if="type.rep == DataReps.NUMBER" :data="type" :name="name" v-on:value-change="onValueChange" :index="index" />
        <StringDataRep v-else :data="type.rep" :name="name" v-on:value-change="onValueChange" :index="index" />
    </div>
</template>
<script>

import SelectDataRep from '../components/SelectDataRep.vue';
import NumberDataRep from '../components/NumberDataRep.vue';
import StringDataRep from '../components/StringDataRep.vue';
import Utilities from '../utils/Utilities';
export default {
    props: ['type', 'name', 'index', 'sig'],
    components: {
        SelectDataRep,
        NumberDataRep,
        StringDataRep
    },
    data () {
        return {
            DataReps: Utilities.DataReps
        }
    },
    methods: {
        onValueChange: function (e) {
            this.$emit('value-change', e);
        }
    }
}
</script>