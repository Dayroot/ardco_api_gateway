
import { ApolloError } from "apollo-server";
import jwt_decode from "jwt-decode";

const userResolver = {
    Query: {
        userDetailById: async(root, { userId }, { dataSources, userIdToken }) => {
            if( userId == userIdToken)
                return (await dataSources.authAPI.getUser(userId)).result
            else
                return null
        },
    },
    Mutation: {

        signUpUser: async(root, { userInput }, { dataSources }) => {
            
            let tokens;
            let newShoppingCart;
            let newWishList;
            let userId;

            const  authInput = {
                username: userInput.username,
                password: userInput.password,
                fullname: userInput.fullname,
                email: userInput.email,
            }

            try {           
                
                //Create a new user and login automatically
                tokens = (await dataSources.authAPI.createUser( authInput )).result;
                userId = jwt_decode(tokens.access).user_id;

                //Create a new shopping cart
                newShoppingCart = await dataSources.productAPI.createShoppingCart({userId: userId});
    
                //Create a new wish list
                newWishList = await dataSources.productAPI.createWishList({ userId: userId });

                return tokens

            } catch (error) {
                //Rollback
                if(userId){

                    if(tokens)
                        await dataSources.authAPI.deleteUser( userId );

                    if(newShoppingCart)
                        await dataSources.productAPI.deleteShoppingCart( userId );

                    if(newWishList)
                        await dataSources.productAPI.deleteWishList( userId );
                }

                console.log(`[ERROR] ${error}`);
                throw new ApolloError("Unexpected error", 500)
            }
        },
        logIn: async(root, { credentials }, { dataSources }) => 
            await dataSources.authAPI.authRequest(credentials),
        
        refreshToken: async(root, { refresh }, { dataSources }) => 
            await dataSources.authAPI.refreshToken(refresh),
        
        updateUser: async(root, { userId, userUpdateInput }, { dataSources, userIdToken }) => {
            if( userId == userIdToken)   
                return (await dataSources.authAPI.updateUser( userId, userUpdateInput )).result;
            else
                return null
        },
        deleteUser: async(root, { userId }, { dataSources, userIdToken }) => {
            if( userId == userIdToken)
                return (await dataSources.authAPI.deleteUser(userId))
            else
                return null
        },
    }
};

export default userResolver;