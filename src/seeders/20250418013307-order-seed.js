"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const orders = [];

    for (let i = 0; i < 10; i++) {
      orders.push({
        clientName: faker.person.fullName(),
        clientEmail: faker.internet.email(),
        status: faker.helpers.arrayElement([
          "pending",
          "processing",
          "completed",
          "cancelled",
        ]),
        total: 0, // lo calcularemos después con los productos
        date: faker.date.recent(),
        createdAt: now,
        updatedAt: now,
      });
    }

    // Insertar órdenes
    await queryInterface.bulkInsert("Orders", orders);

    // Obtener las órdenes insertadas para asociar productos
    const insertedOrders = await queryInterface.sequelize.query(
      `SELECT id FROM "Orders" ORDER BY "id" DESC LIMIT ${orders.length};`
    );

    const productOrders = [];

    insertedOrders[0].forEach((order, i) => {
      const numProducts = faker.number.int({ min: 1, max: 5 });
      let orderTotal = 0;

      for (let j = 0; j < numProducts; j++) {
        const quantity = faker.number.int({ min: 1, max: 3 });
        const unitPrice = faker.number.int({
          min: 10,
          max: 500,
        });
        const total = quantity * unitPrice;
        orderTotal += total;

        productOrders.push({
          name: faker.commerce.productName(),
          unitPrice,
          quantity,
          total,
          orderId: order.id,
          createdAt: now,
          updatedAt: now,
        });
      }

      // Actualizar total de la orden
      orders[i].total = orderTotal;
    });

    // Volver a actualizar los totales de las órdenes (importante)
    for (let i = 0; i < orders.length; i++) {
      await queryInterface.bulkUpdate(
        "Orders",
        { total: orders[i].total },
        { id: insertedOrders[0][i].id }
      );
    }

    // Insertar productos
    await queryInterface.bulkInsert("ProductOrders", productOrders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductOrders", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
