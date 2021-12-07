import { gql } from 'apollo-server';

const categoryTypeDefs = gql`
    

    type Category {
        _id: String!
        name: String!
    }

    input CategoryInput {
        _id: String
        name: String!
    }

    extend type Query {
        listCategories: [Category]
    }

    extend type Mutation {
        createCategory(userId: Int!, categoryInput: CategoryInput): Category!
        updateCategory(userId: Int!, categoryInput: CategoryInput): Category!
    }
`;

export default categoryTypeDefs;