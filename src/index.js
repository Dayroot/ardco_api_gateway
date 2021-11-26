import { ApolloServer } from "apollo-server";

import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import authentication from './utils/authentication.js';
import AuthAPI from './dataSources/auth_api.js';

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        authAPI: new AuthAPI(),
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});