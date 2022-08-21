const Ads = require('../models/ads');
const axios = require('axios');
const Promise = require('promise')

const getAds = async function(brandID, modelID, pageID) {
    let url = 'https://www.polovniautomobili.com/json/v3/getAds?SortingType=1&category=26&brandID=' +brandID + '&modelID=' + modelID + '&pageID=' + pageID;
    console.log('URL: ', url);
    return axios
        .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            });
}
module.exports = {
    getAds
}