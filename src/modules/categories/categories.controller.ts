import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { CategoriesService } from "./categories.service";
import { CategoriesDto } from "src/dtos/categories.dto";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "../auth/role.enum";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller("categories")
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("seeder")
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  preloadCategories() {
    return this.categoriesService.preloadCategories();
  }

  @Get()
  getCategories(@Query("name") name?: string) {
    if (name) {
      return this.categoriesService.getCategoriesByName(name);
    }
    return this.categoriesService.getCategories();
  }
  
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  addCategories(category: CategoriesDto) {
    return this.categoriesService.preloadCategories();
  }
}
