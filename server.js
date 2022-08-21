require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log('Connected to Database'));
//db.dropDatabase()
//app.listen(3000, () => console.log('Server Started'));
app.use(cors());
app.use(express.json());

const toyotaYarisRouter = require('./routes/yaris');
const toyotaAurisRouter = require('./routes/auris');
const hondaCivicRouter = require('./routes/civic');
const adsRouter = require('./routes/ads');

app.use('/yaris', toyotaYarisRouter);
app.use('/auris', toyotaAurisRouter);
app.use('/civic', hondaCivicRouter);
app.use('/ads', adsRouter);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// Cars category ID = 26
// Honda brand ID = 114
// Toyota brand ID = 205
// Civic model ID = 1330
// Yaris model ID = 1969
// Auris model ID = 1933
