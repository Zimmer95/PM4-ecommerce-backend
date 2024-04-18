import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Files } from "src/entities/files.entity";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>
  ) {}

  async saveFile({
    name,
    mimeType,
    data,
    product,
  }: {
    name: string;
    mimeType: string;
    data: Buffer;
    product: Products;
  }) {
    if (!product || !(product instanceof Products)) {
      throw new Error("Invalid product");
    }

    const newfile = new Files();
    newfile.name = name;
    newfile.mimeType = mimeType;
    newfile.data = data;
    newfile.product = product;

    return await this.filesRepository.save(newfile);
  }
}
