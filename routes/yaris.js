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

router.get('/init', async (req, res) => {

    await adsService.getAds(205, 1969, 1)
    .then(result => {
        console.log(result.totalResults);
        let pageCount = Math.ceil(result.totalResults/25);
        for (let i = 1; i <= pageCount; i ++) {
            adsService.getAds(205, 1969, i)
            .then(result => {
                for (let i = 0; i < result.classifieds.length; i ++) {
                    let currentAd = result.classifieds[i];
                    let ad = new Ads({
                        adId: currentAd.AdID,
                        title: currentAd.title,
                        brand: currentAd.brandName,
                        model: currentAd.modelName,
                        url: 'https://www.polovniautomobili.com' + currentAd.url,
                        city: currentAd.city,
                        price: currentAd.price,
                        mileage: currentAd.mileage,
                        power: currentAd.power,
                        horsePower: Math.round(currentAd.power * 1.341),
                        year: currentAd.year,
                        fuelType: currentAd.fuelType,
                        doornum: currentAd.doornum,
                        gearBox: currentAd.gearBox
                    });
                    const response = tryToSaveAd(ad);
                }
            }).catch(err => console.log('error:', err.message));
        }
        /* console.log(result.classifieds[0]);
        for (let i = 0; i < result.classifieds.length; i ++) {
            let currentAd = result.classifieds[i];
            let ad = new Ads({
                adId: currentAd.AdID,
                title: currentAd.title,
                brand: currentAd.brandName,
                model: currentAd.modelName,
                url: 'https://www.polovniautomobili.com' + currentAd.url,
                city: currentAd.city,
                price: currentAd.price,
                mileage: currentAd.mileage,
                power: currentAd.power,
                horsePower: Math.round(currentAd.power * 1.341),
                year: currentAd.year,
                fuelType: currentAd.fuelType,
                doornum: currentAd.doornum,
                gearBox: currentAd.gearBox
            });
            const response = tryToSaveAd(ad);
        } */
        
        res.json({message: 'Ads added to DB!'});
    }) 
    .catch(err => res.status(500).send(err));
})

const tryToSaveAd = async function (adObj) {
    try {
        let adsToBeSaved = [];
        
        const adIdQuery = await Ads.find({adId: adObj.adId}, (err, results) => {
            if (err) {
                console.log('Database error: ', err.message)
            } else {
                if (results.length === 0) {
                    constAdOtherParamsQuery = Ads.find({ brand: adObj.brand, model: adObj.model, title: adObj.title, mileage: adObj.mileage, price: adObj.price, city: adObj.city}, (err, results) => {
                        if (err) {
                            console.log('Database error: ', err.message)
                        } else {
                            if (results.length === 0) {
                                const newAd = adObj.save();
                            } else {
                                console.log('Reset oglasa!')
                            }
                        }
                    })
                } else {
                    console.log('Postoji vec oglas sa ovim ID-om!');
                }
            }
        })
    } catch (err) {
        console.log(err.message);
    }
}



module.exports = router