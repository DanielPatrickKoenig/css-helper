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
    DEFAULTS: {id: 0, options: DefaultOptions, label: 'Default Options'},
    STRING: {id: 1, label: 'String'},
    CSS_CLASS_UI: {id: 2, label: 'Composite'},
    PX: {id: 3, suffix: 'px', label: 'Pixels'},
    S: {id: 4, suffix: 's', label: 'Seconds'},
    PT: {id: 5, suffix: 'pt', label: 'Points'},
    EM: {id: 6, suffix: 'em', label: 'Emphemeral'},
    REM: {id: 7, suffix: 'rem', label: 'Relative Emphemeral'},
    IN: {id: 8, suffix: 'in', label: 'inches'},
    POSITION_OPTIONS: {id: 9, options: PositionOptions, label: 'Position Options'},
    DISPLAY_OPTIONS: {id: 10, options: DisplayOptions, label: 'Display Options'},
    GRADIENT_UI: {id: 11, tool: {}, label: 'Gradient Tool'},
    ANIMATION_DIRECTION_OPTIONS: {id: 12, options: AnimationDirectionOptions, label: 'Animation Direction Options'},
    ANIMATION_FILL_MODE_OPTIONS: {id: 13, options: AnimationFillModeOptions, label: 'Animation Fill Mode Options'},
    INTEGER: {id: 14, label: 'Integer'},
    PERCENT: {id: 15, suffix: '%', label: 'Percent'},
    ANIMATION_UI: {id: 16, tool: {}, label: 'Animation Tool'},
    VISIBILITY_OPTIONS: {id: 17, options: VisibilityOptions, label: 'Visibility Options'},
    ANIMATION_PLAY_STATE_OPTIONS: {id: 18, options: AnimationPlayStateOptoins, label: 'Animation Play State Options'},
    EASE_UI: {id: 19, tool: {}, label: 'Ease Tool'},
    COLOR_UI: {id: 20, tool: {}, label: 'Color Tool'},
    BACKGROUND_ATTACHMENT_OPTIONS: {id: 21, options: BackgroundAttachmentOptions, label: 'Background Attachment Options'},
    BACKGROUND_CLIP_OPTIONS: {id: 22, options: BackgroundClipOptions, label: 'Background Clip Ations'},
    BACKGROUND_POSITION_OPTIONS: {id: 23, options: BackgroundPositionOptions, label: 'Background Position Options'},
    BACKGROUND_REPEAT_OPTIONS: {id: 24, options: BackgroundRepeatOptions, label: 'Background Repeat Options'},
    BAKCGROUND_SIZE_OPPTIONS: {id: 25, options: BackgroundSizeOption, label: 'Background Size Options'},
    CM: {id: 26, suffix: 'cm', label: 'Centemeters'},
    BORDER_STYLE_OPTIONS: {id: 27, options: BorderStyleOptions, label: 'Border Style Options'},
    BORDER_IMAGE_REPEAT_OPTIONS: {id: 28, options: BorderImageRepeatOptions, label: 'Border Image Repeat Options'},
    DECIMAL: {id: 29, label: 'Decimal'},
    VH: {id: 30, suffix: 'vh', label: 'View Height'},
    VW: {id: 31, suffix: 'vw', label: 'View Width'},
    ATTRIBUTE: {id: 32, label: 'Attribute'},
    URL: {id: 33, label: 'URL'},
    CONTENT_OPTIONS: {id: 34, options: ContentOptions, label: 'Content Options'},
    ALIGN_CONTENT_OPTIONS: {id: 35, options: AlignContentOptions, label: 'Align Content Options'},
    ALIGN_ITEMS_OPTIONS: {id: 36, options: AlignItemsOptions, label: 'Align Items Options'},
    FLEX_DIRECTION_OPTIONS: {id: 37, options: FlexDirectionOptions, label: 'Flex Direction Options'},
    FLEX_WRAP_OPTIONS: {id: 38, options: FlexWrapOptionos, label: 'Flex Wrap Options'},
    JUSTIFY_CONTENT_OPTIONS: {id: 39, options: JustifyContentOptions, label: 'Justify Content Options'},
    PAGE_BREAK_INSIDE_OPTIONS: {id: 40, options: PageBreakInsideOptions, label: 'Page Break Options'},
    FONT_UI: {id: 41, tool: {}, label: 'Font Tool'},
    FONT_SIZE_OPTIONS: {id: 42, options: FontSizeOptions, label: 'Font Size Options'},
    FONT_STRETCH_OPTIONS: {id: 43, options: FontStretchOptions, label: 'Font Stretch Options'},
    FONT_STYLE_OPTIONS: {id: 44, options: FontStyleOptions, label: 'Font Style Options'},
    FONT_VARIANT_OPTIONS: {id: 45, options: FontVariantOptions, label: 'Font Variant Options'},
    FONT_WEIGHT_OPTIONS: {id: 46, options: FontWeightOptions, label: 'Font Weight Options'},
    LIST_STYLE_OPTIONNS: {id: 47, options: ListStyleOptions, label: 'Font Style Options'},
    LIST_TYPE_OPTIONS: {id: 48, options: ListTypeOptions, label: 'List Type Options'},
    COLUMN_FILL_OPTIONS: {id: 49, options: ColumnFillOptions, label: 'Column Fill Options'},
    LINE_WIDTH_OPTIONS: {id: 50, options: LineWidthOptions, label: 'Line Width Options'},
    COLUMN_SPAN_OPTION: {id: 51, options: ColumnSpanOptions, label: 'Column Span Options'},
    PAGE_BREAK_OPTIONS: {id: 52, options: PageBreakOptions, label: 'Page Break Options'},
    BORDER_COLLAPSE_OPTIONS: {id: 53, options: BorderCollapseOptions, label: 'Border Collapse Options'},
    CAPTION_SIDE_OPTIONS: {id: 54, options: CaptionSideOptions, label: 'Caption Side Options'},
    EMPTY_CELL_OPTIONS: {id: 55, options: EmptyCellOptions, label: 'Empty Cell Options'},
    TABLE_LAYOUT_OPTIONS: {id: 56, options: TableLayoutOptions, label: 'Table Layout Options'},
    DIRECTION_OPTIONS: {id: 57, options: DirectionOptions, label: 'Direction Options'},
    TEXT_ALIGN_OPTIONS: {id: 58, options: TextAlignOptions, label: 'Text Align Options'},
    TEXT_ALIGN_LAST_OPTIONS: {id: 59, options: TextAlignLastOptions, label: 'Text Align Last Options'},
    TEXT_DECORATION_OPTIONS: {id: 60, options: TextDecorationOptions, label: 'Text Decoration Options'},
    TEXT_DECORATION_STYLE_OPTIONS: {id: 61, options: TextDecorationStyleOptions, label: 'Text Decoration Style Options'},
    TEXT_JUSTIFY_OPTIONS: {id: 62, options: TextJustifyOptions, label: 'Text Justify Options'},
    TEXT_OPVERFLOW_OPTIONS: {id: 63, options: TextOverflowOptions, label: 'Text Overflow Options'},
    SHADOW_UI: {id: 64, tool: {}, label: 'Shadow Tool'},
    TEXT_TRANSFORM_OPTIONS: {id: 65, options: TextTransformOptions, label: 'Text Transform Options'},
    VERTICAL_ALIGN_OPTIONS: {id: 66, options: VerticalAlignOptions, label: 'Vertical Align Options'},
    WHITE_SPACE_OPTIONS: {id: 67, options: WhiteSpaceOptionns, label: 'White Space Options'},
    WORD_WRAP_OPTIONS: {id: 68, options: WordWrapOptions, label: 'Word Wrap Options'},
    WORD_BREAK_OPTIONS: {id: 69, options: WordBreakOptions, label: 'Word Break Options'},
    BACKFACE_VISIBILITY_OPTIONS: {id: 70, BackfaceVisibilityOptions, label: 'Backface Visibility Options'},
    TRANSFORM_UI: {id: 71, tool: {}, label: 'Transform Tool'},
    TRANSFORM_ORIGIN_UI: {id: 72, tool: {}, label: 'Transform Origin Tool'},
    TRANSFORM_STYLE_OPTIONS: {id: 73, options: TransformStyleOptions, label: 'Transform Style Options'},
    FLOAT_OPTIONS: {id: 74, options: FloatOptions, label: 'Float Options'},
    CLEAR_OPTIONS: {id: 75, options: ClearOptions, label: 'Clear Options'},
    OVERFLOW_OPTIONS: {id: 76, options: OverflowOptions, label: 'Overflow Options'},
    RESIZE_OPTIONS: {id: 77, options: ResizeOptions, label: 'Resize Optoins'},
    SHAPE_UI: {id: 78, tool: {}, label: 'Shape Tool'},
    CURSOR_OPTIONS: {id: 79, options: CursorOptions, label: 'Cursor Options'},
    BOX_SIZING_OPTIONS: {id: 80, options: BoxSizingOptions, label: 'Box Sizing Options'}
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

const Utilities = {
    createUniqueID: createUniqueID,
    getArrayIndexByValue: getArrayIndexByValue,
    PropertyValueTypes: PropertyValueTypes,
    getParameterByName: getParameterByName,
    getValueTypeByID: getValueTypeByID
}
export default Utilities;