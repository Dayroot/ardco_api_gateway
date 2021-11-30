import { ApolloError } from "apollo-server";

const purchaseResolver = {
    Query: {

        purchasesByUserId: async(root, { userId }, { dataSources, userIdToken }) => {

            if( userId == userIdToken ){

                //Get all purchases by user id
                let purchases =  (await dataSources.purchaseAPI.purchasesByUserId(userId)).body;
                
                //Populate the product fields of each  of the purchases
                purchases = purchases.map( async( purchase ) => {

                    purchase.products = await purchase.products.map( async( purchasedProd ) => {
                        
                        //Get product data and replace in product field
                        const productData = (await dataSources.productAPI.productById( purchasedProd.product )).body[0];
                        purchasedProd.product = productData;
                        
                        return purchasedProd
                    }); 
                    
                    return purchase
                });

                return purchases
            }
            else 
                return null
        },
    },

    Mutation: {

        createPurchase: async(root, { purchaseInput }, { dataSources, userIdToken }) => {
            if( purchaseInput.userId == userIdToken ){

                let newPurchase;

                try {
                    //Create a new purchase
                    newPurchase = (await dataSources.purchaseAPI.createPurchase( purchaseInput )).body;

                    //Populate product fields
                    newPurchase.products = await newPurchase.products.map( async(purchasedProd) => {

                        //Get product data and replace in product field
                        const productData = (await dataSources.productAPI.productById( purchasedProd.product )).body[0];
                        purchasedProd.product = productData;
                        
                        return purchasedProd
                    });

                    return newPurchase

                } catch (error) {
                    //Rollback
                    if(newPurchase)
                        await dataSources.purchaseAPI.deletePurchase( newPurchase._id );

                    console.log(`[ERROR] ${error}`);
                    throw new ApolloError("Unexpected error", 500)
                }
            }
            else
                return null
        },

        changeProductStatus: async(root, { userId, prodStatusInput }, { dataSources, userIdToken }) => {

            if( userId == userIdToken ){

                //Obtain the product data to verify that it is the owner of the product 
                //who will make the change of status of the purchased product.
                const productData = (await dataSources.productAPI.productById( prodStatusInput.product )).body[0];
                if( productData.userId == userIdToken ){

                    let purchasedProd;
                    let beforePurchasedProd;

                    try {
                        //Update the status of the purchased product
                        const response = (await dataSources.purchaseAPI.changeProductStatus( prodStatusInput )).body;
                        beforePurchasedProd = {...prodStatusInput, status: response.before.status};
                        purchasedProd = response.update;

                        //Get product data and replace in product field
                        const productData = (await dataSources.productAPI.productById( purchasedProd.product )).body[0];
                        purchasedProd.product = productData;
                        
                        return purchasedProd

                    } catch (error) {
                        //Rollback
                        if(purchasedProd)
                            await dataSources.purchaseAPI.changeProductStatus( beforePurchasedProd );
                        
                        console.log(`[ERROR] ${error}`);
                        throw new ApolloError("Unexpected error", 500)
                    }
                }

            }
            else
                return null;
        },
    }
}

export default purchaseResolver;