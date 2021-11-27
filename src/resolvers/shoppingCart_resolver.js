
const shoppingCartResolver = {
    Query: {
        shoppingCartByUserId: async(root, { userId }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.shoppingCartByUserId(userId)).body[0];
            else 
                return null
        }
    },
    Mutation: {
        createShoppingCart: async(root, { userId }, { dataSources }) => {
            return (await dataSources.productAPI.createShoppingCart({userId: userId})).body;      
        },
        updateCartProduct: async(root, { userId, cartProductInput }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.updateCartProduct(userId, cartProductInput)).body;
            
        },
        deleteCartProduct: async(root, { userId, cartProductInput }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.deleteCartProduct(userId, cartProductInput)).body;
            
        },
        deleteShoppingCart: async(root, { userId }, { dataSources, userIdToken }) => {
            if(userId == userIdToken)
                return (await dataSources.productAPI.deleteShoppingCart(userId)).body;
            
        },
    }
};

export default shoppingCartResolver;