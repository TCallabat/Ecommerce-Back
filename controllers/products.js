/**
 *
 */

const ProductsModel = require("../models/products");

const productController = {
    getHomeProductInDatabase: (req, res, next) => {
        ProductsModel.find({ filter: { $in: ["new", "top"] } })
            .then(data => res.status(200).json(data), console.log("Product get in database"))
            .catch(error => res.status(404).json({ error }));
    },

    getDetailProductInDatabase: (req, res, next) => {
        ProductsModel.find({ family: req.params.family, _id: req.params.id })
            .then(data => res.status(200).json(data), console.log("Product get in database"))
            .catch(error => res.status(404).json({ error }));
    },

    getProductInDatabase: (req, res, next) => {
        ProductsModel.find({ family: req.params.family })
            .then(data => res.status(200).json(data), console.log("Product get in database"))
            .catch(error => res.status(404).json({ error }));
    }
}

module.exports = productController;