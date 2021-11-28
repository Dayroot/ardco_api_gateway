
const wishListResolver = {
    Query: {
        wishListByUserId: async(root, { userId }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.wishListByUserId(userId)).body[0];
            
            else
                return null;
        }
    },

    Mutation: {
        createWishList: async(root, { userId }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.createWishList({ userId: userId })).body;
            
            else
                return null;
        },

        updateWishListProduct: async(root, { userId, wishListProductInput }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.updateWishListProduct(userId, wishListProductInput)).body;
            
            else
                return null;
        },

        deleteWishListProduct: async(root, { userId, wishListProductInput }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.deleteWishListProduct(userId, wishListProductInput)).body;
            
            else
                return null;
        },

        deleteWishList: async(root, { userId }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.deleteWishList( userId )).body;
            
            else
                return null;
        },
    }
}

export default wishListResolver;