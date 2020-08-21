import Utilities from "../../utils/Utilities";
import {mapState} from 'vuex';
export default {
    props: ['data', 'name', 'index', 'composited', 'initval'],
    data () {
        return {
            value: this.getDefaultValue()
        }
    },
    methods: {
        onValueChange: function(e){
            this.$emit('value-change', {value: this.processValue(this.deriveValue(e)), name: this.name, index: this.index, type: this.data, composited: this.composited});
        },
        deriveValue: function(e){
            return e.target.value;
        },
        getDefaultValue: function () {
            return 0;
        },
        processValue: function (val) {
            return val;
        },
        parseValue: function (val){
            // console.log(this.data);
            let pre = this.data.prefix ? this.data.prefix : '';
            let suf = this.data.suffix ? this.data.suffix : '';
            // console.log(val.split(pre).join('').split(suf).join(''));
            return val.split(pre).join('').split(suf).join('');
        }
    },
    computed: {
        ...mapState(['propertyManifest', 'selectorIndex', 'selectorList', 'selectorPropertyMatrix'])
    },
    mounted: function () {
        console.log(this.selectorPropertyMatrix);
        console.log(this.selectorIndex);
        console.log(this.initval);
        if(this.initval){
            this.$data.value = this.parseValue(this.initval);
        }
        else if(Utilities.propertyisLogged(this, this.name, this.csomposited)){
            this.$data.value = this.parseValue(this.propertyManifest[this.name].value_separator ? this.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name].split(this.propertyManifest[this.name].value_separator)[this.index] : this.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]);
        }
    }
}