import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { CategoriesService } from "./categories.service";
import { CreateCategoriesDto } from "src/dtos/createCategories.dto";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "../auth/role.enum";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get("seeder")
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @ApiBearerAuth()
  async preloadCategories() {
    return this.categoriesService.preloadCategories();
  }

  @Get()
  @ApiQuery({ name: "name", required: false })
  async getCategories(@Query("name") name?: string) {
    if (name) {
      return this.categoriesService.getCategoriesByName(name);
    }
    return this.categoriesService.getCategories();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @ApiBearerAuth()
  async addCategory(@Body() category: CreateCategoriesDto) {
    return this.categoriesService.addCategories(category);
  }
}
