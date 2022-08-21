const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    adId: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    mileage: {
        type: Number,
        required: false
    },
    power: {
        type: Number,
        required: false
    },
    horsePower: {
        type: Number,
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    fuelType: {
        type: String,
        required: false
    },
    doornum: {
        type: String,
        required: false
    },
    gearBox: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('ads', adsSchema)