import { gql }  from 'apollo-server';

const wishListTypeDefs = gql`

    type WishList {
        _id: String!
        userId: Int!
        products: [Product]
    }

    input WishListProductInput {
        product: String!
    }

    extend type Query {
        wishListByUserId(userId: Int!): WishList!
    }

    extend type Mutation {
        createWishList(userId: Int! ): WishList!
        updateWishListProduct(userId: Int!, wishListProductInput: WishListProductInput ): WishList!
        deleteWishListProduct(userId: Int!, wishListProductInput: WishListProductInput): WishList!
        deleteWishList(userId: Int!): ResponseDelete!
    }
`;

export default wishListTypeDefs;