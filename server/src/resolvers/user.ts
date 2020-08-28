import { Resolver, Mutation, Arg } from "type-graphql"
import User from "../entities/User"
import { hash, verify } from "argon2"
import { UsernameAndPasswordInput, UserResponse } from "./types/userTypes"

@Resolver()
class UserResolver {
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("input") input: UsernameAndPasswordInput
  ): Promise<UserResponse> {
    if (input.password.length < 6) {
      return {
        errors: [{
          field: "Password",
          message: "Password must be greater than 6"
        }]
      }
    }
    const hashed = await hash(input.password)
    const user = User.create({
      username: input.username,
      password: hashed,
      email: input.email,
    })
    try {
      await user.save()
    } catch (e) {
      if (e.code === '23505') {
        return {
          errors: [{
            field: "E-mail",
            message: "E-mail alread exists."
          }]
        }
      }
      return {
        errors: [{
          field: "Unexpected",
          message: "Unexpected, try again."
        }]
      }
    }

    return {
      user,
    }
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