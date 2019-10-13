const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const URL = require('../models/Url');
const { validateBody, schemas } = require('../validations/shortUrlValidation');

// @route   POST /api/url/shorten
// @desc    Create a short URL

router.post('/shorten', validateBody(schemas.body), async (req,res) => {
    // var util = require('util')
    // console.log('Request : ' + util.inspect(req));
    const {longUrl} = req.body;
    const baseURL = config.get('baseURL');

    if(!validUrl.isUri(baseURL)){
        res.status = 401;
        res.json = 'Invalid URL'; 

        return res;
    }

    //Create URL code
    const urlCode = shortid.generate();

    //Check long URL is valid
    if(validUrl.isUri(longUrl)){
        try {
            let url = await URL.findOne({ longUrl });

            if(url){
                res.json(url);
            } else {
                const shortUrl = baseURL + '/' + urlCode;

                Url = new URL({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await Url.save();
                res.status(200).json(Url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }
    } else {
        res.status(400).json('Invalid long URL');
    }

});

module.exports = router;