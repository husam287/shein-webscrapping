# shein scrapping

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Notes](#notes)

## About <a name = "about"></a>

Shein website scrapping is a mini server which helps in getting a product name and its price **[IN SAR CURRENCEY ONLY]** from a link shared by shein's mobile application.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing
1) First, you must download the repo in your local machine.

2) Make sure you have the latest version of [Node.js](https://nodejs.org/en/) in your machine.

3) Navigate to this repo that you have downloaded.

4) Open terminal and type:
    ```bash
        npm install
    ```

5) Let's start the server
    ```bash
        npm start
    ```

## Usage <a name = "usage"></a>

## APIS ##
**GET PRODUCT NAME & PRICE**
- Link
    http://localhost:8080/api/shein/get

- Method
    POST

- Request body
    {
        "url":"https://api-shein.shein.com/h5/sharejump/appsharejump?lan=en&share_type=goods&site=andshother&localcountry=other&currency=EGP&id=4655532&url_from=GM7181084488857100288"
    }

- Response
    {
        "productName": "Cartoon Print Drop Shoulder Sweatshirt",
        "price": "45.00"
    }

## How to get the url ##
![Shein Application Product Link](https://i.imgur.com/9CZz0nD.gif)


## Notes <a name = "notes"></a>
* How ever the currency and the language of shein application which used to get the url, the responsed price will be always in **SAR currencey**

* You can use [Postman](https://www.postman.com/) to call the api