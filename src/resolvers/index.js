import authResolver from './auth_resolver.js';
import productResolver from './product_resolver.js';
import categoryResolver from './category_resolver.js';
import shoppingCartResolver from './shoppingCart_resolver.js';

import lodash from 'lodash';

const resolvers = lodash.merge(authResolver, productResolver, categoryResolver, shoppingCartResolver);

export default resolvers;