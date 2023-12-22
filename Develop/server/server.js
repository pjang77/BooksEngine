const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

async function startApolloServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`);
        console.log(
          `GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    });
  } catch (error) {
    console.error("Apollo Server initialization failed", error);
  }
}

startApolloServer();
