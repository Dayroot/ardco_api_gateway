import { gql } from 'apollo-server';

const purchaseTypeDefs = gql`

    type PurchasedProduct {
        _id: String!
        product: Product!
        quantity: Int!
        status: String!
    }

    input PurchasedProductInput {
        product: String!
        quantity: Int!
        status: String
    }

    type Purchase {
        _id: String!
        date: String!
        userId: Int!
        products:[PurchasedProduct]
        total: Int!
    }

    input PurchaseInput {
        userId: Int!
        products:[PurchasedProductInput]!
        total: Int!
    }

    input ProdStatusInput {
        purchaseId: String!
        product: String!
        status: String!
    }
    
    extend type Query {
        purchasesByUserId( userId: Int! ): [Purchase]
    }

    extend type Mutation {
        createPurchase( purchaseInput: PurchaseInput! ): Purchase
        changeProductStatus( userId: Int!, prodStatusInput: ProdStatusInput! ): PurchasedProduct
    }

`;

export default purchaseTypeDefs;