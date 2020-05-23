/**
 *
 */

const ProductsModel = require("../models/products");
const fs = require("fs");

const adminProductController = {
  postOneProductInDatabase: (req, res, next) => {
    const newProduct = new ProductsModel({
      ...req.body,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    newProduct.save()
      .then(data => res.status(200).json({ message: "Product post in database" }), console.log("Product post in database"))
      .catch(error => res.status(400).json({ error }));
  },

  /*
  postOneProductInDatabase: (req, res, next) => {
    const newProduct = new ProductsModel({
      ...req.body,
    });
    newProduct.save()
      .then(data => res.status(200).json({ message: "Product post in database" }), console.log("Product post in database"))
      .catch(error => res.status(400).json({ error }));
  },
*/

  getAllProductInDatabase: (req, res, next) => {
    ProductsModel.find({})
      .then(data => res.status(200).json(data), console.log("Product get in database"))
      .catch(error => res.status(404).json({ error }));
  },


  getOneProductInDatabase: (req, res, next) => {
    ProductsModel.findOne({ _id: req.params.id })
      .then(data => res.status(200).json(data), console.log("Product get in database"))
      .catch(error => res.status(404).json({ error }));
  },





  putOneProductInDatabase: (req, res, next) => {
    const newProduct = req.file ?
      {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    ProductsModel.updateOne({ _id: req.params.id }, { ...newProduct, _id: req.params.id })
      .then(data => res.status(200).json({ message: "Product put in database" }), console.log("Product put in database"))
      .catch(error => res.status(404).json({ error }));
  },


  /*
  putOneProductInDatabase: (req, res, next) => {
    ProductsModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(data => res.status(200).json({ message: "Product put in database" }), console.log("Product put in database"))
      .catch(error => res.status(404).json({ error }));
  },
*/

  deleteOneProductInDatabase: (req, res, next) => {
    ProductsModel.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.image.split('/public/')[1];
        fs.unlink(`images/${filename}`, () => {
          ProductsModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Product delete in database" }), console.log("Product delete in database"))
            .catch(error => res.status(404).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  },

  /*
    deleteOneProductInDatabase: (req, res, next) => {
      ProductsModel.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(data => res.status(200).json({ message: "roduct delete in database" }), console.log("Product delete in database"))
        .catch(error => res.status(404).json({ error }));
    },
  */

}

module.exports = adminProductController;