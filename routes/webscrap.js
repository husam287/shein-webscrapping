const router = require("express").Router();
const controller = require("../controllers/webscrap");


router.post('/get',controller.getDetails);

module.exports = router;