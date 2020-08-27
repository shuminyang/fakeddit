import { Resolver, Query, Mutation, Arg } from "type-graphql"
import Post from "../entities/Post"

@Resolver()
class PostResolver {

  @Query(() => String)
  getPosts() {
    return "Hello world!"
  }


  @Mutation(() => Post)
  async createPost(
    @Arg("content", () => String) content: string
  ) {
    const post = Post.create({ content })
    await post.save()

    return post
  }

}

export default PostResolver