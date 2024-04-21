import { Controller } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoriesDto } from "src/dtos/createCategories.dto";

@Controller("service")
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  preloadCategories() {
    return this.categoriesRepository.preloadCategories();
  }
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  getCategoriesByName(name: string) {
    return this.categoriesRepository.getCategoriesByName(name);
  }
  addCategories(category: CreateCategoriesDto) {
    return this.categoriesRepository.addCategories(category);
  }
}
