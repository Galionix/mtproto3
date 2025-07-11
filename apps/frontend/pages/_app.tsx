import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/tailwind-output.css";
import { Header } from "../src/Header";
import { firebaseApp } from "../firestore";
console.log("firebaseApp: ", firebaseApp);


const apolloClient = new ApolloClient({
  uri: "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Botplatform v2</title>
      </Head>
      <main className="app">
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
