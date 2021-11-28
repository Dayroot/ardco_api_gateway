import { ApolloError } from "apollo-server";

const publicationResolver = {
    
    Query: {
        listAllPublications: async(root, {}, { dataSources }) => {
            let publications = (await dataSources.publicationAPI.listAllPublications()).body;
            const products = (await dataSources.productAPI.listProducts()).body;

            publications = publications.map( pub => {
                const prod = products.filter( product => product._id == pub.product );
                pub.product = prod[0];
                return pub
            });

            return publications
        },

        getPublicationsbyUserId: async(root, { userId }, { dataSources }) => {

            let publications = (await dataSources.publicationAPI.getPublicationsbyUserId( userId )).body;
            const products = (await dataSources.productAPI.productsByUserId( userId )).body;

            publications = publications.map( pub => {
                const prod = products.filter( product => product._id == pub.product );
                pub.product = prod[0];
                return pub
            });

            return publications
        },

        getPublicationbyId: async(root, { publicationId }, { dataSources }) => {

            const publication = (await dataSources.publicationAPI.getPublicationbyId( publicationId )).body[0];
            const product = (await dataSources.productAPI.productById( publication.product )).body[0];
            publication.product = product;

            return publication
        },
    },

    Mutation: {

        createPublication: async(root, { publicationInput }, { dataSources, userIdToken }) => {
            
            if(publicationInput.userId == userIdToken){

                let newProduct = null;
                let newPublication = null;

                try{
                    //Create new product
                    const productData = publicationInput.product;
                    newProduct = (await dataSources.productAPI.createProduct( productData )).body;      
                    
                    //Create new publication
                    publicationInput.product = newProduct._id;
                    newPublication = (await dataSources.publicationAPI.createPublication( publicationInput )).body;
                    newPublication.product = newProduct;

                    return newPublication
                }
                catch(error){

                    if( newProduct )
                        await dataSources.productAPI.deleteProduct( newProduct._id )

                    if( newPublication )
                        await dataSources.publicationAPI.deletePublication( newPublication._id )

                    throw new ApolloError(error)
                }
            }
            else 
                return null;
        },

        updatePublication: async(root, { updatePublicationInput }, { dataSources, userIdToken }) => {
            
            if(updatePublicationInput.userId == userIdToken){

                let currentProduct = null;
                let currentpublication = null;
                let updatedProduct = null;
                let updatedPublication = null;

                try{
                    const productId = updatePublicationInput.product._id;
            
                    //Product and publication with current data before  updating
                    currentProduct = (await dataSources.productAPI.productById( productId )).body[0];
                    currentpublication = (await dataSources.publicationAPI.getPublicationbyId( updatePublicationInput._id )).body[0];
                    
                    //Product update
                    const productData = updatePublicationInput.product;
                    updatedProduct = (await dataSources.productAPI.updateProduct( productData )).body;      
                    
                    //Publication update
                    updatePublicationInput.product = productId;
                    updatedPublication = (await dataSources.publicationAPI.updatePublication( updatePublicationInput )).body;
                    updatedPublication.product = updatedProduct;

                    return updatedPublication
                }
                catch(error){

                    if( updatedProduct )
                        await dataSources.productAPI.updateProduct( currentProduct )

                    if( updatedPublication )
                        await dataSources.publicationAPI.updatePublication( currentpublication )

                    throw new ApolloError(error)
                }
            }
            else 
                return null;
        },
    }
};

export default publicationResolver;