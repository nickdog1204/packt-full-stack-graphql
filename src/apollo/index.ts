import {ApolloClient, createHttpLink, from, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import link from "./links";


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
})


export default client;