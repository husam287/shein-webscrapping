const request = require('request');
const cheerio = require('cheerio');



/**
 * Get the product details; product name and price
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 */
exports.getDetails = async (req, res, next) => {
    let url = req.body.url;
    try {
        // get html after redirection
        const { newUrl, productName } = await redirect(url)
        
        request(newUrl, async (error, response, html) => {
            if (!error && response.statusCode == 200) {
                let price = extractPrice(html);
                //let correctedPrice = await getCurrencyDataAndCorrectThePrice(price);
                //correctedPrice = correctedPrice.toFixed(2);
                res.json({ productName: productName, price: price });
            }
        });
        
    } catch (error) {
        next(error)
    }
}

/**
 * get currency info from shein website
 * @param {number} price 
 * @returns promise have the corrected price
 */
function getCurrencyDataAndCorrectThePrice(price) {
    return myPromise = new Promise((resolve, reject) => {
        request.get('https://www.shein.com/getDefaultCurrency?_lang=en', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                let x = JSON.parse(response.body);
                const newPrice = x.info.currency.SAR.value * price;
                resolve(newPrice);
            }
            reject(error);
        })
    })

}

/**
 * load the initial url and get the real url of shein's product
 * @param {string} url 
 * @returns promise have the new url 
 */
function redirect(url = "") {

    let idValue = "";
    //console.log(url)

    let mypromise = new Promise((resolve, reject) => {
        request(url, (error, response, html) => {

            if (!error && response.statusCode == 200) {

                let idIndex = url.indexOf("id=") + 3;
                while (url[idIndex] != "&") {
                    idValue += url[idIndex];
                    idIndex++;
                }

                //extractInfo(html);
                const $ = cheerio.load(html);
                let title = $('title').text();

                const newUrl = "https://ar.shein.com/" + title.split(' ').join('-') + '-p-' + idValue + '.html';
                resolve({ newUrl: newUrl, productName: title });
            } else {
                reject(error);
            }

        });
    });

    return mypromise;
}


/**
 * 
 * @param {string} html 
 * @returns price of the product in url
 */
function extractPrice(html) {
    const theWholeString = html;
    const amountText = `"salePrice":{"amount":"`;
    const amountTextIndex = theWholeString.indexOf(amountText);
    const cuttedText = theWholeString.substr(amountTextIndex + amountText.length, 100);

    let priceTextIndex = 0;
    let price = "";

    while (cuttedText[priceTextIndex] != '"') {
        price += cuttedText[priceTextIndex].toString();
        priceTextIndex++;
    }
    return price;



}