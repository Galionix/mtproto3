import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/tailwind-output.css";

const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
