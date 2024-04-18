import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Users } from "./users.entity";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user_id: Users;
}
