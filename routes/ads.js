const express = require('express');
const router = express.Router();
const Ads = require('../models/ads');

router.get('/', async (req, res) => {
    try {
        const ads = await Ads.find();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

module.exports = router