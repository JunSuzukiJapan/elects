/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
import Calculator from '../src/calc';
describe('Calculator', () => {
    var subject;
    beforeEach(function () {
        subject = new Calculator();
    });
    describe('#add', () => {
        it('should add two numbers together', () => {
            var result = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});
