import { shallowMount } from "@vue/test-utils";
import ColorTool from '@/components/ColorTool.vue';
describe("ColorTool.vue", () => {
    it("Should update the color on entering text", async () => {
        const wrapper = shallowMount(ColorTool);
        const redField = wrapper.find('input.red-value-input');
        redField.setValue('48');
        await redField.trigger('change');
        expect(wrapper.vm.sliderData.r.value).toEqual('48');
        const greenField = wrapper.find('input.green-value-input');
        greenField.setValue('120');
        await greenField.trigger('change');
        expect(wrapper.vm.sliderData.g.value).toEqual('120');
        const blueField = wrapper.find('input.blue-value-input');
        blueField.setValue('37.9');
        await blueField.trigger('change');
        expect(wrapper.vm.sliderData.b.value).toEqual('37.9');
        const alphaField = wrapper.find('input.alpha-value-input');
        alphaField.setValue('.66');
        await alphaField.trigger('change');
        expect(wrapper.vm.sliderData.a.value).toEqual('.66');
    })
})