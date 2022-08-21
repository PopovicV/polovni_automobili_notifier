const express = require('express');
const router = express.Router();
const Ads = require('../models/ads');
const adsService = require('../services/ads');

router.get('/', async (req, res) => {
   try {
    const ads = await Ads.find({ brand: 'Toyota', model: 'Yaris' });
    res.json(ads);
   } catch (err) {
    res.status(500).json({ message: err.message })
   }
});

router.delete('/:id', (req, res) => {

})

module.exports = router