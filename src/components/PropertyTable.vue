<template>
    <div class="property-table-component">
        <div class="header-container full-width-content">
            <input id="property_search" class="search-box" type="text" v-model="searchTerm" /> 
            <label for="property_search"><font-awesome-icon icon="search"/></label>
            <router-link v-if="selections.length > 0" :to="'/property?names='+selections.join(',')+'&template=default'" class="selection-link">
                <label>{{selections.length}} </label>
                <font-awesome-icon icon="code"/>
            </router-link>
            <a v-else class="selection-link selection-link-disabled">
                <font-awesome-icon icon="code"/>
            </a>
            <div class="content-row header-row">
                <ul>
                    <li>Name</li>
                    <li>Description</li>
                    <li>Data Types</li>
                </ul>
            </div>
        </div>
        
        <div class="content-row" v-for="(v, k, i) in searchables" :key="'property-'+i.toString()">
            <input :id="'item-'+i.toString()" type="checkbox" class="expand-checkbox" />
            <ul>
                <li>
                    <label :for="'item-'+i.toString()">
                        <font-awesome-icon class="open-icon expansion-icon" icon="caret-down" />
                        <font-awesome-icon class="close-icon expansion-icon" icon="caret-up" />
                        {{k}}
                    </label>
                    <input v-on:change="onPropertyCheckChange" type="checkbox" v-model="selectionMatrix[k]" />
                </li>
                <li>{{v.description}}</li>
                <li>
                    <ol>
                        <li v-for="(t, j) in v.property_types" :key="'value-type-'+i.toString()+'-'+j.toString()">
                            {{getPropertyValueType(t).label}}
                        </li>
                    </ol>
                </li>
            </ul>
        </div>
    </div>    
</template>
<script>
import Utilities from '../utils/Utilities';
import {mapState} from 'vuex';
export default {
    props: ['data'],
    data () {
        return {
            searchTerm: '',
            valueTypes: Utilities.PropertyValueTypes,
            selectionMatrix: {},
            selections: []
        }
    },
    methods: {
        getPropertyValueType: Utilities.getValueTypeByID,
        onPropertyCheckChange: function (e) {
             this.$data.selections = [];
            for(let s in this.$data.selectionMatrix){
                if(this.$data.selectionMatrix[s]){
                    this.$data.selections.push(s);
                }
            }
            this.recorder.logClick(e.currentTarget);
        }
    },
    computed: {
        searchables: function () {
            let items = {}
            for (let k in this.data) {
                if (k.toLowerCase().split(this.$data.searchTerm.toLowerCase()).length > 1) {
                    items[k] = this.data[k];
                }
            }
            return items;
        },
        ...mapState(['recorder'])
    },
    mounted: function (){
        for(let d in this.data){
            this.$data.selectionMatrix[d] = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../scss/variables.scss';
@import '../scss/mixins.scss';
div.property-table-component{
    position: relative;
    > div.header-container{
        position:fixed;
        box-shadow: 0 1px 0 rgba(0,0,0,.1) inset;
        background-image:linear-gradient(0deg,rgba(220,220,220,1) 15.714285714285714%,rgba(255,255,255,1) 58.214285714285715%);
        top:2em;
        z-index: 9;
        > .selection-link{
            position: absolute;
            right: 14px;
            top: 4px;
            &.selection-link-disabled{
                opacity: .5;
            }
            > label{
                font-size: 0.3em;
                background-color: #ff0000;
                border-radius: 10em;
                display: flex;
                justify-content: center;
                width: 2.4em;
                padding: .2em;
                color: #ffffff;
                text-decoration: none !important;
                position: absolute;
                margin-left: 1.9em;
                margin-top: -.6em;

            }
        }
        > input[type="text"]{
            
            width: 78%;
            padding: 6px 5px;
            display: block;
            background-color:transparent;
            border:none;
            margin-left:1.5em;
            @include min(850px){
                margin: 0 auto;
                padding: 6px 0;
                width: 90%;
            }
            
            & + label{
                position:absolute;
                top: .1em;
                font-size: 1.1em;
                @include min(850px){
                    top: -.15em;
                    margin: 0 auto;
                    padding: 6px 0;
                    left: .8em;
                }

            }
        }
    }
    
}
ul{
    margin:0;
    padding:0;
    > li{
        margin:0;
        padding:0;
    }
}
div.content-row:not(.header-row){
    &:nth-child(odd){
        background-color: rgba(53,136,201,.05);
    }
    > ul{
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
        > li{
            position:relative;
            span.text-link{
                display:none;
            }
            span.icon-link{
                display:inline-block;
            }
            > label + input{
                position:absolute;
                right:.4em;
            }
        }
        > li:first-child{
            font-weight:bold;
            display:block;
        }
    }
    > input.expand-checkbox{
        display:none;
    }
    > input.expand-checkbox + ul{
        > li:not(:first-child){
            display:none;
        }
        > li{
            > label{
                .open-icon{
                    display:inline-block;
                }
                .close-icon{
                    display:none;
                }
            }
        }
        
    }
    > input.expand-checkbox:checked + ul{
        > li:not(:first-child){
            display:block;
            
        }
        > li{
            > label{
                .open-icon{
                    display:none;
                }
                .close-icon{
                    display:inline-block;
                }
            }
            
        }
    }
    
}
div.content-row{
    > ul {
        > li{
            padding: .4em .6em;
        }
    }
}
div.content-row.header-row{
    display:none;
}
@include min(850px){
    div.property-table-component{
        > div.header-container{
            display:block;
            top:4.5em;
            > input[type="text"] {
                padding: 6px;
            }
        }
    }
    div.content-row{
        width: 100%;
        > ul{
            display:flex;
            flex-direction:row;
            width: 100%;
            > li{
                width: 25%;
                display:inline-flex !important;
                flex-grow:1;
                position: relative;
                span.text-link{
                    display:inline-block !important;
                }
                span.icon-link{
                    display:none !important;
                }
                > label{
                    
                    margin-left: 1.2em;
                    .expansion-icon{
                        display:none !important;
                    }
                }
                > label + input{
                    position:absolute;
                    left:.4em;
                }
                
            }
            > li:nth-child(2){
                flex-grow:3;
                width: 50%;
            }
        }
    }
    div.content-row.header-row{
        display:flex;
    }
}
</style>