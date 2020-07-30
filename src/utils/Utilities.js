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
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const DataReps = {
    SELECT: 0,
    NUMBER: 1,
    INTEGER: 2,
    COMPOSITE: 3,
    TOOL: 4,
    TEXT_FEILD: 5
}

const ValueSeparatorMatrix = {
    'default': {actual: ' ', proxy: '----SPACE----'},
    'background-size': {actual: '/', proxy: '----SLASH----'}
};

const DefaultOptions = ['initial', 'inherit'];
const PositionOptions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
const DisplayOptions = ['inline', 'block', 'contents', 'flex', 'flow', 'flow-root', 'grid', 'inline-block', 'inline-flex', 'inline-grid', 'inline-table', 'list-item', 'run-in', 'table', 'table-caption', 'table-column-group', 'table-header-group', 'table-footer-group', 'table-row-group', 'table-cell', 'table-column', 'table-row', 'none'];
const AnimationDirectionOptions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const AnimationFillModeOptions = ['none', 'forwards', 'backwards', 'both'];
const AnimationPlayStateOptoins = ['paused', 'running'];
const BackgroundAttachmentOptions = ['scroll', 'fixed'];
const BackgroundClipOptions = ['border-box', 'padding-box', 'content-box'];
const BackgroundPositionOptions = ['left', 'center', 'right'];
const BackgroundRepeatOptions = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'];
const BackgroundSizeOption = ['auto', 'cover', 'contain'];
const BorderStyleOptions = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
const BorderImageRepeatOptions = ['stretch', 'repeat', 'round', 'space'];
const ContentOptions = ['open-quote', 'close-quote', 'no-open-quote', 'no-close-quote'];
const AlignContentOptions = ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'stretch'];
const AlignItemsOptions = ['baseline', 'center', 'flex-start', 'flex-end', 'stretch'];
const FlexDirectionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];
const FlexWrapOptionos = ['nowrap', 'wrap', 'wrap-reverse'];
const JustifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
const FontSizeOptions = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'smaller', 'larger'];
const FontStretchOptions = ['normal', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'];
const FontStyleOptions = ['normal', 'italic', 'oblique'];
const FontVariantOptions = ['normal', 'small-caps'];
const FontWeightOptions = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const ListStyleOptions = ['inside', 'outside'];
const ListTypeOptions = ['disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman', 'lower-greek', 'lower-latin', 'upper-latin', 'armenian', 'georgian', 'lower-alpha', 'upper-alpha', 'none'];
const ColumnFillOptions = ['auto', 'balance'];
const LineWidthOptions = ['medium', 'thin', 'thick'];
const ColumnSpanOptions = ['none', 'all'];
const PageBreakOptions = ['auto', 'always', 'avoid', 'left', 'right'];
const PageBreakInsideOptions = ['auto', 'always', 'avoid', 'left', 'right'];
const BorderCollapseOptions = ['separate', 'collapse'];
const CaptionSideOptions = ['top', 'bottom'];
const EmptyCellOptions = ['show', 'hide'];
const TableLayoutOptions = ['auto', 'fixed'];
const DirectionOptions = ['ltr', 'rtl'];
const TextAlignOptions = ['left', 'right', 'center', 'justify'];
const TextAlignLastOptions = ['auto', 'start', 'end', 'left', 'right', 'center', 'justify'];
const TextDecorationOptions = ['underline', 'overline', 'line-through', 'blink'];
const TextDecorationStyleOptions = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
const TextJustifyOptions = ['auto', 'none', 'inter-word', 'distribute'];
const TextOverflowOptions = ['clip', 'ellipsis'];
const TextTransformOptions = ['capitalize', 'lowercase', 'none', 'uppercase'];
const VerticalAlignOptions = ['baseline', 'sub', 'super', 'top', 'text-top', 'middle', 'bottom', 'text-bottom'];
const WhiteSpaceOptionns = ['normal', 'pre', 'nowrap', 'pre-line', 'pre-wrap'];
const WordWrapOptions = ['normal', 'break-word'];
const WordBreakOptions = ['normal', 'break-all', 'keep-all'];
const VisibilityOptions = ['visible', 'hidden', 'collapse'];
const BackfaceVisibilityOptions = ['visible', 'hidden'];
const TransformStyleOptions = ['flat', 'preserve-3d'];
const FloatOptions = ['left', 'right', 'none'];
const ClearOptions = ['left', 'right', 'auto', 'both', 'none'];
const OverflowOptions = ['auto', 'hidden', 'scroll', 'visible'];
const ResizeOptions = ['none', 'both', 'horizontal', 'vertical'];
const CursorOptions = ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out'];
const BoxSizingOptions = ['content-box', 'padding-box', 'border-box'];

const PropertyValueTypes = {
    DEFAULTS: {id: 0, options: DefaultOptions, label: 'Default Options', rep: DataReps.SELECT},
    STRING: {id: 1, label: 'String', rep: DataReps.TEXT_FEILD},
    CSS_CLASS_UI: {id: 2, label: 'Composite', rep: DataReps.COMPOSITE},
    PX: {id: 3, suffix: 'px', label: 'Pixels', rep: DataReps.NUMBER},
    S: {id: 4, suffix: 's', label: 'Seconds', rep: DataReps.NUMBER},
    PT: {id: 5, suffix: 'pt', label: 'Points', rep: DataReps.NUMBER},
    EM: {id: 6, suffix: 'em', label: 'Emphemeral', rep: DataReps.NUMBER},
    REM: {id: 7, suffix: 'rem', label: 'Relative Emphemeral', rep: DataReps.NUMBER},
    IN: {id: 8, suffix: 'in', label: 'inches', rep: DataReps.NUMBER},
    POSITION_OPTIONS: {id: 9, options: PositionOptions, label: 'Position Options', rep: DataReps.SELECT},
    DISPLAY_OPTIONS: {id: 10, options: DisplayOptions, label: 'Display Options', rep: DataReps.SELECT},
    GRADIENT_UI: {id: 11, tool: {}, label: 'Gradient Tool', rep: DataReps.TOOL},
    ANIMATION_DIRECTION_OPTIONS: {id: 12, options: AnimationDirectionOptions, label: 'Animation Direction Options', rep: DataReps.SELECT},
    ANIMATION_FILL_MODE_OPTIONS: {id: 13, options: AnimationFillModeOptions, label: 'Animation Fill Mode Options', rep: DataReps.SELECT},
    INTEGER: {id: 14, label: 'Integer', rep: DataReps.INTEGER},
    PERCENT: {id: 15, suffix: '%', label: 'Percent', rep: DataReps.NUMBER},
    ANIMATION_UI: {id: 16, tool: {}, label: 'Animation Tool', rep: DataReps.TOOL},
    VISIBILITY_OPTIONS: {id: 17, options: VisibilityOptions, label: 'Visibility Options', rep: DataReps.SELECT},
    ANIMATION_PLAY_STATE_OPTIONS: {id: 18, options: AnimationPlayStateOptoins, label: 'Animation Play State Options', rep: DataReps.SELECT},
    EASE_UI: {id: 19, tool: {}, label: 'Ease Tool', rep: DataReps.TOOL},
    COLOR_UI: {id: 20, tool: {}, label: 'Color Tool', rep: DataReps.TOOL},
    BACKGROUND_ATTACHMENT_OPTIONS: {id: 21, options: BackgroundAttachmentOptions, label: 'Background Attachment Options', rep: DataReps.SELECT},
    BACKGROUND_CLIP_OPTIONS: {id: 22, options: BackgroundClipOptions, label: 'Background Clip Ation Options', rep: DataReps.SELECT},
    BACKGROUND_POSITION_OPTIONS: {id: 23, options: BackgroundPositionOptions, label: 'Background Position Options', rep: DataReps.SELECT},
    BACKGROUND_REPEAT_OPTIONS: {id: 24, options: BackgroundRepeatOptions, label: 'Background Repeat Options', rep: DataReps.SELECT},
    BAKCGROUND_SIZE_OPPTIONS: {id: 25, options: BackgroundSizeOption, label: 'Background Size Options', rep: DataReps.SELECT},
    CM: {id: 26, suffix: 'cm', label: 'Centemeters', rep: DataReps.NUMBER},
    BORDER_STYLE_OPTIONS: {id: 27, options: BorderStyleOptions, label: 'Border Style Options', rep: DataReps.SELECT},
    BORDER_IMAGE_REPEAT_OPTIONS: {id: 28, options: BorderImageRepeatOptions, label: 'Border Image Repeat Options', rep: DataReps.SELECT},
    DECIMAL: {id: 29, label: 'Decimal', rep: DataReps.NUMBER},
    VH: {id: 30, suffix: 'vh', label: 'View Height', rep: DataReps.NUMBER},
    VW: {id: 31, suffix: 'vw', label: 'View Width', rep: DataReps.NUMBER},
    ATTRIBUTE: {id: 32, label: 'Attribute', rep: DataReps.TEXT_FEILD},
    URL: {id: 33, label: 'URL', rep: DataReps.TEXT_FEILD, prefix: 'url(', suffix: ')'},
    CONTENT_OPTIONS: {id: 34, options: ContentOptions, label: 'Content Options', rep: DataReps.SELECT},
    ALIGN_CONTENT_OPTIONS: {id: 35, options: AlignContentOptions, label: 'Align Content Options', rep: DataReps.SELECT},
    ALIGN_ITEMS_OPTIONS: {id: 36, options: AlignItemsOptions, label: 'Align Items Options', rep: DataReps.SELECT},
    FLEX_DIRECTION_OPTIONS: {id: 37, options: FlexDirectionOptions, label: 'Flex Direction Options', rep: DataReps.SELECT},
    FLEX_WRAP_OPTIONS: {id: 38, options: FlexWrapOptionos, label: 'Flex Wrap Options', rep: DataReps.SELECT},
    JUSTIFY_CONTENT_OPTIONS: {id: 39, options: JustifyContentOptions, label: 'Justify Content Options', rep: DataReps.SELECT},
    PAGE_BREAK_INSIDE_OPTIONS: {id: 40, options: PageBreakInsideOptions, label: 'Page Break Options', rep: DataReps.SELECT},
    FONT_UI: {id: 41, tool: {}, label: 'Font Tool', rep: DataReps.TOOL},
    FONT_SIZE_OPTIONS: {id: 42, options: FontSizeOptions, label: 'Font Size Options', rep: DataReps.SELECT},
    FONT_STRETCH_OPTIONS: {id: 43, options: FontStretchOptions, label: 'Font Stretch Options', rep: DataReps.SELECT},
    FONT_STYLE_OPTIONS: {id: 44, options: FontStyleOptions, label: 'Font Style Options', rep: DataReps.SELECT},
    FONT_VARIANT_OPTIONS: {id: 45, options: FontVariantOptions, label: 'Font Variant Options', rep: DataReps.SELECT},
    FONT_WEIGHT_OPTIONS: {id: 46, options: FontWeightOptions, label: 'Font Weight Options', rep: DataReps.SELECT},
    LIST_STYLE_OPTIONNS: {id: 47, options: ListStyleOptions, label: 'Font Style Options', rep: DataReps.SELECT},
    LIST_TYPE_OPTIONS: {id: 48, options: ListTypeOptions, label: 'List Type Options', rep: DataReps.SELECT},
    COLUMN_FILL_OPTIONS: {id: 49, options: ColumnFillOptions, label: 'Column Fill Options', rep: DataReps.SELECT},
    LINE_WIDTH_OPTIONS: {id: 50, options: LineWidthOptions, label: 'Line Width Options', rep: DataReps.SELECT},
    COLUMN_SPAN_OPTION: {id: 51, options: ColumnSpanOptions, label: 'Column Span Options', rep: DataReps.SELECT},
    PAGE_BREAK_OPTIONS: {id: 52, options: PageBreakOptions, label: 'Page Break Options', rep: DataReps.SELECT},
    BORDER_COLLAPSE_OPTIONS: {id: 53, options: BorderCollapseOptions, label: 'Border Collapse Options', rep: DataReps.SELECT},
    CAPTION_SIDE_OPTIONS: {id: 54, options: CaptionSideOptions, label: 'Caption Side Options', rep: DataReps.SELECT},
    EMPTY_CELL_OPTIONS: {id: 55, options: EmptyCellOptions, label: 'Empty Cell Options', rep: DataReps.SELECT},
    TABLE_LAYOUT_OPTIONS: {id: 56, options: TableLayoutOptions, label: 'Table Layout Options', rep: DataReps.SELECT},
    DIRECTION_OPTIONS: {id: 57, options: DirectionOptions, label: 'Direction Options', rep: DataReps.SELECT},
    TEXT_ALIGN_OPTIONS: {id: 58, options: TextAlignOptions, label: 'Text Align Options', rep: DataReps.SELECT},
    TEXT_ALIGN_LAST_OPTIONS: {id: 59, options: TextAlignLastOptions, label: 'Text Align Last Options', rep: DataReps.SELECT},
    TEXT_DECORATION_OPTIONS: {id: 60, options: TextDecorationOptions, label: 'Text Decoration Options', rep: DataReps.SELECT},
    TEXT_DECORATION_STYLE_OPTIONS: {id: 61, options: TextDecorationStyleOptions, label: 'Text Decoration Style Options', rep: DataReps.SELECT},
    TEXT_JUSTIFY_OPTIONS: {id: 62, options: TextJustifyOptions, label: 'Text Justify Options', rep: DataReps.SELECT},
    TEXT_OPVERFLOW_OPTIONS: {id: 63, options: TextOverflowOptions, label: 'Text Overflow Options', rep: DataReps.SELECT},
    SHADOW_UI: {id: 64, tool: {}, label: 'Shadow Tool', rep: DataReps.TOOL},
    TEXT_TRANSFORM_OPTIONS: {id: 65, options: TextTransformOptions, label: 'Text Transform Options', rep: DataReps.SELECT},
    VERTICAL_ALIGN_OPTIONS: {id: 66, options: VerticalAlignOptions, label: 'Vertical Align Options', rep: DataReps.SELECT},
    WHITE_SPACE_OPTIONS: {id: 67, options: WhiteSpaceOptionns, label: 'White Space Options', rep: DataReps.SELECT},
    WORD_WRAP_OPTIONS: {id: 68, options: WordWrapOptions, label: 'Word Wrap Options', rep: DataReps.SELECT},
    WORD_BREAK_OPTIONS: {id: 69, options: WordBreakOptions, label: 'Word Break Options', rep: DataReps.SELECT},
    BACKFACE_VISIBILITY_OPTIONS: {id: 70, BackfaceVisibilityOptions, label: 'Backface Visibility Options', rep: DataReps.SELECT},
    TRANSFORM_UI: {id: 71, tool: {}, label: 'Transform Tool', rep: DataReps.TOOL},
    TRANSFORM_ORIGIN_UI: {id: 72, tool: {}, label: 'Transform Origin Tool', rep: DataReps.TOOL},
    TRANSFORM_STYLE_OPTIONS: {id: 73, options: TransformStyleOptions, label: 'Transform Style Options', rep: DataReps.SELECT},
    FLOAT_OPTIONS: {id: 74, options: FloatOptions, label: 'Float Options', rep: DataReps.SELECT},
    CLEAR_OPTIONS: {id: 75, options: ClearOptions, label: 'Clear Options', rep: DataReps.SELECT},
    OVERFLOW_OPTIONS: {id: 76, options: OverflowOptions, label: 'Overflow Options', rep: DataReps.SELECT},
    RESIZE_OPTIONS: {id: 77, options: ResizeOptions, label: 'Resize Optoins', rep: DataReps.SELECT},
    SHAPE_UI: {id: 78, tool: {}, label: 'Shape Tool', rep: DataReps.TOOL},
    CURSOR_OPTIONS: {id: 79, options: CursorOptions, label: 'Cursor Options', rep: DataReps.SELECT},
    BOX_SIZING_OPTIONS: {id: 80, options: BoxSizingOptions, label: 'Box Sizing Options', rep: DataReps.SELECT}
};

function getValueTypeByID(id){
    let propertyValueType = null;
    for(let p in PropertyValueTypes){
        if (PropertyValueTypes[p].id == id){
            propertyValueType = PropertyValueTypes[p];
        }
    }
    return propertyValueType;
}

function getPropertyDataByIndex(data, index){
    let propertyData = {};
    let propertyName = '';
    for(let d in data){
        if(data[d].index == index){
            propertyData = data[d];
            propertyName = d;
        }
    }
    return  {name: propertyName, data: propertyData};
}

function moveArrayItem(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
}

function propertyisLogged(scope, name, composited){
    let logged = false;
    if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]]){
        if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css){
            if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name]){
                // hasValue = true;
                // console.log(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name]);
                logged = true;
                // scope.$data.value = scope.parseValue(scope.$root.propertyManifest[name].value_separator ? scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name].split(scope.$root.propertyManifest[name].value_separator)[scope.index] : scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name]);
            }
            else{
                if(!composited){
                    scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name] = {};   
                }
            }
        }
        else{
            scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css = {};
        }
        // if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].type){
        //     console.log(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].type[name]);
        //     if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].type.join){
        //         scope.data = scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].type[scope.index];
        //     }
        //     else {
        //         scope.data = scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].type;
        //     }
        //     if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css){
        //         if(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name]){
        //             console.log(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name]);
        //             scope.$data.value = scope.processValue(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].css[name]);
        //         }
        //     }
            
        // }
        // console.log(scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]].type[name]);
    }
    else{
        scope.$root.selectorPropertyMatrix[scope.$root.selectorList[scope.$root.selectorIndex]] = {};
    }
    return logged;
}

const Utilities = {
    createUniqueID: createUniqueID,
    getArrayIndexByValue: getArrayIndexByValue,
    PropertyValueTypes: PropertyValueTypes,
    getParameterByName: getParameterByName,
    getValueTypeByID: getValueTypeByID,
    DataReps: DataReps,
    getPropertyDataByIndex: getPropertyDataByIndex,
    ValueSeparatorMatrix: ValueSeparatorMatrix,
    moveArrayItem: moveArrayItem,
    propertyisLogged: propertyisLogged
}
export default Utilities;