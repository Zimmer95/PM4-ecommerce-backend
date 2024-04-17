import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany(() => Products, (product) => product.categories)
  @JoinColumn()
  products: Products[];
}
