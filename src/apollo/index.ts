import {ApolloClient, createHttpLink, from, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import link from "./links";
import * as queries from './queries';


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
})

export {queries};


export default client;