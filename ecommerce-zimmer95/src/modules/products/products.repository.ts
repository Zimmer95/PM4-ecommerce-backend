import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProductsDto } from "src/dtos/updateProducts.dto";
import { ProductsDto } from "src/dtos/products.dto";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import { CategoriesService } from "../categories/categories.service";

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @Inject("ProductsData")
    private data
  ) {}

  async addProduct(product: ProductsDto) {
    const duplicatedProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });

    if (duplicatedProduct) {
      throw new Error(`Product ${product.name} is already in the database.`);
    }

    const category = await this.categoriesRepository.findOne({
      where: { name: product.category },
    });

    if (!category) {
      throw new Error(
        `Categoría no encontrada para el producto ${product.name}`
      );
    }
    console.log(category.id);

    const newProduct = new Products();
    newProduct.categories = category;
    newProduct.imgUrl = product.imgUrl;
    newProduct.name = product.name;
    newProduct.stock = product.stock;
    newProduct.price = product.price;
    newProduct.description = product.description;
    const savedProduct = await this.productsRepository.save(newProduct);

    return savedProduct;
  }

  async preloadProducts(): Promise<ProductsDto[]> {
    const products = this.data.map(async (productData) => {
      const category = await this.categoriesRepository.findOne({
        where: { name: productData.category },
      });

      if (!category) {
        throw new Error(
          `Categoría no encontrada para el producto ${productData.name}`
        );
      }

      productData.categories = category;
      const newProduct = this.productsRepository.create(productData);

      return await this.productsRepository.save(newProduct);
    });

    return Promise.all(products);
  }

  async getProducts() {
    return await this.productsRepository.find({
      relations: ["files"],
    });
  }

  async getProductById(id: string) {
    return await this.productsRepository.findOne({
      where: { id: id },
      relations: [ "categories"],
    });
  }

  async getProductsByName(name: string) {
    return await this.productsRepository.findOne({
      where: { name: name },
      relations: ["files"],
    });
  }

  async updateProduct(
    { name, price, stock, description, imgUrl, category }: UpdateProductsDto,
    id: string
  ) {
    console.log(category);

    const foundProduct = await this.productsRepository.findOne({
      where: { id: id },
    });

    if (!foundProduct) {
      throw new NotFoundException("Product not found");
    }

    if (category) {
      const cat = await this.categoriesService.getCategoriesByName(category);
      foundProduct.categories = cat[0];
      console.log(cat);
    }

    foundProduct.name = name;
    foundProduct.price = price;
    foundProduct.stock = stock;
    foundProduct.description = description;
    foundProduct.imgUrl = imgUrl;

    const updatedProduct = await this.productsRepository.update(
      { id: id },
      foundProduct
    );

    console.log(updatedProduct);

    return updatedProduct;
  }
  deleteProduct(id: string) {
    throw new Error("Method not implemented.");
  }
}
