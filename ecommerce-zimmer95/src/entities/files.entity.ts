import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";

@Entity({ name: "files" })
export class Files {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false })
  mimeType: string;

  @Column({ type: "bytea", nullable: false})
  data: Buffer;

  @ManyToOne(() => Products, (product) => product.files)
  @JoinTable({ name: "product_id" })
  product: Products;
}
