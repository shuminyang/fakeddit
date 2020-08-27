import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
@Entity("post")
class Post extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column("varchar")
  title: string

  @Field()
  @Column("text")
  content: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}

export default Post