import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "src/entities/categories.entity";
import { CreateCategoriesDto } from "src/dtos/createCategories.dto";

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

    if (
      categories.map((category) =>
        this.categoriesRepository.findOne({ where: { name: category.name } })
      )
    ) {
      throw new ConflictException(
        "The category already exists in the database"
      );
    }

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

  async addCategories(category: CreateCategoriesDto) {
    const cat = new Categories();
    cat.name = category.name;
    const createdCategory = this.categoriesRepository.create(cat);
    const newCategory = this.categoriesRepository.create(createdCategory);
    return newCategory;
  }
}
