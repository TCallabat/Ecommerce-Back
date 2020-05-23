const express = require("express");
const router = express.Router();

const productController = require("../controllers/products");

router.get("/:family/:id", productController.getDetailProductInDatabase)
router.get("/:family", productController.getProductInDatabase)

router.get("/", productController.getHomeProductInDatabase)


module.exports = router;
