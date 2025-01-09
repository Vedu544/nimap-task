import db from "../config/db.js"

//fetch all categories info from category table
const getCategories = async (req,res)=>{
    try {
        const data  = await db.query("SELECT * FROM category")
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No categories found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch categories",
            error
        })
    }
}

const createCategory = async (req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(400).send({
                success: false,
                message: "Name field is required",
            })
        }
        const data  = await db.query('INSERT INTO category(name) VALUES (?)',[name])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Failed to create category",
            })
        }
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            data
        })
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch categories",
            error
        })
    }
}
const getCategory = async(req,res)=>{
    try {
        const categoryId = req.params.id
        if(!categoryId){
            return res.status(404).send({
                success: false,
                message: "Category id is required",
            })
        }
        const data  = await db.query('SELECT * FROM category WHERE id =?',[categoryId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No category found with this id",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category fetched successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch categories",
            error
        })
    }
}
const updateCategory = async (req,res)=>{
    try {
        const updateId = req.params.id
        if(!updateId){
            return res.status(404).send({
                success: false,
                message: "Category id is required",
            })
        }
        const {name} = req.body
        if(!name){
            return res.status(404).send({
                success: false,
                message: "Name field is required",
            })
        }
        const data  = await db.query('UPDATE category SET name =? WHERE id =?',[name,updateId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Failed to update category",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch categories",
            error
        })
    }
}

const deleteCategory = async (req,res)=>{
    try {
        const deleteId  = req.params.id
        if(!deleteId){
            return res.status(404).send({
                success: false,
                message: "Category id is required",
            })
        }
        //delete products which are related to this category
        const deleteProductsResult = await db.query('DELETE FROM products WHERE category_id = ?', [deleteId])
        // Check if any products were deleted
        if (deleteProductsResult.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "No products found for this category",
            })
        }
        const data  = await db.query('DELETE FROM category WHERE id=?',[deleteId])
        
        if(!data){
            return res.status(404).send({
                success: false,
                message: "Failed to delete category",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch categories",
            error
        })
    }
}
export {getCategories,createCategory,updateCategory,deleteCategory,getCategory}