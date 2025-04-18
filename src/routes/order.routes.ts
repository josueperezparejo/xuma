import { Router } from "express";

import { validate } from "../middlewares";
import { orderController } from "../controllers";
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
  orderController.createOrder
);

router.patch(
  "/",
  [...updateValidationSchema(), validate],
  orderController.updateOrder
);

router.get("/", orderController.getAllOrders);

router.get(
  "/:id",
  [...getOrderByIdValidationSchema(), validate],
  orderController.getOrderById
);

router.delete(
  "/:id",
  [...deleteOrderValidationSchema(), validate],
  orderController.deleteOrder
);

export { router as orderRoutes };
