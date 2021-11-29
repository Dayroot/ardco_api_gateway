import { gql } from 'apollo-server';

const reviewTypeDefs = gql`
    
    type Review {
        _id: String!
        publication: Publication!
        date: String!
        userId: Int!
        stars: Int!
        text: String

    }

    input ReviewInput {
        publication: String!
        userId: Int!
        stars: Int!
        text: String
    }

    extend type Query {
        reviewsByPublication( publicationId: String!): [Review]
        reviewsByUserId( userId: Int!): [Review]
    }

    extend type Mutation {
        createReview( reviewInput: ReviewInput! ): Review
    }


`;

export default reviewTypeDefs;