import { Column, Entity, OneToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import Products from './Products';

@ObjectType({ description:"Categorias" } )
@Entity('categories', { schema: 'public' })
export default class Categories extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid", { name: 'category_id' })
  categoryId: string;

  @Field()
  @Column( { name: 'category_name', length: 15 })
  categoryName: string;

  @Field({ nullable: true, description: 'Descrição do Produto' })
  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Field(() => Products)
  @OneToMany(() => Products, products => products.category, {
    lazy: true,
  })
  products: Products[];
}
