const categoryResolver = {
    Query: {
        listCategories: async(root, {}, { dataSources }) => {
            return (await dataSources.productAPI.listCategories()).body
        },
    },
}

export default categoryResolver;