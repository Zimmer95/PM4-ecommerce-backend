import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./categories.entity";
import { OrderDetails } from "./orderDetails.entity";
import { Files } from "./files.entity";

@Entity()
export class Products {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "int", nullable: false })
  stock: number;

  @Column({
    default:
      "https://res.cloudinary.com/dzupkbfvj/image/upload/fl_preserve_transparency/v1713070779/m8a8ilwpokhcb3sd9mha.jpg?_s=public-apps",
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  categories: Categories;

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];

  @OneToMany(() => Files, (file) => file.product)
  files: Files[];
}
