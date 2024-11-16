"use client"; // 이 파일은 클라이언트 컴포넌트임을 명시합니다.

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";

const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;