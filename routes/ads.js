const express = require('express');
const router = express.Router();
const Ads = require('../models/ads');
const adsService = require("../services/ads");

router.get('/', async (req, res) => {
    try {
        const ads = await Ads.find();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.get('/init', async (req, res) => {
    const brandsModels = [
        {
            name: 'Toyota Yaris',
            brandId: 205,
            modelId: 1969,
        },
        {
            name: 'Toyota Auris',
            brandId: 205,
            modelId: 1933,
        },
        {
            name: 'Honda Civic',
            brandId: 114,
            modelId: 1330,
        },
        {
            name: 'Renault Clio',
            brandId: 192,
            modelId: 1812,
        },
    ];
    let response = {
        totalAds: 0,
        failed: 0,
        success: 0,
    };
    await Promise.all(brandsModels.map(async (brandModel) => {
        const result = await adsService.getAds(brandModel.brandId, brandModel.modelId, 1);
        response.totalAds += result.totalResults;
        let pageCount = Math.ceil(result.totalResults/25);
        for (let i = 1; i <= pageCount; i ++) {
            try {
                const result = await adsService.getAds(brandModel.brandId, brandModel.modelId, i);
                for (let i = 0; i < result.classifieds.length; i ++) {
                    let currentAd = result.classifieds[i];
                    let ad = new Ads({
                        adId: currentAd.AdID,
                        title: currentAd.title,
                        brand: currentAd.brandName,
                        model: currentAd.modelName,
                        url: 'https://www.polovniautomobili.com' + currentAd.url,
                        image: currentAd.photoLink[3],
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
                    try {
                        await tryToSaveAd(ad);
                        response.success += 1;
                    } catch (error) {
                        response.failed += 1;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }));
    res.json(response);
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