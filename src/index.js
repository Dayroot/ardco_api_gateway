import { ApolloServer } from "apollo-server";

import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import authentication from './utils/authentication.js';
import AuthAPI from './dataSources/auth_api.js';
import ProductAPI from './dataSources/product_api.js';
import PublicationAPI from './dataSources/publication_api.js';

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        authAPI: new AuthAPI(),
        productAPI: new ProductAPI(),
        publicationAPI: new PublicationAPI(),

    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});