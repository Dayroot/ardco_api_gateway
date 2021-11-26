import { gql } from 'apollo-server';

const categoryTypeDefs = gql`
    type Category {
        _id: String!
        name: String!
    }

    extend type Query {
        listCategories: [Category]
    }
`;

export default categoryTypeDefs;