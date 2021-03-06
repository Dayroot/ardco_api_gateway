import authResolver from './auth_resolver.js';
import productResolver from './product_resolver.js';
import categoryResolver from './category_resolver.js';
import shoppingCartResolver from './shoppingCart_resolver.js';
import wishListResolver from './wishList_resolver.js';
import publicationResolver from './publication_resolver.js';
import questionResolver from './question_resolver.js';
import reviewResolver from './review_resolver.js';
import purchaseResolver from './purchase_resolver.js';

import lodash from 'lodash';

const resolvers = lodash.merge(
    authResolver, 
    productResolver, 
    categoryResolver, 
    shoppingCartResolver,
    wishListResolver,
    publicationResolver,
    questionResolver,
    reviewResolver,
    purchaseResolver,
);

export default resolvers;