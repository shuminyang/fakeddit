import "reflect-metadata"
import express from "express"
import config from "./config"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import PostResolver from "./resolvers/post"
import UserResolver from "./resolvers/user"
import redis from "redis"
import session from "express-session"
import connectRedis from "connect-redis"
import { CustomContext } from "./types"

const main = async () => {
  await createConnection({
    type: "postgres",
    host: config.dbHost,
    port: 5432,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    synchronize: true,
    logging: true,
    entities: [
      __dirname + "/entities/*.js"
    ]
  })

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60,
        httpOnly: true,
        secure: config.__prod__,
      },
      saveUninitialized: false,
      secret: "mysecret",
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        PostResolver,
        UserResolver
      ],
    }),
    context: ({ req, res }): CustomContext => ({ req, res })
  })

  apolloServer.applyMiddleware({ app })

  app.get("/health-check", (_, res) => {
    res.sendStatus(200)
  })

  app.listen(config.port, () => console.log(`runnion on port ${config.port}`))

}

main()