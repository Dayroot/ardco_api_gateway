import { gql } from 'apollo-server';

const reviewTypeDefs = gql`
    
    type Review {
        _id: String!
        publication: String!
        date: String!
        userId: Int!
        stars: Int!
        text: String

    }




`;

export default reviewTypeDefs;