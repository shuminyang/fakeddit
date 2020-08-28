import { InputType, Field, ObjectType } from "type-graphql"
import FieldError from "./common"
import User from "../../entities/User"

@InputType()
export class UsernameAndPasswordInput {
  @Field()
  username: string
  @Field()
  password: string
  @Field()
  email: string
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => User, { nullable: true })
  user?: User
}
