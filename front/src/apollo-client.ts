import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql', // GraphQL 서버 URL
  cache: new InMemoryCache(), // 캐싱 전략
});

export default client;