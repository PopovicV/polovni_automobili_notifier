require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log('Connected to Database'));
//db.dropDatabase()

app.use(express.json());

const toyotaYarisRouter = require('./routes/yaris');
const toyotaAurisRouter = require('./routes/auris');
const hondaCivicRouter = require('./routes/civic');

app.use('/yaris', toyotaYarisRouter);
app.use('/auris', toyotaAurisRouter);
app.use('/civic', hondaCivicRouter);

app.listen(3000, () => console.log('Server Started'));
app.use(cors());

// Cars category ID = 26
// Honda brand ID = 114
// Toyota brand ID = 205
// Civic model ID = 1330
// Yaris model ID = 1969
// Auris model ID = 1933
