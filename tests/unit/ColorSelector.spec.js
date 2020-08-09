import { shallowMount } from "@vue/test-utils";
import ColorSelector from '@/components/ColorSelector.vue';
describe('ColorSelector.vue', () => {
    it('Ensures that the correct number of swatches are getting created', () =>{
        
        const incrament = 2;
        const wrapper = shallowMount(ColorSelector, {
            propsData: {incrament}
            // propsData: { data, showonempty }
        });
        const swatches = wrapper.findAll('li');
        let swatchList = [];
        
        for(let i = 0; i < swatches.length; i++){
            swatchList.push(swatches.at(i));
        }
        expect(swatchList.length.toString()).toMatch((1000/incrament).toString());
    })
});


describe('ColorSelector.vue', () => {
    it('Ensures that numbers are getting written in when the incrament is 2', () =>{
        
        const incrament = 2;
        const wrapper = shallowMount(ColorSelector, {
            propsData: {incrament}
            // propsData: { data, showonempty }
        });
        const swatches = wrapper.findAll('li');
        
        expect(swatches.at(4).text()).toMatch('rgb(0,0,255)');
    })
});

describe('ColorSelector.vue', () => {
    it('Ensures that numbers are getting written in when the incrament is 1', () =>{
        
        const incrament = 1;
        const wrapper = shallowMount(ColorSelector, {
            propsData: {incrament}
            // propsData: { data, showonempty }
        });
        const swatches = wrapper.findAll('li');
        
        expect(swatches.at(9).text()).toMatch('rgb(0,0,255)');
    })
});

describe('ColorSelector.vue', () => {
    it('Ensures that all numbers are being calculated', () =>{
        
        const incrament = 2;
        const wrapper = shallowMount(ColorSelector, {
            propsData: {incrament}
            // propsData: { data, showonempty }
        });
        const swatches = wrapper.findAll('ul');
        console.log(swatches.at(0).text().split('NaN').length.toString());
        expect(swatches.at(0).text().split('NaN').length).toEqual(1);
    })
});

describe('ColorSelector.vue', () => {
    it('Ensure that clicks are triggering color indicators', async () =>{
        
        const incrament = 2;
        const wrapper = shallowMount(ColorSelector, {
            propsData: {incrament}
            // propsData: { data, showonempty }
        });
        const swatches = wrapper.findAll('li');
        await swatches.at(4).trigger('click');
        expect(wrapper.emitted('color-selected')[0][0]).toEqual({r: 0, g: 0, b: 255});
    })
});