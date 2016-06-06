"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("@angular/core");
var button_1 = require("./components/button/button");
var content_1 = require("./components/content/content");
var index_1 = require("./components/data-table/index");
var index_2 = require("./components/dialog/index");
var divider_1 = require("./components/divider/divider");
var icon_1 = require("./components/icon/icon");
var ink_1 = require("./components/ink/ink");
var validators_1 = require("./components/form/validators");
var messages_1 = require("./components/form/messages");
var list_1 = require("./components/list/list");
var peekaboo_1 = require("./components/peekaboo/peekaboo");
var switch_1 = require("./components/switch/switch");
var subheader_1 = require("./components/subheader/subheader");
var tabs_1 = require("./components/tabs/tabs");
var media_1 = require("./core/util/media");
var viewport_1 = require("./core/util/viewport");
var overlay_1 = require("@angular2-material/core/overlay/overlay");
var backdrop_1 = require("./components/backdrop/backdrop");
__export(require('./components/button/button'));
__export(require('./components/backdrop/backdrop'));
__export(require('./components/content/content'));
__export(require('./components/data-table/index'));
__export(require('./components/dialog/index'));
__export(require('./components/divider/divider'));
__export(require('./components/icon/icon'));
__export(require('./components/ink/ink'));
__export(require('./components/form/validators'));
__export(require('./components/form/messages'));
__export(require('./components/list/list'));
__export(require('./components/peekaboo/peekaboo'));
__export(require('./components/switch/switch'));
__export(require('./components/subheader/subheader'));
__export(require('./components/tabs/tabs'));
__export(require('./core/util/media'));
__export(require('./core/util/ink'));
__export(require('./core/util/viewport'));
__export(require('./core/util/animate'));
exports.MATERIAL_DIRECTIVES = [
    button_1.MdAnchor, button_1.MdButton,
    content_1.MdContent,
    index_1.MdDataTable, index_1.MdDataTableHeaderSelectableRow, index_1.MdDataTableSelectableRow,
    divider_1.MdDivider,
    backdrop_1.MdBackdrop,
    index_2.MdDialog, index_2.MdDialogActions, index_2.MdDialogTitle, index_2.MdDialogPortal,
    icon_1.MdIcon,
    ink_1.MdInk,
    validators_1.MdPatternValidator, validators_1.MdMaxLengthValidator,
    validators_1.MdMinValueValidator, validators_1.MdMaxValueValidator,
    validators_1.MdNumberRequiredValidator,
    messages_1.MdMessage, messages_1.MdMessages,
    list_1.MdList, list_1.MdListItem,
    peekaboo_1.MdPeekaboo,
    subheader_1.MdSubheader,
    switch_1.MdSwitch,
    tabs_1.MdTab, tabs_1.MdTabs
];
exports.MATERIAL_NODE_PROVIDERS = [
    core_1.provide(viewport_1.ViewportHelper, { useClass: viewport_1.NodeViewportHelper }),
    media_1.Media
].concat(validators_1.INPUT_VALIDATORS);
exports.MATERIAL_BROWSER_PROVIDERS = exports.MATERIAL_NODE_PROVIDERS.concat([
    core_1.provide(viewport_1.ViewportHelper, { useClass: viewport_1.BrowserViewportHelper }),
    core_1.provide(overlay_1.OVERLAY_CONTAINER_TOKEN, { useValue: overlay_1.createOverlayContainer() }),
]);
exports.MATERIAL_PROVIDERS = exports.MATERIAL_BROWSER_PROVIDERS;
//# sourceMappingURL=index.js.map