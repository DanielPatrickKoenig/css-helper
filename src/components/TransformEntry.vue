<template>
  <div>
      <select app-controll v-if="!method" v-model="selectedFunction" v-on:change="createValueMatrix(transformFunctions[selectedFunction])">
          <option value="none">
              Select a function
          </option>
          <option v-for="(t, k, i) in transformFunctions" :key="'function-'+i.toString()" :value="k">
              {{k}}
          </option>
      </select>
      <ul v-if="selectedFunction != 'none'">
          <li v-for="(v, i) in transformFunctions[selectedFunction]" :key="'option-'+i.toString()" style="display:block;">
              <div v-for="(q, j) in valueMatrix[i]" :key="'repeat-'+j.toString()+'-'+i.toString()">
                  
                  <input app-controll v-if="v.type == types.NUMBER" type="number" v-model="valueMatrix[i][j].n" v-on:change="dispatchValue()" v-on:keyup="dispatchValue()" style="width:110px;" />
                  <AngleControl v-else width="100" :max="360" :angle="valueMatrix[i][j].n" class="angle-control" v-on:slider-moved="onAngleChange" :sig="i.toString()+'.'+j.toString()">
                    <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
                  </AngleControl>
                  <select app-controll v-if="v.suffix.length > 1" v-model="valueMatrix[i][j].s" v-on:change="dispatchValue()">   
                      <option v-for="(s, n) in v.suffix" :key="'suffix-'+n.toString()+'-'+j.toString()+'-'+i.toString()" :value="s">
                          {{s}}
                      </option>
                  </select>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import AngleControl from './AngleControl.vue';
export default {
    props: ['method', 'start'],
    components: {
        AngleControl
    },
    data(){
        return {
            transformFunctions: Utilities.TransformFunctions,
            selectedFunction: this.method ? this.method : 'none',
            types: Utilities.DataReps,
            valueMatrix: [],
            ready: false
        }
    },
    methods: {
        getQuantityList: function (q) {
            let output = [];
            for(let i = 0; i < q; i++){
                output.push(i);
            }
            return output;
        },
        createValueMatrix: function (f) {
            if(f){
                this.$data.valueMatrix = [];
                for(let i = 0; i < f.length; i++){
                    this.$data.valueMatrix.push([]);
                    for(let j = 0; j < f[i].repeats; j++){
                        let suffix = f[i].suffix[0] ? f[i].suffix[0] : '';
                        this.$data.valueMatrix[i].push({n: 0, s:suffix});
                    }
                }
            }
        },
        onAngleChange: function (e) {
            // console.log(e);
            this.$data.valueMatrix[Number(e.sig.split('.')[0])][Number(e.sig.split('.')[1])].n = e.angle;
            this.dispatchValue();
        },
        dispatchValue: function () {
            if(this.$data.selectedFunction != 'none'){
                let valList = [];
                for(let i = 0; i < this.$data.valueMatrix.length; i++){
                    for(let j = 0; j < this.$data.valueMatrix[i].length; j++){
                        valList.push(`${this.$data.valueMatrix[i][j].n.toString()}${this.$data.valueMatrix[i][j].s}`);
                    }
                }
                this.$emit('value-change', {method: this.$data.selectedFunction, value:`${this.$data.selectedFunction}(${valList.join(',')})`});
            }
        },
        asignValue: function () {
            if(this.start && this.start != '' && this.method){
                const valueChunkList = this.start.split(' ');
                let targetValues = [];
                // let targetValueIndex = -1;
                for(let i = 0; i < valueChunkList.length;i++){
                    if(valueChunkList[i].split(`${this.method}(`).length > 1){
                        targetValues = valueChunkList[i].split('(')[1].split(')')[0].split(',');
                        // targetValueIndex = i;
                    }
                }
                // console.log(targetValues);
                // console.log(valueChunkList);
                // console.log(targetValueIndex);
                // console.log(this.$data.valueMatrix);
                
                for(let i = 0; i < targetValues.length; i++){
                    let itterator = 0;
                    for(let j = 0; j < this.$data.valueMatrix.length; j++){
                        for(let k = 0; k < this.$data.valueMatrix[j].length; k++){
                            const negativeChar = targetValues[itterator].toString().split('-').length > 1 ? '-' : '';
                            const decimalIndex = targetValues[itterator].toString().indexOf('.');
                            const decimalChar = decimalIndex >= 0 ? '.' : '';
                            this.$data.valueMatrix[j][k] = {s: targetValues[itterator].toString().replace(/[0-9]/g, ''), n: `${negativeChar}${targetValues[itterator].toString().replace(/\D/g,'')}`};
                            itterator++;
                            let numList = this.$data.valueMatrix[j][k].n.toString().split('');
                            numList[decimalIndex] = `${decimalChar}${numList[decimalIndex]}`;
                            this.$data.valueMatrix[j][k].n = numList.join('');
                            this.$data.valueMatrix[j][k].s = this.$data.valueMatrix[j][k].s.split('.').join('').split('-').join('');
                        }
                    }
                }
            }
            // console.log(this.$data.valueMatrix);
            this.$forceUpdate();
        }
    },
    mounted: function () {
        // console.log(this.start);
        if(this.method){
            this.createValueMatrix(this.transformFunctions[this.method]);
        }
        this.asignValue();
        this.dispatchValue();
    }
}
</script>

<style>

</style>