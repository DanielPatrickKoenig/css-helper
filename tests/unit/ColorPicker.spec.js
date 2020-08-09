import { shallowMount } from "@vue/test-utils";
import ColorPicker from '@/components/ColorPicker.vue';
describe('ColorPicker.vue', () => {
    it('Should create correct number of swatches', async () => {
        const granularity = 50;
        const wrapper = shallowMount(ColorPicker, {
            propsData: {
                granularity
            }
        });
        await wrapper.vm.$nextTick();
        const swatches = wrapper.findAll('path');
        expect(swatches.length).toEqual(granularity);
    });
    it('Should emmit propper color', async () => {
        const granularity = 50;
        const wrapper = shallowMount(ColorPicker, {
            propsData: {
                granularity
            }
        });
        const swatches = wrapper.findAll('path');
        const clickIndex = Math.floor(Math.random()*swatches.length);
        await swatches.at(clickIndex).trigger('click');

        expect(wrapper.vm.selectedColor).toEqual(wrapper.vm.colors[clickIndex]);
    });
});