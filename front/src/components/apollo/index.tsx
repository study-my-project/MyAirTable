import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client"; // 분리된 Apollo Client 가져오기

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;