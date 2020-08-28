import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
@Entity()
class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column("varchar")
  username: string

  @Column("varchar")
  password: string

  @Field()
  @Column("varchar", { unique: true })
  email: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

}

export default User;