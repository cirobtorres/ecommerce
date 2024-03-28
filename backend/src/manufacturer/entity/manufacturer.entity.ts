import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "../../product/entity/product.entity";

@Entity({
  name: "manufacturer",
})
export class ManufacturerEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 255,
  })
  brandName: string; // Nome fantasia

  @Column({
    length: 255,
  })
  legalName: string; // Razão social

  @Column({
    length: 14,
  })
  cnpj: string;

  @Column()
  ie: string; // Inscrição estadual

  @Column()
  im: string; // Inscrição municipal
}
