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
const PropertyValueTypes = {
    DEFAULTS: 0,
    STRING: 1,
    CSS_CLASS_UI: 2,
    PX: 3,
    S: 4,
    PT: 5,
    EM: 6,
    REM: 7,
    IN: 8,
    POSITION_OPTIONS: 9,
    DISPLAY_OPTIONS: 10,
    GRADIENT_UI: 11,
    ANIMATION_DIRECTION_OPTIONS: 12,
    FILL_MODE_OPTIONS: 13,
    INTEGER: 14,
    PERCENT: 15,
    ANIMATION_UI: 16,
    EDGE_OPTIONS: 17,
    PLAY_STATE_OPTIONS: 18,
    EASE_UI: 19,
    COLOR_UI: 20,
    BACKGROUND_ATTACHMENT_OPTIONS: 21,
    CLIPPING_OPTION: 22,
    ALIGNMENT_OPTIONS: 23,
    REPEAT_OPTIONS: 24,
    BAKCGROUND_FILL_OPPTIONS: 25,
    BORDER_OPTIONS: 26,
    BORDER_STYLE_OPTIONS: 27,
    BORDER_REPEAT_OPTIONS: 28,
    DECIMAL: 29,
    VH: 30,
    VW: 31,
    ATTRIBUTE: 32,
    URL: 33,
    CONTENT_OPTIONS: 34,
    ALIGN_CONTENT_OPTIONS: 35,
    ALIGN_ITEMS_OPTIONS: 36,
    FLEX_DIRECTION_OPTIONS: 37,
    FLEX_WRAP_OPTIONS: 38,
    CONTENT_JUSTIFICATION_OPTIONS: 39,
    FONT_SHORTCUT_OPTIONS: 40,
    FONT_FROM_LIST: 41,
    FONT_SIZE_SHORTCUT_OPTIONS: 42,
    FONT_STRETCH_OPTIONS: 43,
    FONT_STYLE_OPTIONS: 44,
    FONT_VARIANT_OPTIONS: 45,
    FONT_WEIGHT_OPTIONS: 46,
    INSIDE_OUTSIDE_OPTIONS: 47,
    LIST_TYPE_OPTIONS: 48,
    COLUMN_FILL_OPTIONS: 49,
    WIDTH_OPTIONS: 50,
    COLUMN_SPAN_OPTION: 51,
    PAGE_BREAK_OPTIONS: 52,
    BORDER_COLLAPSE_OPTIONS: 53,
    TOP_BOTTOM_OPTIONS: 54,
    SHOW_HIDE_OPTIONS: 55,
    AUTO_FIXED_OPTION: 56,
    LTR_RTL_OPTIONS: 57,
    TEXT_ALIGN_OPTIONS: 58,
    TEXT_ALIGN_LAST_OPTIONS: 59,
    TEXT_DECORATION_OPTIONS: 60,
    TEXT_DECORATION_STYLE_OPTIONS: 61,
    TEXT_JUSTIFICATION_OPTIONS: 62,
    TEXT_OPVERFLOW_OPTIONS: 63,
    SHADOW_UI: 64,
    TEXT_TRANSFORM_OPTIONS: 65,
    VERTICAL_ALIGNMENT_OPTIONS: 66,
    WHITE_SPACE_OPTIONS: 67,
    WHITE_WRAP_OPTIONS: 68,
    WHITE_BREAK_OPTIONS: 69,
    VISIBILITY_OPTIONS: 70,
    TRANSFORM_UI: 71,
    TRANSFORM_ORIGIN_UI: 72,
    TRANSFORM_STYLE_OPTIONS: 73,
    FLOAT_OPTIONS: 74,
    CLEAR_OPTIONS: 75,
    OVERFLOW_OPTIONS: 76,
    RESIZE_OPTIONS: 77,
    SHAPE_UI: 78,
    CURSOR_OPTIONS: 79,
    BOX_OPTIONS: 80
};
const DefaultOptions = ['initial', 'inherit'];
const PositionOptions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
const DisplayOptions = ['inline', 'block', 'contents', 'flex', 'flow', 'flow-root', 'grid', 'inline-block', 'inline-flex', 'inline-grid', 'inline-table', 'list-item', 'run-in', 'table', 'table-caption', 'table-column-group', 'table-header-group', 'table-footer-group', 'table-row-group', 'table-cell', 'table-column', 'table-row', 'none'];
const AnimationDirectionOptions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const AnimationPlayStateOptoins = ['paused', 'running'];
const Utilities = {
    createUniqueID: createUniqueID,
    getArrayIndexByValue: getArrayIndexByValue,
    PropertyValueTypes: PropertyValueTypes,
    DefaultOptions: DefaultOptions,
    PositionOptions: PositionOptions,
    DisplayOptions: DisplayOptions,
    AnimationDirectionOptions: AnimationDirectionOptions,
    AnimationPlayStateOptoins: AnimationPlayStateOptoins
}
export default Utilities;