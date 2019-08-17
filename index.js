// const printThis = (process.argv)[2];
// console.log('process.argv', printThis);
// setInterval(console.log, 1700, printThis);

// "Real" application

import * as http from 'http';
import url from 'url';
import { router } from './lib/routes.js';
import environment from './config.js';
import { StringDecoder } from 'string_decoder';

const decoder = new StringDecoder('utf-8');

const server = http.createServer((req, res) => {

    /* Get some metadata */
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const query = parsedUrl.query;
    const headers = req.headers;

    let payload = '';

    req.on('data', (chunk) => {
        payload += decoder.write(chunk);
    });
    req.on('end', () => {
        payload += decoder.end();

        // get the correct routeHandler from the router

        const routeHandler = router[path][method] ? router[path][method] : router.notFoundHandler;

        // construct 'data' for the routeHandler callback function
        const data = {
            path: path,
            method: method,
            query: query,
            headers: headers,
            payload: payload
        };

        // call the handler with callBackFn

        routeHandler(data, function (httpStatusCode, responsePayload) {
            httpStatusCode = typeof httpStatusCode === 'number' ? httpStatusCode : 200;
            responsePayload = typeof responsePayload === 'object' ? responsePayload : {};

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(httpStatusCode);
            res.end(JSON.stringify(responsePayload));

            console.log('Response:\n', httpStatusCode, responsePayload);
        });
    });
});

server.listen(environment.port, function () {
    console.log('Listening on port ' + environment.port + ' in ' + environment.name.toUpperCase() + ' env.');
});