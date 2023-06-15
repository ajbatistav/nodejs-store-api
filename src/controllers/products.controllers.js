import { query } from "express";
import { conn } from "../db.js";


export const getAllProducts = async(req,res)=>{
    try {
        const [rows] = await conn.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
};

export const getProduct = async (req,res)=>{
    const {id} = req.params;
    try {
        const [row] = await conn.query('SELECT * FROM products WHERE id=?',[id]);
        if (row.length <=0) return res.status(404).json({
            message: 'Product not found'
        });
    
        res.json(row);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
    
    
};


export const createProduct = async (req,res)=>{
    const {product_id, name, description, brand, price, stock} = req.body
    try {
        
        const [rows] = await conn.query('INSERT INTO products (product_id,name,description,brand,price,stock) VALUES(?,?,?,?,?,?)',
        [product_id,name,description,brand, price, stock])
        
        res.send({
            id: rows.insertId,
            name,
            stock
        });

    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
};

export const deleteProduct = async (req,res)=>{
    try {
        const [result] = await conn.query('DELETE FROM products WHERE id=?',[req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Product not found'
        })

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
};

export const updateProduct = async (req,res) => {
    const id = req.params.id;
    const {product_id,name,description,brand,price,stock} = req.body;
    
    try {
        const [result] = await conn.query(
            'UPDATE products SET product_id = IFNULL(?, product_id), name = IFNULL(?,name), description = IFNULL(?,description), brand = IFNULL(?,brand), price = IFNULL(?,price), stock= IFNULL(?,stock) WHERE id=?'
            ,[product_id,name,description,brand,price,stock,id])
    
        if(result.affectedRows === 0) return res.status(404).json({
            message: "Product not found"
            
        })
    
        const [rows] = await conn.query('SELECT * FROM products WHERE id=?',[id])
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
}