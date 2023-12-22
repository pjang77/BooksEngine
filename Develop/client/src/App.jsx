import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // Adjust this URI if your GraphQL server is at a different address
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
