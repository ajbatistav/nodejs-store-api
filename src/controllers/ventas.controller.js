
import { conn } from "../db.js";

export const getAllOrders = async(req,res)=>{
    try {
        const [rows] = await conn.query('SELECT * FROM ventas');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
};

export const getOrder = async (req,res)=>{
    const {id} = req.params;
    try {
        const [row] = await conn.query('SELECT * FROM ventas WHERE order_id=?',[id]);
        if (row.length <=0) return res.status(404).json({
            message: 'Order not found'
        });
    
        res.json(row);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
    
    
};


export const createOrder = async (req,res)=>{
    const {order_id, product_id, quantity} = req.body
    try {
        
        const [rows] = await conn.query('INSERT INTO ventas (order_id,product_id,quantity) VALUES(?,?,?)',
        [order_id, product_id, quantity])
        
        res.send({
            id: rows.insertId,
            order_id
            
        });

    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
};

export const deleteOrder = async (req,res)=>{
    try {
        const [result] = await conn.query('DELETE FROM ventas WHERE order_id=?',[req.params.id])

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Order not found'
        })

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
};

export const updateOrder = async (req,res) => {
    const id = req.params.id;
    const {order_id, product_id, quantity} = req.body;
    
    try {
        const [result] = await conn.query(
            'UPDATE ventas SET order_id = IFNULL(?, order_id), product_id = IFNULL(?, product_id), quantity = IFNULL(?,quantity) WHERE order_id=?'
            ,[order_id, product_id, quantity,id])
    
        if(result.affectedRows === 0) return res.status(404).json({
            message: "Order not found"
            
        })
    
        const [rows] = await conn.query('SELECT * FROM ventas WHERE order_id=?',[id])
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong'
        })
    }
}