import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '../src/components/HelloWorld.vue'
import Utilities from '@/utils/Utilities.js';

describe('Utilities.js', () => {
  it('Ensures the getValueTypeByID method returns the correct value type', () => {
    const label = 'Column Span Options';
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    expect(Utilities.getValueTypeByID(51).label).toMatch(label);
  })
})

describe('Utilities.js', () => {
  it('Ensures that the getArrayIndexByValue method returns the correct index to a specified value in an array.', () => {
    const arr = ['can', 'not', 'be', 'pushed'];
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    expect(Utilities.getArrayIndexByValue(arr, 'be').toString()).toMatch('2');
  })
})

describe('Utilities.js', () => {
  it('Ensures that the getArrayIndexByValue method returns the correct index to a specified property for an array of objects.', () => {
    const arr = [{fruit: 'apple', veg: 'potato'}, {fruit: 'orage', veg: 'carrot'}, {fruit: 'pear', veg: 'celery'}, {fruit: 'grape', veg: 'kale'}];
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    expect(Utilities.getArrayIndexByValue(arr, 'grape', 'fruit').toString()).toMatch('3');
  })
})

describe('Utilities.js', () => {
  it('Ensures the getParameterByName method correctly returns the value of a specified parameter.', () => {
    const url = 'https://website.com/page?cheese=cheddar&color=red&country=uk';
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    expect(Utilities.getParameterByName('color', url)).toMatch('red');
  })
})

describe('Utilities.js', () => {
  it('Ensures the moveArrayItem method properly rearranges an array.', () => {
    let arr = ['one', 'two', 'three', 'four', 'fixe', 'six'];
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // })
    Utilities.moveArrayItem(arr, 4, 2);
    expect(arr.join('_')).toMatch(['one', 'two', 'fixe', 'three', 'four', 'six'].join('_'));
  })
})

