import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(100);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product",
      price: 100,
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/product").send({
      type: "b",
      name: "Product 2",
      price: 200,
    });
    expect(response2.status).toBe(200);

    const response3 = await request(app).get("/product");
    expect(response3.status).toBe(200);
  });
});
