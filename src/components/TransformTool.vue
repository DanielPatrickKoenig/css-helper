<template>
  <ul v-if="ready">
    <li v-for="(t, k, i) in methods" :key="'method-'+i.toString()">
      <label><input type="checkbox" v-model="methods[k].enabled" v-on:change="$forceUpdate()"> {{methods[k].name}}</label>
      <input v-if="methods[k].enabled" class="expanded-toggle" :id="uniqueCheckboxId+'-'+k" type="checkbox"/>
      <label v-if="methods[k].enabled" :for="uniqueCheckboxId+'-'+k">
        <span class="open-row">
          <font-awesome-icon icon="chevron-up" />
        </span>
        <span class="closed-row">
          <font-awesome-icon icon="chevron-down" />
        </span>
      </label>
      <TransformEntry v-if="methods[k].enabled" class="transform-entry" :start="valueString" :method="t.name" v-on:value-change="onTransformed" />
    </li>
  </ul>
</template>

<script>
import BaseDataRep from './base/BaseDataRep.js';
import TransformEntry from './TransformEntry.vue';
import Utilities from '../utils/Utilities.js';
export default {
  extends: BaseDataRep,
  components: {
      TransformEntry
  },
  data () {
    return {
      methods: {},
      ready: false,
      uniqueCheckboxId: Utilities.createUniqueID(),
      valueString: this.initval
    }
  },
  methods: {
    onTransformed: function (e) {
      this.$data.methods[e.method].valueString = e.value;
      this.assembleProperty();
    },
    assembleProperty: function () {
      let valueList = [];
      for(let m in this.$data.methods){
        if(this.$data.methods[m].enabled){
          valueList.push(this.$data.methods[m].valueString);
        }
      }
      this.$data.valueString = valueList.join(' ');
      this.$emit('value-change', {value: this.$data.valueString, name: this.name, index: this.index, type: this.data, composited: this.composited});
    }
  },
  created: function () {
    console.log(this.initval);
    for(let t in Utilities.TransformFunctions){
      this.$data.methods[t] = {name: t, enabled: false, valueString: ''}
    }
    this.$data.ready = true;
  }
}
</script>

<style lang="scss" scoped>
input.expanded-toggle{
  display:none;
}
input.expanded-toggle + label{
  > span.open-row{
    display:none;
  }
  > span.closed-row{
    display:inline-block;
  }
}
input.expanded-toggle:checked + label{
  > span.open-row{
    display:inline-block;
  }
  > span.closed-row{
    display:none;
  }
}
input.expanded-toggle + label + .transform-entry{
  display:none;
}
input.expanded-toggle:checked + label + .transform-entry{
  display:block;
}
</style>