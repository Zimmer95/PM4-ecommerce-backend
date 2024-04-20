import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { UpdateProductsDto } from "src/dtos/updateProducts.dto";
import { ProductsDto } from "src/dtos/products.dto";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Connection, DataSource, Repository, getConnection } from "typeorm";
import { CategoriesService } from "../categories/categories.service";
import { FilesService } from "../files/localDbFiles.service";
import { conectionSource } from "src/config/typeorm.config";

@Injectable()
export class ProductsRepository {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly filesService: FilesService,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @Inject("ProductsData")
    private data,
    private dataSource: DataSource
  ) {}

  async getProducts() {
    return await this.productsRepository.find({
      relations: ["categories", "files"],
    });
  }

  async getProductById(id: string) {
    return await this.productsRepository.findOne({
      where: { id: id },
      relations: ["categories", "files"],
    });
  }

  async getProductsByName(name: string) {
    return await this.productsRepository.findOne({
      where: { name: name },
      relations: ["categories", "files"],
    });
  }

  async addProduct(product: ProductsDto) {
    const duplicatedProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });

    if (duplicatedProduct) {
      throw new ConflictException(
        `Product ${product.name} is already in the database.`
      );
    }

    const category = await this.categoriesRepository.findOne({
      where: { name: product.category },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoría no encontrada para el producto ${product.name}`
      );
    }

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

  async preloadProducts() {
    const products = await Promise.all(
      this.data.map(async (productData) => {
        const existingProduct = await this.productsRepository.findOne({
          where: { name: productData.preloadProducts },
        });

        if (existingProduct) {
          throw new ConflictException(
            `Product ${existingProduct.name} is already in the database.`
          );
        }

        const category = await this.categoriesRepository.findOne({
          where: { name: productData.category },
        });

        if (!category) {
          throw new NotFoundException(
            `Category not found  ${productData.category}`
          );
        }

        productData.categories = category;

        const newProduct = this.productsRepository.create(productData);

        return await this.productsRepository.save(newProduct);
      })
    );

    return products;
  }

  async updateProduct(
    { name, price, stock, description, imgUrl, category }: UpdateProductsDto,
    id: string
  ) {
    const foundProduct = await this.productsRepository.findOne({
      where: { id: id },
      relations: ["categories"],
    });

    if (!foundProduct) {
      throw new NotFoundException(`Product not found`);
    }

    if (category) {
      const cat = await this.categoriesService.getCategoriesByName(category);
      foundProduct.categories = cat[0];
    }
    try {
      const updatedProduct = await this.productsRepository.update(id, {
        name,
        price,
        stock,
        description,
        imgUrl,
      });
      return updatedProduct;
    } catch (error) {
      throw new BadRequestException("something went wrong");
    }
  }

  async deleteProduct(productId: string) {
    /*     const product = await this.productsRepository.findOne({
      where: { id: productId },
      relations: ["files", "orderDetails"],
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    if (product.files && product.files.length > 0) {
      const fileIds = product.files.map((file) => file.id);
      await Promise.all(
        fileIds.map((fileId) => this.filesService.deleteFile(fileId))
      );
    }

    const orderDetailsIds = product.orderDetails.map(
      (orderDetails) => orderDetails.id
    );
    console.log(orderDetailsIds);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query("SET CONSTRAINTS ALL DEFERRED");
      await queryRunner.query(`DELETE FROM ORDER_DETAILS_PRODUCTS
      WHERE orderDetailsId = '${orderDetailsIds}' AND productsId = '${productId}';`);

      await queryRunner.query(
        `DELETE FROM order_details WHERE product_id = '${productId}';`
      );
      await queryRunner.query(
        `DELETE FROM products WHERE id = '${productId}';`
      );
      await queryRunner.query("SET CONSTRAINTS ALL IMMEDIATE");
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException("The transaction cannot be completed");
    } finally {
      await queryRunner.release();
    }

    return product; */
    return "No estamos del otro lado";
  }
}
