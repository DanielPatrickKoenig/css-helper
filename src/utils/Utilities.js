import {mapState} from 'vuex';

function createUniqueID () {
    return 'sig-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join('') + '-' + Math.random().toString().split('.').join('');
}

function mappedState (){
    return mapState(['propertyManifest', 'ready']);
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
function addToClipboard(element){
    element.select();
    element.setSelectionRange(0, 99999);
    document.execCommand('copy');
    element.blur();
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
const TextDecorationOptions = ['underline', 'overline', 'line-through', 'blink', 'none'];
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
    DEFAULTS: {id: 0, options: DefaultOptions, label: 'Other', rep: DataReps.TOOL},
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

const FontList = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Verdana'
];

const TransformFunctions = {
    matrix: [{type: DataReps.NUMBER, suffix: [], repeats: 6, labels: ['a', 'b', 'c', 'd', 'tx', 'ty']}],
    translate: [{type: DataReps.NUMBER, suffix: ['px', '%', 'em'], repeats: 2, labels: ['x', 'y']}],
    translateX: [{type: DataReps.NUMBER, suffix: ['px', '%', 'em'], repeats: 1}],
    translateY: [{type: DataReps.NUMBER, suffix: ['px', '%', 'em'], repeats: 1}],
    scale: [{type: DataReps.NUMBER, suffix: [], repeats: 2, labels: ['x', 'y']}],
    scaleX: [{type: DataReps.NUMBER, suffix: [], repeats: 1}],
    scaleY: [{type: DataReps.NUMBER, suffix: [], repeats: 1}],
    rotate: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 1}],
    skew: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 2, labels: ['x', 'y']}],
    skewX: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 1}],
    skewY: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 1}],
    matrix3d: [{type: DataReps.NUMBER, suffix: [], repeats: 16}],
    translate3d: [{type: DataReps.NUMBER, suffix: ['px', '%', 'em'], repeats: 2, labels: ['x', 'y']}, {type: DataReps.NUMBER, suffix: [], repeats: 1, labels: ['z']}],
    translateZ: [{type: DataReps.NUMBER, suffix: [], repeats: 1}],
    scale3d: [{type: DataReps.NUMBER, suffix: [], repeats: 3, labels: ['x', 'y', 'z']}],
    scaleZ: [{type: DataReps.NUMBER, suffix: [], repeats: 1}],
    rotate3d: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 3, labels: ['x', 'y', 'z']}],
    rotateX: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 1}],
    rotateY: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 1}],
    rotateZ: [{type: DataReps.TOOL, suffix: ['deg', 'turn'], repeats: 1}],
    perspective: [{type: DataReps.NUMBER, suffix: [], repeats: 1}]
};

/*
<matrix()> = matrix( <number>#{6} )
<translate()> = translate( <length-percentage> , <length-percentage>? )
<translateX()> = translateX( <length-percentage> )
<translateY()> = translateY( <length-percentage> )
<scale()> = scale( <number> , <number>? )
<scaleX()> = scaleX( <number> )
<scaleY()> = scaleY( <number> )
<rotate()> = rotate( [ <angle> | <zero> ] )
<skew()> = skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )
<skewX()> = skewX( [ <angle> | <zero> ] )
<skewY()> = skewY( [ <angle> | <zero> ] )
<matrix3d()> = matrix3d( <number>#{16} )
<translate3d()> = translate3d( <length-percentage> , <length-percentage> , <length> )
<translateZ()> = translateZ( <length> )
<scale3d()> = scale3d( <number> , <number> , <number> )
<scaleZ()> = scaleZ( <number> )
<rotate3d()> = rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )
<rotateX()> = rotateX( [ <angle> | <zero> ] )
<rotateY()> = rotateY( [ <angle> | <zero> ] )
<rotateZ()> = rotateZ( [ <angle> | <zero> ] )
<perspective()> = perspective( <length> )
*/

const GradientTypes = {
    LINEAR: 'linear-gradient',
    RADIAL: 'radial-gradient'
};

const PositionDirectives = {
    CENTER: 'center',
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CLOSEST_SIDE: 'closest-side',
    PERCENTAGE: 'percentage'

}

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

function propertyisLogged(scope, name, sindex, composited){
    let logged = false;
    let dispatchPayload = [];
    if(scope.$store.state.selectorPropertyMatrix[scope.$store.state.selectorList[sindex]]){
        if(scope.$store.state.selectorPropertyMatrix[scope.$store.state.selectorList[sindex]].css){
            if(scope.$store.state.selectorPropertyMatrix[scope.$store.state.selectorList[sindex]].css[name]){
                logged = true;
            }
            else{
                if(!composited){
                    dispatchPayload = [scope.$store.state.selectorList[sindex], 'css', name]; 
                }
            }
        }
        else{
            dispatchPayload = [scope.$store.state.selectorList[sindex], 'css']; 
        }
    }
    else{
        dispatchPayload = [scope.$store.state.selectorList[sindex]]; 
    }
    scope.$store.dispatch('setPropertyMatrixValue', dispatchPayload);
    return logged;
}

function hasPropertyTypeList(scope, name){
    // console.log('mapped state = ', scope.$store);
    // return mappedState().propertyManifest[name].sub_properties || mappedState().propertyManifest[name].value_max;
    return scope.$store.state.propertyManifest[name].sub_properties || scope.$store.state.propertyManifest[name].value_max;
}

function startTypeLog(scope, name, sindex){
    if(!scope.$store.state.selectorTypeMatrix[scope.$store.state.selectorList[sindex]]){
        scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[sindex]]);
    }
    if(!scope.$store.state.selectorTypeMatrix[scope.$store.state.selectorList[sindex]].type){
        scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[sindex], 'type']);
    }
    if(!scope.$store.state.selectorTypeMatrix[scope.$store.state.selectorList[sindex]].type[name]){
        scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[sindex], 'type', name]);
    }
}

function addToTypeLog(scope, name, index, sindex, value){
    startTypeLog(scope, name, sindex);
    if(hasPropertyTypeList(scope, name)){
        if(!scope.$store.state.selectorTypeMatrix[scope.$store.state.selectorList[sindex]].type[name]['type_'+index.toString()]){
            scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[sindex], 'type', name, 'type_'+index.toString()]);
        }
        scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[sindex], 'type', name, 'type_'+index.toString(), value]);
    }
    else {
        scope.$store.dispatch('setTypeMatrixValue', [scope.$store.state.selectorList[sindex], 'type', name, value]);
    }

}

function colorStringToRGB(color){
    let output = {};
    if(color.split('#').length > 1){
        const aRgbHex = color.split('#').join('').match(/.{1,2}/g);
        output = {
            r: parseInt(aRgbHex[0], 16),
            g: parseInt(aRgbHex[1], 16),
            b: parseInt(aRgbHex[2], 16)
        };
    }
    else if(color.split('(').length > 1){
        const rgbList = color.split(' ').join('').split('(')[1].split(')')[0].split(',');
        output = {
            r: Number(rgbList[0]),
            g: Number(rgbList[1]),
            b: Number(rgbList[2])
        };
    }
    return output;
}

const Animatables = [
    'color',
    'background-color',
    'opacity',
    'padding',
    'padding-left',
    'padding-right',
    'padding-top',
    'padding-bottom',
    'width',
    'height',
    'left',
    'top',
    'right',
    'bottom',
    'margin',
    'margin-left',
    'margin-right',
    'margin-top',
    'margin-bottom'
];

const Templates = {
    default: {
        id: 'default',
        label: 'Choose a template',
        html: '<div>Div element</div>',
        selectors: ['div']
    },
    'record-list': {
        id: 'record-list',
        label: 'Record List',
        excercises: {
            selector: ['div', 'li:nth-child(odd)', 'li:nth-child(even) > button.delete-btn', 'button:not(.delete-btn)', 'ul label, ul .edit-btn'],
            property: [],
        },
        html: `<div id="record_list_header">
    <label class="record-list-label">List of records</label>
</div>
<ul id="records">
    <li class="record">
        <input type="checkbox" />
        <label>
            Item one
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item two
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item three
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item four
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item five
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item six
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
</ul>
<div id="record_list_footer">
    <button>Add</button>
</div>`,
        selectors: ['ul', 'ul > li', 'ul > li > label', 'ul > li > button']
    },
    header: {
        id: 'header',
        label: 'Header',
        html: `<header>
    <img width="50" src="http://css-training-wheels.com/CSS_TrainingWheel_02.svg" />
    <h1>Company Name</h1>
    <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">FAQ</a>
    </nav>
</header>`,
        selectors: ['header', 'header > img', 'header > h1', 'header > nav', 'header > nav > a']
    },
    button: {
        id: 'button',
        label: 'Button',
        html: '<button>OK</button>',
        selectors: ['button']
    },
    link: {
        id: 'link',
        label: 'Link',
        html: '<a href="#">Click here</a>',
        selectors: ['a']
    },
    headlines_and_copy: {
        id: 'headlines_and_copy',
        label: 'Headlines and Copy',
        html: `<h1>Lorem Ipsum</h1>
<h2>What is Lorem Ipsum?</h2>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
<h2>Where does it come from?</h2>
<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
<h2>Why do we use it?</h2>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
<h2>Where can I get some?</h2>
<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>`,
        selectors: ['h1', 'h2', 'p']
    },
    paragraph_and_image: {
        id: 'paragraph_and_image',
        label: 'Paragraph and image',
        html: `<img width="100" class="logo" src="http://css-training-wheels.com/CSS_TrainingWheel_02.svg">
<p class="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        selectors: ['p', 'img']
    },
    form: {
        id: 'form',
        label: 'Form',
        html: `<form>
    <p>Sign up</p>
    <label>
        <span>
            First Name
        </span>
        <input type="text" />
    </label>
    <label>
        <span>
            Last Name
        </span>
        <input type="text" />
    </label>
    <label>
        <span>
            Email
        </span>
        <input type="text" />
    </label>
    <label>
        <span>
            Email
        </span>
        <input type="text" />
    </label>
    <label>
        <span>
            Password
        </span>
        <input type="password" />
    </label>
    <label>
        <span>
            Confirm Password
        </span>
        <input type="password" />
    </label>
    <label>Gender</label>
    <ul>
        <li>
            <label>
                <input type="radio" />
                <span>
                    Male
                </span>
            </label>
        </li>
        <li>
            <label>
                <input type="radio" />
                <span>
                    Female
                </span>
            </label>
        </li>
    </ul>
    <label>
        <input type="checkbox" />
        <span>
            I agree to the <a href="#">terms and conditions</a>
        </span>
    </label>
    <input type="submit"/>
</form>`,
        selectors: ['form', 'form label', 'form input[type="text"]', 'form input[type="checkbox"]', 'form input[type="radio"]', 'form input[type="password"]', 'form input[type="submit"]', 'form ul', 'form ul li', 'form a']
    },
    animation: {
        id: 'animation',
        html: `<div class="outer" style="width:20px;height:20px;position:absolute;">
    <div class="inner" style="width:100%;height:100%;position:absolute;background-color:grey;">
    </div>
</div>`,
        selectors: ['.outer', '.inner']
    },
    flex: { // http://css-training-wheels.com/#/property?names=margin,padding,height,width,flex-direction,justify-content,flex-wrap,display&template=flex
        id: 'flex',
        html: `<div id="record_list_header">
    <label class="record-list-label">List of records</label>
</div>
<ul id="records">
    <li class="record">
        <input type="checkbox" />
        <label>
            Item one
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item two
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item three
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item four
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item five
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
    <li class="record">
        <input type="checkbox" />
        <label>
            Item six
        </label>
        <button class="btn edit-btn">
            Edit
        </button>
        <button class="btn delete-btn">
            Delete
        </button>
    </li>
</ul>
<div id="record_list_footer">
    <button>Add</button>
</div>`,
        selectors: ['ul', 'ul > li']
    }
}

const Videos = {
    selectors: {
        title: 'Selectors',
        description: 'A video course on creating CSS selectors.',
        playlist: 'https://www.youtube.com/watch?v=V7SduSIv5Rw&list=PLWbNYR6IUzO4vxqjoJCg8wsqdftxIaWcw',
        embedables: [
            {name: 'Intro to Selectors', video: 'https://www.youtube.com/embed/V7SduSIv5Rw'},
            {name: 'Operators', video :'https://www.youtube.com/embed/ooFH-sPkd08'},
            {name: 'Classes and IDs', video: 'https://www.youtube.com/embed/GJg8zkAPCOw'},
            {name: 'Attributes', video: 'https://www.youtube.com/embed/nCH5WddepNM'},
            {name: 'Pseudo Classes - Part 1', video: 'https://www.youtube.com/embed/GTr1cumZExE'},
            {name: 'Pseudo Classes - Part 2', video: 'https://www.youtube.com/embed/QTn1-hkgoQA'},
            {name: 'What&#39;s Next?', video: 'https://www.youtube.com/embed/zjZLUYEyBOE'}
        ]
    },
    properties_beginners: {
        title: 'Properties: Basic Concepts',
        description: 'The first of three courses on setting CSS properties.',
        playlist: 'https://www.youtube.com/watch?v=BjEYsbKJUyM&list=PLWbNYR6IUzO5HmEV1Sj-BoJaPqp0-NGVK',
        embedables: [
            {name: 'Intro to CSS Properties', video: 'https://www.youtube.com/embed/BjEYsbKJUyM'},
            {name: 'Margin and Padding', video :'https://www.youtube.com/embed/KT69t6XqGqE'},
            {name: 'The Display Property', video: 'https://www.youtube.com/embed/9IM7g9CdLwE'},
            {name: 'The Position Property', video: 'https://www.youtube.com/embed/gKJq-6PXbsA'},
            {name: 'Flex', video: 'https://www.youtube.com/embed/csfCAZ6yf90'},
            {name: 'Text Part 1', video: 'https://www.youtube.com/embed/B5ePrItmA6k'},
            {name: 'Text Part 2', video: 'https://www.youtube.com/embed/yfWx8VVUQ_U'},
            {name: 'What&#39;s Next?', video: 'https://www.youtube.com/embed/pJ8rps18sI0'}
        ]
    },
    // properties_intermediate: {
    //     title: 'Properties: Intermediate Concepts',
    //     description: 'The second of three courses on setting CSS properties.'
    // },
    // properties_advanced: {
    //     title: 'Properties: Advanced Concepts',
    //     description: 'The last of three courses on setting CSS properties.'
    // }
}

const MessageCodes = {
    ACCESS_EDITOR: 'fai:code',
    EMPTY_EDITOR: 'fai:nocode',
    ACCESS_SEARCH: 'fai:search'
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
    propertyisLogged: propertyisLogged,
    startTypeLog: startTypeLog,
    addToTypeLog: addToTypeLog,
    hasPropertyTypeList: hasPropertyTypeList,
    colorStringToRGB: colorStringToRGB,
    GradientTypes: GradientTypes,
    PositionDirectives: PositionDirectives,
    TransformFunctions: TransformFunctions,
    mappedState: mappedState,
    FontList: FontList,
    Animatables: Animatables,
    Templates: Templates,
    addToClipboard: addToClipboard,
    MessageCodes: MessageCodes,
    Videos: Videos
}
export default Utilities;