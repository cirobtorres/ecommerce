import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductSrcEntity } from "./product-src.entity";
import { ManufacturerEntity } from "../../manufacturer/entity/manufacturer.entity";

@Entity({
  name: "product",
})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.id)
  manufacturer: ManufacturerEntity;

  @PrimaryColumn({
    length: 20,
  })
  code: string;

  @Column({
    length: 255,
  })
  title: string;

  @Column()
  description: string;

  @OneToMany(() => ProductSrcEntity, (product_src) => product_src.product, {
    cascade: true,
  })
  @JoinColumn([{ name: "productSrcId", referencedColumnName: "id" }])
  productSrc?: ProductSrcEntity[];

  // A tensão é mais complexa. Será necessário relacionar a outra entidade, cada um com seu preço e código diferente
  // @Column()
  // voltage?: string;

  @Column()
  purchasePrice: number; // Custo do produto

  @Column()
  sellingPrice: number; // Vendido ao consumidor final
}
