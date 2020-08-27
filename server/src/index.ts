import "reflect-metadata"
import express from "express"
import config from "./config"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import PostResolver from "./resolvers/post"

const main = async () => {
  console.log(__dirname)
  await createConnection({
    type: "postgres",
    host: config.dbHost,
    port: 5432,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    synchronize: true,
    entities: [
      __dirname + "/entities/*.js"
    ]
  })

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [PostResolver]
    }),
  })

  apolloServer.applyMiddleware({ app })

  app.get("/health-check", (_, res) => {
    res.sendStatus(200)
  })

  app.listen(config.port, () => console.log(`runnion on port ${config.port}`))

}

main()