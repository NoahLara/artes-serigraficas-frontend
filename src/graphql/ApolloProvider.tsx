import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI, // Access the environment variable
  cache: new InMemoryCache(),
});

type ApolloAppProviderPros = { children: JSX.Element };

export const ApolloAppProvider: React.FC<ApolloAppProviderPros> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
