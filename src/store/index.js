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
        }
    }
});