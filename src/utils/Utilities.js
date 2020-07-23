function createUniqueID () {
    return 'sig-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join('');
}
function getArrayIndexByValue (array ,value, property) {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        let indexedVal = property ? array[i][property] : array[i];
        if(indexedVal == value){
            index = i;
        }
    }
    return index;
}
const Utilities = {
    createUniqueID: createUniqueID,
    getArrayIndexByValue: getArrayIndexByValue
}
export default Utilities;