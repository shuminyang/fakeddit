import { Resolver, Mutation, Arg } from "type-graphql"
import User from "../entities/User"
import { hash, verify } from "argon2"
import { UsernameAndPasswordInput, UserResponse } from "./types/userTypes"

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg("input") input: UsernameAndPasswordInput
  ) {
    const hashed = await hash(input.password)
    const user = User.create({
      username: input.username,
      password: hashed,
      email: input.email,
    })
    await user.save()

    return user
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("input") input: UsernameAndPasswordInput
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: input.email } })
    if (!user) {
      return {
        errors: [{
          field: "E-mail",
          message: "E-mail doesn't exist.",
        }]
      }
    }

    const passValid = await verify(user.password, input.password)

    if (!passValid) {
      return {
        errors: [{
          field: "Login",
          message: "Invalid login",
        }]
      }
    }

    return {
      user,
    }
  }

}

export default UserResolver