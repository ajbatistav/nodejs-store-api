import { Router } from "express";
import { getAllProducts,createProduct,deleteProduct, getProduct, updateProduct } from "../controllers/products.controllers.js";

const router = Router()

 router.get("/productos",getAllProducts);

 router.get("/productos/:id",getProduct);
 
 router.post("/productos",createProduct);
 
 router.patch("/productos/:id",updateProduct);

 router.delete("/productos/:id",deleteProduct);
 



export default router;