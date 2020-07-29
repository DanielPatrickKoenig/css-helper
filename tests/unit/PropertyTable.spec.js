import { shallowMount } from '@vue/test-utils';
import SearchComponent from '@/components/PropertyTable.vue';
describe('PropertyTable.vue', () => {
    it('Ensures that the property table filters content properly', async () => {
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
      const wrapper = shallowMount(SearchComponent, {
          propsData: { data }
      })
      const searchBox = wrapper.findAll('input.search-box').at(0);
      searchBox.setValue("Money");
      await  searchBox.trigger('change');
      await  searchBox.trigger('blur');
      const listItems = wrapper.findAll('.content-row > ul > li:first-child > label').at(0);
      expect(listItems.text()).toMatch('money');
    })
  })

  describe('PropertyTable.vue', () => {
    it('Ensures that the property table is displaying the correct data types for in the property rows', () => {
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
                15,
                3,
                5,
                6,
                7,
                8,
                26,
                25
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
      const wrapper = shallowMount(SearchComponent, {
          propsData: { data }
      })
      const listItems = wrapper.findAll('.content-row:nth-child(3) > ul ol > li:nth-child(8)').at(0);
      expect(listItems.text()).toMatch('Background Size Options');
    })
  })

  