import {onError} from "@apollo/client/link/error";
import {createHttpLink, from} from "@apollo/client";


const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql'
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        console.log(`=== There are ${graphQLErrors.length} GraphQLErrors: ===`)
        graphQLErrors.forEach(
            (
                {
                    message,
                    locations,
                    path
                }
            ) => {
                console.log(`[GraphQL Error] => Message: ${message}, Locations: ${locations}, Path: ${path}`)
            }
        )
        console.log('=== END OF GraphErrors =====')
        if (networkError) {
            console.log(`[Network Error]: ${networkError}`)
        }
    }
})
const link = from([
    errorLink,
    httpLink
])

export default link;