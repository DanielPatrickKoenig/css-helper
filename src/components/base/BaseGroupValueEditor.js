import Utilities from '../../utils/Utilities';
import PropertyEditor from '../PropertyEditor.vue';
import DataRepGroup from '../DataRepGroup.vue';
import {mapState} from 'vuex';
export default {
    components: {
        PropertyEditor,
        DataRepGroup
    },
    props: ['name'],
    data () {
        return {
            values: [],
            // propertyManifest: this.$root.propertyManifest,
            propertyTypes: [],
            DataReps: Utilities.DataReps
        }
    },
    computed: {
        ...mapState(['propertyManifest', 'selectorIndex', 'selectorList', 'selectorPropertyMatrix'])
    },
    methods: {
        getValueSeparator: function (name) {
            return this.propertyManifest[name].value_separator
        },
        onDataTypeSelected: function (e) {
            this.$emit('data-type-selected', e);
            // console.log(e.pt);
            Utilities.addToTypeLog(this, e.name, e.index, e.pt);
            this.$data.propertyTypes.splice(e.index, 1, Utilities.getValueTypeByID(e.pt));
            this.$forceUpdate();
        },
        onValueChange: function (e) {
            this.$data.values.splice(e.index, 1, e.value.toString());
            this.$emit('value-change', {value: this.$data.values.join(this.getValueSeparator(this.name)), name: this.name, index: e.index, type: this.$data.propertyTypes});
        },
        initializeComponent: function () {
            this.$data.values = [];
            this.propertyManifest = [];
        }
    }
}