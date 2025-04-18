import { body, param } from "express-validator";

const validStatuses = ["pending", "processing", "completed", "cancelled"];

export const createValidationSchema = () => {
  return [
    body("clientName").notEmpty().withMessage("Client name is required"),

    body("clientEmail")
      .isEmail()
      .withMessage("A valid client email is required"),

    body("status").optional().isIn(validStatuses).withMessage("Invalid status"),

    body("products")
      .isArray({ min: 1 })
      .withMessage("Products must be a non-empty array"),

    body("products.*.name").notEmpty().withMessage("Product name is required"),

    body("products.*.unitPrice")
      .isFloat({ gt: 0 })
      .withMessage("Unit price must be a number greater than 0"),

    body("products.*.quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be an integer greater than 0"),
  ];
};

export const updateValidationSchema = () => {
  return [
    body("id")
      .isInt({ gt: 0 })
      .withMessage("Order ID must be a positive integer"),
    body("status").notEmpty().isIn(validStatuses).withMessage("Invalid status"),
  ];
};

export const getOrderByIdValidationSchema = () => {
  return [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Order ID must be a positive integer"),
  ];
};

export const deleteOrderValidationSchema = () => {
  return [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Order ID must be a positive integer"),
  ];
};
