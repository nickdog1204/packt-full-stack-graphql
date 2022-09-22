import {gql} from "@apollo/client";


const newPostFragment = gql`
    fragment NewPost on Post {
        id
        type
    }
`

const fragments = {newPostFragment}

export {fragments};