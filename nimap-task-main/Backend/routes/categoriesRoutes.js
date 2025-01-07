import express from 'express';

const router = express.Router()

import { createCategory, getCategories, updateCategory,deleteCategory, getCategory } from '../controllers/categoriesController.js';

router.get('/',getCategories)
router.post('/create', createCategory)
router.put('/update/:id',updateCategory)
router.delete('/delete/:id',deleteCategory)
router.get('/category/:id',getCategory)

export default router;
