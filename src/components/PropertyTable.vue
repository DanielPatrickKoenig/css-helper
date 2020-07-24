<template>
    <div class="property-table-component">
        <input class="search-box" type="text" v-model="searchTerm" />
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Data Types</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v, k, i) in searchables" :key="'property-'+i.toString()">
                    <td>{{k}}</td>
                    <td>{{v.description}}</td>
                    <td>
                        <ol>
                            <li v-for="(t, j) in v.property_types" :key="'value-type-'+i.toString()+'-'+j.toString()">
                                {{getPropertyValueType(t).label}}
                            </li>
                        </ol>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>    
</template>
<script>
import Utilities from '../utils/Utilities'
export default {
    props: ['data'],
    data () {
        return {
            searchTerm: '',
            valueTypes: Utilities.PropertyValueTypes
        }
    },
    methods: {
        getPropertyValueType: Utilities.getValueTypeByID
    },
    computed: {
        searchables: function () {
            let items = {}
            for (let k in this.data) {
                if (k.split(this.$data.searchTerm).length > 1) {
                    items[k] = this.data[k];
                }
            }
            return items;
        }
    }
}
</script>