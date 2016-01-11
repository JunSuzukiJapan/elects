/// <reference path="../typings/tsd.d.ts" />

import chai = require('chai');
import Translator from '../src/html/ts/translator';

const should = chai.should();
const subject = new Translator('./translate.secret');

describe('Translator', () => {
    describe('#"translate"', () =>{
        it('"Hello" to "こんにちは"', (done) => {
            subject.translate('Hello', 'en', 'ja',  (translated) => {
                translated.should.equal('こんにちは');
                done();
            });
        });
    });
});
