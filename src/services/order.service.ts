import { Order, ProductOrder } from "../models";

import { LogRepository } from "../domain/repository/log.repository";

import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { LogEntity, LogLevelSeverity } from "../domain/entities/log.entity";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

const validTransitions: Record<string, string[]> = {
  pending: ["processing"],
  processing: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

class OrderService {
  constructor(
    private readonly fileSystemLogRepository: LogRepository,
    private readonly mongoLogRepository: LogRepository
  ) {}

  public async getAllOrders(filters: { email?: string; status?: string }) {
    try {
      const where: any = {};
      if (filters.email) where.clientEmail = filters.email;
      if (filters.status) where.status = filters.status;

      const orders = await Order.findAll({
        where,
        include: [
          {
            model: ProductOrder,
            as: "products",
          },
        ],
      });
      return orders;
    } catch (error) {
      this.log(
        LogLevelSeverity.high,
        `Failed to retrieve orders${
          filters ? ` with filters: ${JSON.stringify(filters)}` : ""
        }`
      );
      throw new Error("Error retrieving orders");
    }
  }

  public async getOrderById(id: number) {
    try {
      const order = await Order.findByPk(id, {
        include: [
          {
            model: ProductOrder,
            as: "products",
          },
        ],
      });
      if (!order) {
        this.log(LogLevelSeverity.high, `Order with ID ${id} not found`);

        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      this.log(LogLevelSeverity.high, `Failed to retrieve order with ID ${id}`);

      throw new Error(`Error retrieving order with ID ${id}`);
    }
  }

  public async createOrder(data: {
    clientName: string;
    clientEmail: string;
    status?: "pending" | "processing" | "completed" | "cancelled";
    date?: Date;
    products: {
      name: string;
      unitPrice: number;
      quantity: number;
    }[];
  }) {
    const transaction = await Order.sequelize!.transaction();

    try {
      const total = data.products.reduce((acc, product) => {
        return acc + product.unitPrice * product.quantity;
      }, 0);

      const newOrder = await Order.create(
        {
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          status: data.status ?? "pending",
          date: data.date ?? new Date(),
          total,
        },
        { transaction }
      );

      const productRecords = data.products.map((product) => ({
        orderId: newOrder.id,
        name: product.name,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
        total: product.unitPrice * product.quantity,
      }));

      await ProductOrder.bulkCreate(productRecords, { transaction });

      this.log(
        LogLevelSeverity.low,
        `Order created successfully with ID ${newOrder.id}`
      );

      await transaction.commit();

      const orderWithProducts = await Order.findByPk(newOrder.id, {
        include: [
          {
            model: ProductOrder,
            as: "products",
          },
        ],
      });

      return orderWithProducts;
    } catch (error) {
      await transaction.rollback();

      this.log(LogLevelSeverity.high, "Failed to create order");

      throw new Error("Failed to create order");
    }
  }

  public async updateOrder(
    id: number,
    newStatus: "pending" | "processing" | "completed" | "cancelled"
  ) {
    const order = await Order.findByPk(id);
    if (!order) {
      this.log(
        LogLevelSeverity.high,
        `Order with ID ${id} not found while trying to update`
      );

      throw new Error("Order not found");
    }

    if (order.status === "completed" || order.status === "cancelled") {
      this.log(
        LogLevelSeverity.medium,
        `Attempted to update a ${order.status} order with ID ${id}`
      );

      throw new Error("Cannot update a completed or cancelled order");
    }

    const allowed = validTransitions[order.status];

    if (!allowed?.includes(newStatus)) {
      this.log(
        LogLevelSeverity.medium,
        `Invalid status transition from ${order.status} to ${newStatus} for order ID ${id}`
      );

      throw new Error(
        `Invalid status transition from ${order.status} to ${newStatus}`
      );
    }

    order.status = newStatus as typeof order.status;
    await order.save();

    this.log(
      LogLevelSeverity.low,
      `Order ID ${id} status updated to ${newStatus}`
    );

    return order;
  }

  public async deleteOrder(id: number) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        this.log(
          LogLevelSeverity.high,
          `Order with ID ${id} not found while trying to delete`
        );

        throw new Error("Order not found");
      }

      await order.destroy();

      this.log(LogLevelSeverity.low, `Order ID ${id} deleted successfully`);
    } catch (error) {
      this.log(LogLevelSeverity.high, `Failed to delete order with ID ${id}`);
      throw new Error(`Failed to delete order with ID ${id}`);
    }
  }

  private log(level: LogLevelSeverity, message: string) {
    this.fileSystemLogRepository.saveLog(
      new LogEntity({ level, message, origin: "order.service.ts" })
    );

    this.mongoLogRepository.saveLog(
      new LogEntity({ level, message, origin: "order.service.ts" })
    );
  }
}

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);

export default new OrderService(fileSystemLogRepository, mongoLogRepository);
