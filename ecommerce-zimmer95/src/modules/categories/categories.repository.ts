import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "src/entities/categories.entity";

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @Inject("ProductsData")
    private data: any[]
  ) {}

  async preloadCategories(): Promise<Categories[]> {
    const categoriesSet = new Set<string>();
    this.data.forEach((product) => {
      categoriesSet.add(product.category);
    });

    const categories: { name: string }[] = Array.from(
      categoriesSet
    ).map((category) => ({ name: category }));

    const loadedCategories: Promise<Categories>[] = categories.map(
      async (category) => {
        const newCategory = this.categoriesRepository.create(category);
        return await this.categoriesRepository.save(newCategory);
      }
    );

    return Promise.all(loadedCategories);
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async getCategoriesByName(name: string) {
    return await this.categoriesRepository.find({ where: { name: name } });
  }

  async addCategories(category: Categories) {
    const createdCategory = this.categoriesRepository.create(category);
    const newCategory = this.categoriesRepository.create(createdCategory);
    return newCategory;
  }
}
