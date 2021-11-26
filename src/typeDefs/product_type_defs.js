import { gql } from 'apollo-server';

const productTypeDefs = gql`

    type ResponseDelete {
        deletedCount: Int!
    }

    type Category {
        _id: String
        name: String
    }

    type Product {
        _id: String!
        name: String!
        price: Int!
        stock: Int!
        sold: Int!
        category: Category
        imgUrls: [String]
    }
    input ProductInput {
        name: String!
        price: Int!
        stock: Int!
        sold: Int!
        category: String
        imgUrls: [String]
    }

    input ProductUpdateInput {
        _id: String!
        name: String
        price: Int
        stock: Int
        sold: Int
        category: String
        imgUrls: [String]
    }
    extend type Query {
        listProducts: [Product]
        productsByCategory(categoryId: String!): [Product]
        productById(productId: String!): Product
    }

`;

export default productTypeDefs;