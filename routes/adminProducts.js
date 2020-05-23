const express = require("express");
const router = express.Router();

const multer = require("../middlewares/multer-config");

const adminProductController = require("../controllers/adminProducts");

router.get("/all/", adminProductController.getAllProductInDatabase)
router.post("/id/", multer, adminProductController.postOneProductInDatabase);
router.get("/id/:id", adminProductController.getOneProductInDatabase)
router.put("/id/:id", multer, adminProductController.putOneProductInDatabase)
router.delete("/id/:id", adminProductController.deleteOneProductInDatabase)

module.exports = router;
