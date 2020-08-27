import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
@Entity("post")
class Post extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column("text")
  content: string

  @Field()
  @Column("timestamptz")
  createdAt: Date

  @Field()
  @Column("timestamptz")
  updatedAt: Date
}

export default Post