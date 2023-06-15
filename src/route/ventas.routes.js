import { Router } from "express";

import { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } from "../controllers/ventas.controller.js";

const router = Router()

router.get("/ventas", getAllOrders);

router.get("/ventas/:id",getOrder);
 
router.post("/ventas",createOrder);

router.patch("/ventas/:id",updateOrder);

router.delete("/ventas/:id",deleteOrder);

export default router;