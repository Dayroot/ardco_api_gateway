import { ApolloError } from "apollo-server";

const publicationResolver = {
    
    Query: {
        listPublications: async(root, {}, { dataSources }) => {
            //Get all publications and products
            let publications = (await dataSources.publicationAPI.listPublications()).body;
            const products = (await dataSources.productAPI.listProducts()).body;

            //Populate the product field of each publication
            publications = publications.map( pub => {
                const prod = products.filter( product => product._id == pub.product );
                pub.product = prod[0];
                return pub
            });

            return publications
        },

        publicationsbyUserId: async(root, { userId }, { dataSources }) => {
            //Get all publications and products
            let publications = (await dataSources.publicationAPI.publicationsbyUserId( userId )).body;
            const products = (await dataSources.productAPI.productsByUserId( userId )).body;

            //Populate the product field of each publication
            publications = publications.map( pub => {
                const prod = products.filter( product => product._id == pub.product );
                pub.product = prod[0];
                return pub
            });

            return publications
        },

        publicationbyId: async(root, { publicationId }, { dataSources }) => {
            //Get the publication and product
            const publication = (await dataSources.publicationAPI.publicationbyId( publicationId )).body[0];
            const product = (await dataSources.productAPI.productById( publication.product )).body[0];
            
            //Populate the product field of the publication
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
                   
                    //Populate the product field
                    newPublication.product = newProduct;

                    return newPublication
                }
                catch(error){
                    //Rollback
                    if( newProduct )
                        await dataSources.productAPI.deleteProduct( newProduct._id )

                    if( newPublication )
                        await dataSources.publicationAPI.deletePublication( newPublication._id )

                    console.log(`[ERROR] ${error}`);
                    throw new ApolloError("Unexpected error", 500)
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
            
                    //Product and publication with current data before updating
                    currentProduct = (await dataSources.productAPI.productById( productId )).body[0];
                    currentpublication = (await dataSources.publicationAPI.publicationbyId( updatePublicationInput._id )).body[0];
                    
                    //Product update
                    const productData = updatePublicationInput.product;
                    updatedProduct = (await dataSources.productAPI.updateProduct( productData )).body;      
                    
                    //Publication update
                    updatePublicationInput.product = productId;
                    updatedPublication = (await dataSources.publicationAPI.updatePublication( updatePublicationInput )).body;
                    
                    //Populate the product field
                    updatedPublication.product = updatedProduct;

                    return updatedPublication
                }
                catch(error){
                    //Rollback
                    if( updatedProduct )
                        await dataSources.productAPI.updateProduct( currentProduct )

                    if( updatedPublication )
                        await dataSources.publicationAPI.updatePublication( currentpublication )

                    console.log(`[ERROR] ${error}`);
                    throw new ApolloError("Unexpected error", 500)
                }
            }
            else 
                return null;
        },
    }
};

export default publicationResolver;