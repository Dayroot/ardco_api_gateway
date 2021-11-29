import { ApolloError } from "apollo-server";

const reviewResolver = {

    Query: {
        reviewsByPublication: async(root, { publicationId }, { dataSources }) => {

            //Get reviews by publication
            let reviews = (await dataSources.publicationAPI.reviewsByPublication( publicationId )).body;
            
            //Get the data of the reviewed product
            const productId = reviews[0].publication.product;
            const productData = (await dataSources.productAPI.productById( productId )).body[0];
            
            //Fill in the product field
            reviews = await reviews.map( review => {
               review.publication.product = productData;
               return review
            });

            return reviews
            
        },

        reviewsByUserId: async(root, { userId }, { dataSources, userIdToken }) => {

            if( userId == userIdToken ){
                //Get reviews by publication
                let reviews = (await dataSources.publicationAPI.reviewsByUserId( userId )).body;
                
                //Get the data of the reviewed product
                const productId = reviews[0].publication.product;
                const productData = (await dataSources.productAPI.productById( productId )).body[0];
                
                //Fill in the product field
                reviews = await reviews.map( review => {
                    review.publication.product = productData;
                    return review
                });

                return reviews
            }      
        },
    },

    Mutation: {

        createReview: async(root, { reviewInput }, { dataSources, userIdToken }) => {
            
            let newReview;
            if( reviewInput.userId == userIdToken ){
                try {
                    //Create a new review
                    newReview = (await dataSources.publicationAPI.createReview( reviewInput )).body;

                    //Get the data of the reviewed product
                    const productId = newReview.publication.product;
                    const productData = (await dataSources.productAPI.productById( productId )).body[0]; 

                    //Fill in the product field
                    newReview.publication.product = productData;

                    return newReview

                } catch (error) {
                    //Rollback
                    if(newReview)
                        await dataSources.publicationAPI.deleteReview( newReview._id );

                    throw new ApolloError(error, 500)
                }
            }
            else 
                return null;
        }
    }
};

export default reviewResolver;