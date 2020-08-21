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
            // this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name] = this.processValue(this.deriveValue(e));
            
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
        ...mapState(['propertyManifest', 'selectorIndex', 'selectorList'])
    },
    mounted: function () {
        console.log(this.$root.selectorPropertyMatrix);
        console.log(this.selectorIndex);
        console.log(this.initval);
        if(this.initval){
            this.$data.value = this.parseValue(this.initval);
        }
        else if(Utilities.propertyisLogged(this, this.name, this.csomposited)){
            this.$data.value = this.parseValue(this.propertyManifest[this.name].value_separator ? this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name].split(this.propertyManifest[this.name].value_separator)[this.index] : this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]);
        }
        // let hasValue = false;
        /*
        if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]]){
            if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css){
                if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]){
                    // hasValue = true;
                    // console.log(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]);
                    this.$data.value = this.parseValue(this.propertyManifest[this.name].value_separator ? this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name].split(this.propertyManifest[this.name].value_separator)[this.index] : this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]);
                }
                else{
                    this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name] = {};
                }
            }
            else{
                this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css = {};
            }
            // if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].type){
            //     console.log(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].type[this.name]);
            //     if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].type.join){
            //         this.data = this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].type[this.index];
            //     }
            //     else {
            //         this.data = this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].type;
            //     }
            //     if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css){
            //         if(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]){
            //             console.log(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]);
            //             this.$data.value = this.processValue(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].css[this.name]);
            //         }
            //     }
                
            // }
            // console.log(this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]].type[this.name]);
        }
        else{
            this.$root.selectorPropertyMatrix[this.selectorList[this.selectorIndex]] = {};
        }
        // if(!hasValue){
        //     this.$emit('value-change', {value: this.processValue(this.$data.value), name: this.name, index: this.index, type: this.data});
        // }
        // */
    }
}