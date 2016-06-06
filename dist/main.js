"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var overlay_1 = require("@angular2-material/core/overlay/overlay");
var _1 = require('./app/');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.KumparanNg2AppComponent, [overlay_1.OVERLAY_PROVIDERS]);
//# sourceMappingURL=main.js.map