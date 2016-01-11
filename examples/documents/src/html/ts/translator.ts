/// <reference path="../../../typings/tsd.d.ts" />

import http = require('http');
import https = require('https');
import qs = require('querystring');
import fs = require('fs-extra');

export default class Translator {
    private client_id: string;
    private client_secret: string;

    constructor(filename: string = '../../../translate.secret'){
        const json = fs.readJsonSync(filename);
        this.client_id = json['client-id'];
        this.client_secret = json['client-secret'];
    }

    private getAccessToken(callback) {
        var body = '';
        const req: http.ClientRequest = https.request({
            host: 'datamarket.accesscontrol.windows.net',
            path: '/v2/OAuth2-13',
            method: 'POST'
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                const resData = JSON.parse(body);
                callback(resData.access_token);
            });
        }).on('error', (err) => {
            console.log(err);
        });
        const data = {
            'client_id': this.client_id,
            'client_secret': this.client_secret,
            'scope': 'http://api.microsofttranslator.com',
            'grant_type': 'client_credentials'
        };

        req.write(qs.stringify(data));
        req.end();
    }

    private translate_main(token:string, text:string, from_lang:string, to_lang:string, callback ){
        const options = "text=" + qs.escape(text) +
                        "&from=" + from_lang +
                        "&to=" + to_lang +
                        "&oncomplete=callback";

        const request_options = {
            host: 'api.microsofttranslator.com',
            path: '/V2/Ajax.svc/Translate?' + options,
            method: 'GET',
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };

        const req = https.request(request_options, (res) => {
            var body = '';
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                // body の中身は "callback(translated_text)"　という形になっているはず。
                text = body.replace('callback("', '').replace(/"\);$/, '');
                //eval(body);
                callback(text);
            });
        });
        req.on('error', (e) => {
            console.log(e.message);
        });
        req.end();
    }

    translate(text:string, from_lang:string, to_lang:string, callback: (result:string) => void){
        this.getAccessToken((token) => {
            this.translate_main(token, text, from_lang, to_lang, callback);
        });
    }
}
