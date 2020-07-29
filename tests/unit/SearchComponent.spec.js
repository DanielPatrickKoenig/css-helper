import { shallowMount } from '@vue/test-utils';
import SearchComponent from '@/components/SearchCompnent.vue';
describe('SearchComponent.vue', () => {
    it('Ensures that the search component filters content properly', async () => {
      const data = {
        animation: {
            css3: true,
            description: "Specifies the keyframe-based animations.",
            property_types: [
                2
            ],
            index: 0,
            sub_properties: [6, 3, 8, 1, 5, 2, 4, 7]
        },
        money: {
            css3: true,
            description: "Something you spend to get stuff",
            property_types: [
                2
            ],
            index: 1,
            sub_properties: [6, 3, 8, 1, 5, 2, 4, 7]
        },
        fruit: {
            css3: true,
            description: "Something you that is tasty and nutritions",
            property_types: [
                2
            ],
            index: 2,
            sub_properties: [6, 3, 8, 1, 5, 2, 4, 7]
        },
        cake: {
            css3: true,
            description: "Something you that is tasty and not nutritions",
            property_types: [
                2
            ],
            index: 3,
            sub_properties: [6, 3, 8, 1, 5, 2, 4, 7]
        }
      };
      const showonempty = true;
      const wrapper = shallowMount(SearchComponent, {
          propsData: { data, showonempty }
      })
      const searchBox = wrapper.findAll('input').at(0);
      searchBox.setValue("Money");
      await  searchBox.trigger('change');
      await  searchBox.trigger('blur');
      const listItems = wrapper.findAll('li').at(0);
      expect(listItems.text()).toMatch('money');
    })
  })