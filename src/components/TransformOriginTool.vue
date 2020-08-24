<template>
    <ul>
        <li>
            <span>X</span>
            <select v-model="xOption" v-on:change="emitValue()">
                <option v-for="(x, k, i) in xOptionList" :key="'x-option-'+i.toString()" :value="xOptionList[k]">
                    {{k}}
                </option>
            </select>
            <input v-if="xOption.split('#').length > 1" type="number" v-model="xNumber" v-on:change="emitValue()" />
        </li>
        <li>
            <span>Y</span>
            <select v-model="yOption" v-on:change="emitValue()">
                <option v-for="(y, k, i) in yOptionList" :key="'y-option-'+i.toString()" :value="yOptionList[k]">
                    {{k}}
                </option>
            </select>
            <input v-if="yOption.split('#').length > 1" type="number" v-model="yNumber" v-on:change="emitValue()" />
        </li> 
        <li>
            <label><span>Z</span> <input type="number" v-model="z" v-on:change="emitValue()" /></label>
        </li> 
    </ul>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import BaseDataRep from './base/BaseDataRep.js';
export default {
    extends: BaseDataRep,
    data () {
        return {
            xOptionList: {
                LEFT: 'left',
                CENTER: 'center',
                RIGHT: 'right',
                PX: `#${Utilities.PropertyValueTypes.PX.suffix}`,
                PT: `#${Utilities.PropertyValueTypes.PT.suffix}`,
                EM: `#${Utilities.PropertyValueTypes.EM.suffix}`,
                REM: `#${Utilities.PropertyValueTypes.REM.suffix}`,
                IN: `#${Utilities.PropertyValueTypes.IN.suffix}`,
                CM: `#${Utilities.PropertyValueTypes.CM.suffix}`,
                PERCENT: `#${Utilities.PropertyValueTypes.PERCENT.suffix}`
            },
            yOptionList: {
                TOP: 'left',
                CENTER: 'center',
                BOTTOM: 'right',
                PX: `#${Utilities.PropertyValueTypes.PX.suffix}`,
                PT: `#${Utilities.PropertyValueTypes.PT.suffix}`,
                EM: `#${Utilities.PropertyValueTypes.EM.suffix}`,
                REM: `#${Utilities.PropertyValueTypes.REM.suffix}`,
                IN: `#${Utilities.PropertyValueTypes.IN.suffix}`,
                CM: `#${Utilities.PropertyValueTypes.CM.suffix}`,
                PERCENT: `#${Utilities.PropertyValueTypes.PERCENT.suffix}`
            },
            xNumber: 50,
            yNumber: 50,
            xOption: '#%',
            yOption: '#%',
            z: 0
        }
    },
    methods: {
        emitValue: function () {
            this.$emit('value-change', {value: this.getStyleString(), name: this.name, index: this.index, type: this.data, composited: this.composited, sindex: this.sindex});
        },
        getStyleString: function () {
            let xVal = this.$data.xOption.split('#').length > 1 ? this.$data.xNumber.toString() : '';
            let yVal = this.$data.yOption.split('#').length > 1 ? this.$data.yNumber.toString() : '';
            return `${xVal}${this.$data.xOption.split('#').join('')} ${yVal}${this.$data.yOption.split('#').join('')} ${this.$data.z.toString()}`;
        }
    }
}
</script>

<style>

</style>