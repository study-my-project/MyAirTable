// apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql", // GraphQL 서버 주소
  cache: new InMemoryCache(), // 캐시 설정
});

export default client;