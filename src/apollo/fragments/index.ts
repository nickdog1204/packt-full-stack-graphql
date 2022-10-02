import {gql} from "@apollo/client";
import {USER_ATTRIBUTES} from "./userAttributes";


const newPostFragment = gql`
    fragment NewPost on Post {
        id
        type
    }
`

const fragments = {newPostFragment, USER_ATTRIBUTES}

export {fragments};