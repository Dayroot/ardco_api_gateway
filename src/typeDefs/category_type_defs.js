import { gql } from 'apollo-server';

const categoryTypeDefs = gql`
    type Features {
        _id: String
        color: String
        material: String
        craftType: String
        department: String
    }

    input FeaturesInput {
        color: String
        material: String
        craftType: String
        department: String
    }

    type Category {
        _id: String!
        name: String!
        features: Features
    }

    input CategoryInput {
        _id: String
        name: String!
        features: FeaturesInput
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