/**
 * Assignment Fetcher
 *
 * @author Jared Allard <jaredallard@outlook.com>
 * @license MIT
 * @version 1.0.0
 **/

'use strict';

const https = require('https');
const url  = require('url')

let HOST,
    PORT;

// Check for docker container link.
let backend_string = process.env.BACKEND_1_PORT;
let backend_url    = url.parse(backend_string);

if(backend_string) {
  HOST = backend_url.hostname;
}

https.get({
   host: HOST || 'api.tritonjs.com',
   port: 443,
   path: '/v1/assignments/by-id/'+process.env.ASSIGNMENTID
}, response => {
   // Continuously update stream with data
   var body = '';
   response.on('data', function(d) {
       body += d;
   });

   response.on('end', function() {
     let o = JSON.parse(body);

     if(o.success === false) {
       process.exit(1);
     }

     process.stdout.write(o.data.info.repo);
   });
});
