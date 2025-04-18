import { Model, DataTypes, Optional } from "sequelize";
import database from "../database/postgres";

export interface ProductOrderAttributes {
  id: number;
  orderId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface ProductOrderCreationAttributes
  extends Optional<ProductOrderAttributes, "id" | "total"> {}

class ProductOrder
  extends Model<ProductOrderAttributes, ProductOrderCreationAttributes>
  implements ProductOrderAttributes
{
  declare id: number;
  declare orderId: number;
  declare name: string;
  declare unitPrice: number;
  declare quantity: number;
  declare total: number;
}

ProductOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: database.sequelize,
    tableName: "ProductOrders",
    timestamps: false,
  }
);

ProductOrder.beforeCreate((product) => {
  product.total = product.unitPrice * product.quantity;
});

export default ProductOrder;
