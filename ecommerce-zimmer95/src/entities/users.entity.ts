import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Orders } from "./orders.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 80, nullable: false })
  password: string;

  @Column({default: false , nullable: false })
  role: boolean;

  @Column({ type: "bigint", nullable: true })
  phone: number;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => Orders, (order) => order.user_id)
  orders: Orders[];
}
