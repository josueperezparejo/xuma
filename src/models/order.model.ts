import { Model, DataTypes, Optional } from "sequelize";
import database from "../database/postgres";
import ProductOrder from "./product.model";

export interface OrderAttributes {
  id: number;
  date: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
  clientName: string;
  clientEmail: string;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    "id" | "date" | "total" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public date!: Date;
  public status!: "pending" | "processing" | "completed" | "cancelled";
  public clientName!: string;
  public clientEmail!: string;
  public total!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    clientName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    clientEmail: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: database.sequelize,
    tableName: "Orders",
    modelName: "Order",
    timestamps: true,
    paranoid: true,
  }
);

Order.hasMany(ProductOrder, {
  foreignKey: "orderId",
  as: "products",
  onDelete: "CASCADE",
  hooks: true,
});

ProductOrder.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });

export default Order;
