import { gql } from 'apollo-server';

const shoppingCartTypeDefs = gql`

    type CartProduct {
        product: Product
        quantity: Int
    }

    input CartProductInput {
        product: String!
        quantity: Int
    }

    type ShoppingCart {
        _id: String!
        userId: String!
        products: [CartProduct]
    }

    input ShoppingCartInput {
        userId: String!
    }
    
    extend type Query {
        shoppingCartByUserId(userId: Int!): ShoppingCart!
    }
    
    extend type Mutation {
        createShoppingCart(userId: Int! ): ShoppingCart!
        updateCartProduct(userId: Int!, cartProductInput: CartProductInput): ShoppingCart!
        deleteCartProduct(userId: Int!, cartProductInput: CartProductInput): ShoppingCart!
        deleteShoppingCart(userId: Int!): ResponseDelete!
    }

    
`;

export default shoppingCartTypeDefs;