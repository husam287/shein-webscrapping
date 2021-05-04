const request = require('request');
const cheerio = require('cheerio');


exports.getDetails = (req, res, next) => {
    let url = req.body.url;
    let productName;
    redirect(url)
        .then(data => {
            const newUrl = data.newUrl;
            productName = data.productName;
            console.log(productName)
            request(newUrl, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    let price = extractPrice(html);
                    getCurrencyDataAndCorrectThePrice(price)
                        .then(price => {
                            const newPrice = price.toFixed(2);
                            res.json({ productName: productName, price: newPrice });
                        });
                }
            });
        })



}



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


function redirect(url = "") {

    let idValue = "";
    console.log(url)

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

                const newUrl = "https://www.shein.com/" + title.split(' ').join('-') + '-p-' + idValue + '.html';
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