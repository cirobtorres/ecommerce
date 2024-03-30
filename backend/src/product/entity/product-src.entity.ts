import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({
  name: "product_src",
})
export class ProductSrcEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  src: string;

  @ManyToOne(() => ProductEntity, (product) => product.product_src)
  @JoinColumn([
    { name: "productId", referencedColumnName: "id" },
    { name: "code", referencedColumnName: "code" },
  ])
  product: ProductEntity;
}
