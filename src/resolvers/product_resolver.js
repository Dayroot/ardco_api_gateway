const productResolver = {
    Query: {
        listProducts: async(root, {}, { dataSources }) => {
            return (await dataSources.productAPI.listProducts()).body;
        },
        productsByCategory: async(root, { categoryId }, { dataSources }) => {
            return (await dataSources.productAPI.productsByCategory(categoryId)).body;
        },
        productById: async(root, { productId }, { dataSources }) => {
            return (await dataSources.productAPI.productById(productId)).body[0];
        },
    }

}

export default productResolver;