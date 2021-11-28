import { gql } from 'apollo-server';

const publicationTypeDefs = gql`
    type Publication {
        _id: String!
        product: Product!
        userId: Int!
        publication_date: String!
        description: String!
    }

    input PublicationInput {
        product: ProductInput!
        userId: Int!
        publication_date: String
        description: String!
    }

    input UpdatePublicationInput {
        _id: String!
        product: ProductUpdateInput
        userId: Int!
        publication_date: String
        description: String
    }

    extend type Query {
        listAllPublications: [Publication]
        getPublicationsbyUserId( userId: Int!): [Publication]
        getPublicationbyId( publicationId: String!): Publication
    }

    extend type Mutation {
        createPublication( publicationInput: PublicationInput!): Publication
        updatePublication( updatePublicationInput: UpdatePublicationInput!): Publication
        deletePublication( publicationId: String!): ResponseDelete!
    }


`;

export default publicationTypeDefs;

