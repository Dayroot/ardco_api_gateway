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
        average_reviews: Float
        total_reviews: Int
        userId: Int!
    }
    input ProductInput {
        name: String!
        price: Int!
        stock: Int!
        sold: Int
        category: String
        imgUrls: [String]
        average_reviews: Float
        total_reviews: Int
        userId: Int!
    }

    input ProductUpdateInput {
        _id: String!
        name: String
        price: Int
        stock: Int
        sold: Int
        category: String
        imgUrls: [String]
        average_reviews: Float
        total_reviews: Int
        userId: Int
    }
    extend type Query {
        listProducts: [Product]
        productsByCategory(categoryId: String!): [Product]
        productById(productId: String!): Product
        productsByUserId(userId: String!): [Product]
    }

`;

export default productTypeDefs;