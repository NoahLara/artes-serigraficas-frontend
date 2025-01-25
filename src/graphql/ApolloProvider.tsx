import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

type ApolloAppProviderPros = { children: JSX.Element };

export const ApolloAppProvider: React.FC<ApolloAppProviderPros> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
