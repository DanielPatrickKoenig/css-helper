import { shallowMount } from "@vue/test-utils";
import SliderComponent from '@/components/SliderComponent.vue';
describe('SliderComponent.vue', () => {
    it('Should not have a div.drag-blocker when not down', () => {
        const wrapper = shallowMount(SliderComponent, {});
        const blockers = wrapper.findAll('div.drag-blocker');
        expect(blockers.length).toEqual(0);
    });
    it('Should have a div.drag-blocker when down', async () => {
        const wrapper = shallowMount(SliderComponent, {});
        const draggers = wrapper.findAll('div.drag-element');
        await draggers.at(0).trigger('mousedown');
        const blockers = wrapper.findAll('div.drag-blocker');
        // await Vue.nextTick();
        // wrapper.vm.$forceUpdate();
        expect(blockers.length).toEqual(1);
    });
    it('Should remove the div.drag-blocker on mouse up', async () => {
        const wrapper = shallowMount(SliderComponent, {});
        const draggers = wrapper.findAll('div.drag-element');
        await draggers.at(0).trigger('mousedown', {pageX: 10, pageY: 10});
        const blockers = wrapper.findAll('div.drag-blocker');
        await blockers.at(0).trigger('mousemove', {pageX: 40, pageY: 50});
        await blockers.at(0).trigger('mouseup');
        
        // await Vue.nextTick();
        // wrapper.vm.$forceUpdate();
        expect(wrapper.findAll('div.drag-blocker').length).toEqual(0);
    });
    it('Should dispatch slider ratio when moved', async () => {
        const constraint = 'horizontal';
        const width = 200;
        const wrapper = shallowMount(SliderComponent, {
            propsData: {constraint, width}
        });
        const draggers = wrapper.findAll(`div.drag-element-${constraint}`);
        await draggers.at(0).trigger('mousedown', {pageX: 5, pageY: 4});
        const blockers = wrapper.findAll('div.drag-blocker');
        await blockers.at(0).trigger('mousemove', {pageX: 40, pageY: 25});
        
        // await Vue.nextTick();
        // wrapper.vm.$forceUpdate();
        expect(wrapper.vm.positionRatio.x).toEqual(.2);
    });
    // it("Should update from external changes", async () => {
    //     let ratiox = 0;
    //     const constraint = 'horizontal';
    //     const width = 500;
    //     const wrapper = shallowMount(SliderComponent, {
    //         propsData: {ratiox, constraint, width}
    //     });
    //     await wrapper.vm.$nextTick();
    //     await wrapper.setProps({ratio: .4});
    //     wrapper.vm.$update();
    //     await wrapper.vm.$nextTick();
    //     expect(wrapper.vm.position.x).toEqual(200);
    // });
});