
const usersResolver = {
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
            const  authInput = {
                username: userInput.username,
                password: userInput.password,
                fullname: userInput.fullname,
                email: userInput.email,
            }
            return (await dataSources.authAPI.createUser( authInput )).result;
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

export default usersResolver;