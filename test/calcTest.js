/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
var calc_1 = require('../src/calc');
describe('Calculator', function () {
    var subject;
    beforeEach(function () {
        subject = new calc_1["default"]();
    });
    describe('#add', function () {
        it('should add two numbers together', function () {
            var result = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});
