import { Router } from "express";

import { validate } from "../middlewares";
import { OrderController } from "../controllers";
import {
  createValidationSchema,
  updateValidationSchema,
  deleteOrderValidationSchema,
  getOrderByIdValidationSchema,
} from "../validations";

const router = Router();

router.post(
  "/",
  [...createValidationSchema(), validate],
  OrderController.createOrder
);

router.patch(
  "/",
  [...updateValidationSchema(), validate],
  OrderController.updateOrder
);

router.get("/", OrderController.getAllOrders);

router.get(
  "/:id",
  [...getOrderByIdValidationSchema(), validate],
  OrderController.getOrderById
);

router.delete(
  "/:id",
  [...deleteOrderValidationSchema(), validate],
  OrderController.deleteOrder
);

export { router as orderRoutes };
