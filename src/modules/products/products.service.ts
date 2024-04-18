import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductsDto } from "src/dtos/products.dto";
import { CategoriesService } from "../categories/categories.service";
import { UpdateProductsDto } from "src/dtos/updateProducts.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  addProduct(product: ProductsDto) {
    return this.productsRepository.addProduct(product);
  }

  preloadProducts() {
    return this.productsRepository.preloadProducts();
  }

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  getProductByName(name?: string) {
    return this.productsRepository.getProductsByName(name);
  }

  async updateProduct(product: UpdateProductsDto, id: string) {
    return this.productsRepository.updateProduct(product, id);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
