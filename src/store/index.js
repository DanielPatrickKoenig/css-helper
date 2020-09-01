import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        propertyManifest: null,
        ready: false,
        selectorPropertyMatrix: {},
        selectorTypeMatrix: {},
        selectorList: [],
        selectorIndex: 0,
        colorPresets: null
    },
    mutations: {
        SET_PROPERTY_MANIFEST(state, payload){
            for(let p in payload){
                payload[p].property_types.push(0);
            }
            state.propertyManifest = payload;
            state.ready = state.colorPresets != null;
        },
        SET_COLOR_PRESETS(state, payload){
            state.colorPresets = payload;
            state.ready = state.propertyManifest != null;
        },
        SET_SELECTOR_INDEX(state, payload){
            state.selectorIndex = payload;
        },
        ADD_SELECTOR(state, payload){
            state.selectorList.push(payload);
        },
        REMOVE_SELECTOR(state, payload){
            let index = -1;
            for(let i = 0; i < state.selectorList.length; i++){
                if(payload == state.selectorList[i]){
                    index = i;
                }
            }
            if(index > -1){
                state.selectorList.splice(index, 1);
            }
        },
        SET_PROPERTY_MATRIX_VALUE(state, payload){
            switch(payload.length){
                case 0:{
                    break;
                }
                case 1:{
                    state.selectorPropertyMatrix[payload[0]] = {};
                    break;
                }
                case 2:{
                    if(!state.selectorPropertyMatrix[payload[0]]){
                        state.selectorPropertyMatrix[payload[0]] = {};
                    }
                    state.selectorPropertyMatrix[payload[0]][payload[1]] = {};
                    break;
                }
                case 3:{
                    if(!state.selectorPropertyMatrix[payload[0]]){
                        state.selectorPropertyMatrix[payload[0]] = {};
                    }
                    if(!state.selectorPropertyMatrix[payload[0]][payload[1]]){
                        state.selectorPropertyMatrix[payload[0]][payload[1]] = {};
                    }
                    state.selectorPropertyMatrix[payload[0]][payload[1]][payload[2]] = {};
                    break;
                }
                case 4:{
                    if(!state.selectorPropertyMatrix[payload[0]]){
                        state.selectorPropertyMatrix[payload[0]] = {};
                    }
                    if(!state.selectorPropertyMatrix[payload[0]][payload[1]]){
                        state.selectorPropertyMatrix[payload[0]][payload[1]] = {};
                    }
                    if(!state.selectorPropertyMatrix[payload[0]][payload[1]][payload[2]]){
                        state.selectorPropertyMatrix[payload[0]][payload[1]][payload[2]] = {};
                    }
                    state.selectorPropertyMatrix[payload[0]][payload[1]][payload[2]] = payload[3];
                    break;
                }
            }
        },
        SET_TYPE_MATRIX_VALUE(state, payload){
            switch(payload.length){
                case 0:{
                    break;
                }
                case 1:{
                    state.selectorTypeMatrix[payload[0]] = {};
                    break;
                }
                case 2:{
                    state.selectorTypeMatrix[payload[0]][payload[1]] = {};
                    break;
                }
                case 3:{
                    state.selectorTypeMatrix[payload[0]][payload[1]][payload[2]] = {};
                    break;
                }
                case 4:{
                    if(payload[3].toString().split('type_').length > 1){
                        state.selectorTypeMatrix[payload[0]][payload[1]][payload[2]][payload[3]] = {}
                    }
                    else {
                        state.selectorTypeMatrix[payload[0]][payload[1]][payload[2]] = payload[3];
                    }
                    break;
                }
                case 5:{
                    state.selectorTypeMatrix[payload[0]][payload[1]][payload[2]][payload[3]] = payload[4];
                    break;
                }
            }
        }
    },
    actions: {
        pullPropertyManifest: function ({commit}) {
            axios.get('property-manifest.json').then((response) => {
                commit('SET_PROPERTY_MANIFEST',response.data);
            });
        },
        pullColorPresets: function ({commit}) {
            axios.get('preset-colors.json').then((response) => {
                commit('SET_COLOR_PRESETS',response.data);
            });
        },
        setSelectorInex: function ({commit}, payload){
            commit('SET_SELECTOR_INDEX', payload);
        },
        addSelector: function ({commit}, payload){
            commit('ADD_SELECTOR', payload);
        },
        removeSelector: function ({commit}, payload){
            commit('REMOVE_SELECTOR', payload);
        },
        setPropertyMatrixValue: function ({commit}, payload) {
            commit('SET_PROPERTY_MATRIX_VALUE', payload);
        },
        setTypeMatrixValue: function ({commit}, payload) {
            commit('SET_TYPE_MATRIX_VALUE', payload);
        }
    }
});