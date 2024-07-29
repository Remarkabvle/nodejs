const express = require("express");
const router = express.Router();
const { products } = require("../server");

router.get("/", (req, res) => {
    if (!products.length) {
        return res.status(400).json({
            msg: "No products found",
            variant: "error",
            payload: null,
        });
    }
    res.status(200).json({
        msg: "All Products",
        variant: "success",
        payload: products,
        total: products.length,
    });
});

router.post("/", (req, res) => {
    const existProduct = products.find(product => product.title === req.body.title);
    if (existProduct) {
        return res.status(400).json({
            msg: "Product already exists",
            variant: "warning",
            payload: null,
        });
    }

    const newProduct = {
        id: new Date().getTime(),
        ...req.body,
    };

    products.push(newProduct);

    res.status(201).json({
        msg: "Product created",
        variant: "success",
        payload: newProduct,
    });
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex < 0) {
        return res.status(400).json({
            msg: "Product not found",
            variant: "error",
            payload: null,
        });
    }

    products.splice(productIndex, 1);

    res.status(200).json({
        msg: "Product deleted",
        variant: "success",
        payload: null,
    });
});

router.put("/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex < 0) {
        return res.status(400).json({
            msg: "Product not found",
            variant: "error",
            payload: null,
        });
    }

    const updatedProduct = {
        id,
        ...req.body,
    };

    products[productIndex] = updatedProduct;

    res.status(201).json({
        msg: "Product updated",
        variant: "success",
        payload: updatedProduct,
    });
});

module.exports = router;
