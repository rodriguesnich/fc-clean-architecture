import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Product",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    let localInput = { ...input };
    localInput.name = "";

    await expect(productCreateUseCase.execute(localInput)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);


    let localInput = { ...input };
    localInput.price = 0;

    await expect(productCreateUseCase.execute(localInput)).rejects.toThrow(
      "Price is required"
    );
  });

  it("should thrown an error when type is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);


    let localInput = { ...input };
    localInput.type = "";

    await expect(productCreateUseCase.execute(localInput)).rejects.toThrow(
      "Product type not supported"
    );
  });
  
  it("should thrown an error when price is less than 0 and name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    let localInput = { ...input };
    localInput.price = -1;
    localInput.name = "";

    await expect(productCreateUseCase.execute(localInput)).rejects.toThrow(
      "Name is required"
    );
  });

});
