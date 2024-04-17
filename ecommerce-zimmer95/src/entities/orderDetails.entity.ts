import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";
import { Orders } from "./orders.entity";

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinTable({ name: "order_id" })
  order: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({ name: "ORDER_DETAILS_PRODUCTS" })
  products: Products[];
}
