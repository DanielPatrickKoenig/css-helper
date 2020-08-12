<template>
  <div>
      <select v-model="selectedFunction" v-on:change="createValueMatrix(transformFunctions[selectedFunction])">
          <option value="none">
              Select a function
          </option>
          <option v-for="(t, k, i) in transformFunctions" :key="'function-'+i.toString()" :value="k">
              {{k}}
          </option>
      </select>
      <ul v-if="selectedFunction != 'none'">
          <li v-for="(v, i) in transformFunctions[selectedFunction]" :key="'option-'+i.toString()">
              <div v-for="(q, j) in valueMatrix[i]" :key="'repeat-'+j.toString()+'-'+i.toString()">
                  <select v-if="v.suffix.length > 1" v-model="valueMatrix[i][j].s">   
                      <option v-for="(s, n) in v.suffix" :key="'suffix-'+n.toString()+'-'+j.toString()+'-'+i.toString()" :value="s">
                          {{s}}
                      </option>
                  </select>
                  <input v-if="v.type == types.NUMBER" type="number" v-model="valueMatrix[i][j].n" />
                  <AngleControl v-else width="100" :max="360" :angle="valueMatrix[i][j].n" class="angle-control" v-on:slider-moved="onAngleChange" :sig="i.toString()+'.'+j.toString()">
                    <div style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;background-color:#000000;border-radius:20px;"></div>
                  </AngleControl>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import Utilities from '../utils/Utilities.js';
import AngleControl from './AngleControl.vue';
export default {
    components: {
        AngleControl
    },
    data(){
        return {
            transformFunctions: Utilities.TransformFunctions,
            selectedFunction: 'none',
            types: Utilities.DataReps,
            valueMatrix: []
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
            console.log(e);
            this.$data.valueMatrix[Number(e.sig.split('.')[0])][Number(e.sig.split('.')[1])].n = e.angle;
        }
    }
}
</script>

<style>

</style>