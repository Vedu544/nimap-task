import db from "../config/db.js"

//get all prodcuts
const getallprodcuts = async(req,res)=>{
    try {
        const data = await db.query(' SELECT * FROM products')
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No products found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to fetch products",
            error
        })
    }
}

//get all products by page number
const getproductbypage = async(req,res)=>{
    console.log("function called")
    const page = parseInt(req.params.page) || 1; 
    console.log(page)
    const limit = 10; // Number of products per page
    const offset = (page - 1) * limit; // Calculate offset

    try {
        const data = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]); 
        if(!data || data.length === 0){ 
            return res.status(404).send({ 
                success: false, 
                message: "No products found", 
            }); 
        } 
        res.status(200).send({ 
            success: true, 
            message: "Products fetched successfully", 
            data 
        }); 
    } catch (error) { 
        console.log(error); 
        res.status(500).send({ 
            success: false, 
            message: "Failed to fetch products by page ", 
            error 
        }); 
    } 
}

const getProductById = async(req,res)=>{
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(400).send({
                success: false,
                message: "Product id is required",
            })
        }
        const data  = await db.query(`SELECT * FROM products WHERE id=?`,[productId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No product found with this id",
            })
        }
        res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to fetch product by id",
            error
        })
    }
}

const createProduct = async(req,res)=>{
    try {
        const { name, category, price, image} = req.body
        if(!name ||!category ||!price ||!image){
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            })
        }

        // Fetch category_id from the category table
        const categoryData = await db.query('SELECT id FROM category WHERE name = ?', [category]);
        if (!categoryData || categoryData.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid category",
            });
        }
        const category_id = categoryData[0][0].id; 
        console.log(category_id)

        const data = await db.query('INSERT INTO products (name, category_id, category, price, image) VALUES (?,?,?,?,?)',[name, category_id, category, price, image])
        if(!data){
            return res.status(500).send({
                success: false,
                message: "Failed to create product",
            })
        }
        res.status(201).send({
            success: true,
            message: "New Product created successfully",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to create product",
            error
        })
    }
}

//const update products
const updateproducts = async(req,res)=>{
    try {
        const updateId = req.params.id
        if(!updateId){
            return res.status(400).send({
                success: false,
                message: "Product id is required",
            })
        }
        const { name, category, price, image} = req.body
        if(!name ||!category ||!price ||!image){
            return res.status(400).send({
                success: false,
                message: "All fields are required for update product",
            })
        }
        
        // Determine category_id based on the category
        let category_id;
        switch (category.toLowerCase()) {
            case 'budget':
                category_id = 101;
                break;
            case 'premium':
                category_id = 102;
                break;
            case 'midrange':
                category_id = 103;
                break;
            case 'gaming':
                category_id = 104;
                break;
            default:
                return res.status(400).send({
                    success: false,
                    message: "Invalid category",
                });
        }

        const data = await db.query('UPDATE products SET name=?, category=?, category_id=?, price=?, image=? WHERE id=?',[name, category, category_id, price, image, updateId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No product found with this id",
            })
        }
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            data
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to update products",
            error
        })
    }
}

//const delete products

const deleteproducts = async(req,res)=>{
    try {
        const deleteId = req.params.id
        if(!deleteId){
            return res.status(400).send({
                success: false,
                message: "Product id is required",
            })
        }
        const data = await db.query('DELETE FROM products WHERE id=?',[deleteId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No product found with this id",
            })
        }

        // Decrease the ID of the next products
        await db.query('UPDATE products SET id = id - 1 WHERE id > ?', [deleteId]);

        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            data
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to delete products",
            error
        })
    }
}

export { getallprodcuts, getproductbypage, updateproducts, createProduct, deleteproducts, getProductById}
