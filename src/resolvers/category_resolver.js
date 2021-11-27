const categoryResolver = {
    Query: {
        listCategories: async(root, {}, { dataSources }) => {
            return (await dataSources.productAPI.listCategories()).body
        },
    },

    Mutation: {
        createCategory: async(root, { userId, categoryInput }, { dataSources, userIdToken }) => {
            if( userId == userIdToken )
                return (await dataSources.productAPI.createCategory(categoryInput)).body;
            else
                return null;
        },

        updateCategory: async(root, { userId, categoryInput }, { dataSources, userIdToken }) => {
            if( userId == userIdToken )
                return (await dataSources.productAPI.updateCategory(categoryInput)).body;
            else
                return null;
        },
    }
}

export default categoryResolver;