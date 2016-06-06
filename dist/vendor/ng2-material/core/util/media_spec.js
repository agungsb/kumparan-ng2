"use strict";
var testing_1 = require('@angular/core/testing');
var media_1 = require('./media');
function main() {
    testing_1.describe('MediaService', function () {
        var smallQuery = media_1.Media.getQuery('sm');
        var largeQuery = media_1.Media.getQuery('lg');
        var m = null;
        testing_1.describe('listen', function () {
            testing_1.beforeEach(testing_1.inject([media_1.Media], function (media) {
                m = media;
            }));
            testing_1.it('should return a listener with the given query', function () {
                var listener = m.listen(smallQuery);
                testing_1.expect(listener.query).toBe(smallQuery);
                listener.destroy();
            });
            testing_1.it('should reference count and share matchMedia listeners with the same query', function () {
                testing_1.expect(m.cache[largeQuery]).toBe(undefined);
                var listener = m.listen(largeQuery);
                testing_1.expect(m.cache[largeQuery].references).toBe(1);
                var another = m.listen(largeQuery);
                testing_1.expect(m.cache[largeQuery].references).toBe(2);
                listener.destroy();
                testing_1.expect(m.cache[largeQuery].references).toBe(1);
                another.destroy();
                testing_1.expect(m.cache[largeQuery]).toBe(undefined);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=media_spec.js.map