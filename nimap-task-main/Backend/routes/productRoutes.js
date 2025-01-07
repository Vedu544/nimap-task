import express from 'express';
import { getallprodcuts, getproductbypage, updateproducts, createProduct, deleteproducts, getProductById } from '../controllers/productsController.js';

const router  = express.Router();

// Route to get all products
router.get('/all', getallprodcuts);

// Route to get products by page
router.get('/page/:page', getproductbypage);

// Route to update a product
router.put('/update/:id', updateproducts);

// Route to create a new product
router.post('/create', createProduct);

// Route to delete a product
router.delete('/delete/:id', deleteproducts);

router.get('/product/:id',getProductById)



export default router;

