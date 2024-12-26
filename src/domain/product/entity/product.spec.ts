import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product 1", 10);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("1", "", 10);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is zero", () => {
    expect(() => {
      let product = new Product("1", "Product 1", 0);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when price is negative", () => {
    expect(() => {
      let product = new Product("1", "Product 1", -10);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});
