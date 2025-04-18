import { Request, Response } from "express";
import { orderService } from "../services";

class orderController {
  public async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const { email, status } = req.query;
      const orders = await orderService.getAllOrders({
        email: email?.toString(),
        status: status?.toString(),
      });
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const order = await orderService.getOrderById(id);
      res.json(order);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id, status } = req.body;
      const updatedOrder = await orderService.updateOrder(id, status);
      res.json(updatedOrder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await orderService.deleteOrder(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new orderController();
