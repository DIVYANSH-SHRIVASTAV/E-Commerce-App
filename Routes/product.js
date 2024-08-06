import express from "express";
import { addProducts, deleteProductById, getProductById, getProducts, updateProductById } from "../Controllers/product.js";
const router=express.Router();
//add products
router.post("/add",addProducts);
//get product
router.get('/all',getProducts);
//get product by id
router.get('/:id',getProductById);
//update product by id
router.put('/:id',updateProductById);
// delete product by id
router.delete('/:id',deleteProductById);
export default router;