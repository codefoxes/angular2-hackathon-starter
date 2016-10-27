// the polyfills must be the first thing imported in node.js
import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
const mongoose = require('mongoose');

require('dotenv').config();

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { config } from './server/config';
var cache = require('memory-cache');
import { MainModule } from './main.node';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const routeGroup = require('./server/routes/group');
const apiRoutes  = require('./server/routes/api');

app.set('superSecret', config.secret);

// Connect to database.
mongoose.Promise = global.Promise;
mongoose.connect(config.db);
mongoose.connection.on('connected', () => { console.log('MongoDB connected'); });

// Express View
app.engine('.html', createEngine({
    precompile: true,
    ngModule: MainModule
}));
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).json({ status: 400, message: 'Invalid Request' });
        res.end();
    }
});

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));

function ngApp(req, res) {
    let url = req.originalUrl || '/';
    let html = cache.get( url );

    res.setHeader('Cache-Control', 'public, max-age=30');

    if ( html ){
        res.status(200).send(html);
        return;
    } else {
        res.render('index', {
            req,
            res,
            preboot: false,
            baseUrl: '/',
            requestUrl: req.originalUrl,
            originUrl: 'http://localhost:3000'
        }, (err, html) => {
            res.status(200).send(html);
            cache.put(url, html);
        });
    }
}
// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', ngApp);
app.get('/page', ngApp);
app.get('/login', ngApp);

app.use('/api/', apiRoutes);

app.get('*', (req, res) => {
    res.status(404).json({ status: 404, message: 'No Content' });
});

// Server
let server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
});
