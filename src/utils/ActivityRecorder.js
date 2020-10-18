const ActionTypes = {
    CLICK: 0,
    MOUSE_DOWN: 1,
    MOUSE_MOVE: 2,
    MOUSE_UP: 3,
    KEYUP: 4,
    KEYDOWN: 5,
    CHANGE: 6,
    TOUCH_START: 7,
    TOUCH_MOVE: 8,
    TOUCH_END: 9,
    MOUSE_OVER: 10,
    MOUSE_OUT: 11,
    MOUSE_ENTER: 12,
    MOUSE_LEAVE: 13,
    FOCUS: 14,
    BLUR: 15
}
let lastActivity = {};
function init () {
    document.querySelector('body').addEventListener('keydown', (e) => {
        // console.log(e);
        lastActivity = e;
    });
}
function log (actionType, data) {
    actionLog.push({
        type: actionType,
        data: data
    });
}
function createData (target, otherProps) {
    let elIndex = 0;
    const targetTypeList = document.querySelectorAll(target.nodeName.toLowerCase())
    for(let i = 0; i < targetTypeList.length; i++){
        if(target == targetTypeList[i]){
            elIndex = i;
        }
    }
    let output = {index: elIndex, tag: target.nodeName.toLowerCase()};
    if(otherProps){
        for(let p in otherProps){
            output[p] = otherProps[p];
        }
    }
    return output;
}
function logClick(target){
    log(ActionTypes.CLICK, createData(target));
}
function logMouseDown(target, x, y){
    log(ActionTypes.MOUSE_DOWN, createData(target, {x: x, y: y}));
}
function logMouseMove(target, x, y){
    log(ActionTypes.MOUSE_MOVE, createData(target, {x: x, y: y}));
}
function logMouseUp(target, x, y){
    log(ActionTypes.MOUSE_UP, createData(target, {x: x, y: y}));
}
function logChange(target, value){
    log(ActionTypes.CHANGE, createData(target, {value: value}));
}
function getActions(){
    return actionLog;
}
let actionLog = [];
const ActivityRecorder = {
    ActionTypes: ActionTypes,
    init: init,
    logClick: logClick,
    logMouseDown: logMouseDown,
    logMouseMove: logMouseMove,
    logMouseUp: logMouseUp,
    logChange: logChange,
    getActions: getActions,
    actionLog: actionLog,
    lastActivity: lastActivity
};
export default ActivityRecorder;