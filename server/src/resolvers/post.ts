import { Resolver, Query, Mutation, Arg, Int } from "type-graphql"
import Post from "../entities/Post"

@Resolver()
class PostResolver {

  @Query(() => [Post])
  async getPosts() {
    const posts = await Post.find()
    return posts
  }

  @Query(() => Post, { nullable: true })
  async getPost(
    @Arg("id", () => Int) id: number
  ) {
    const post = await Post.findOne({ where: { id } })
    return post
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string
  ) {
    const post = Post.create({ content, title })
    await post.save()

    return post
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string
  ) {
    const post = await Post.findOne({ where: { id } })

    if (!post) {
      return null;
    }

    post.title = title;
    post.content = content;

    await post.save()

    return post
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number
  ) {
    await Post.delete({ id })

    return true
  }
}

export default PostResolver