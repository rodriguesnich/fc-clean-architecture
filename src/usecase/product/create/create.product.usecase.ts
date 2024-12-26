import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    if (!input.name) {
      throw new Error("Name is required");
    }

    if (!input.price) {
      throw new Error("Price is required");
    }

    const product = ProductFactory.create(input.type, input.name, input.price);

    const result = new Product(product.id, product.name, product.price);

    await this.productRepository.create(result);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
