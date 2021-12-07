import { RESTDataSource } from "apollo-datasource-rest";
import serverConfig from '../server.js';

class ProductAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.product_api_url;
    }

//==============PRODUCT==================================

    //List all products
    async listProducts(){
        return await this.get('/product/');
    }

    //Get products by category
    async productsByCategory(categoryId){
        return await this.get(`/product?category=${categoryId}`);
    }

    //Get product by id
    async productById(productId){
        return await this.get(`/product?_id=${productId}`);
    }
    //List products by user id
    async productsByUserId(userId){
        return await this.get(`/product?userId=${userId}`);
    }

    //Create a new product
    async createProduct(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/product/`, data);
    }

    //update a product
    async updateProduct(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/product?type=normal-update`, data);
    }

    //Detele a product
    async deleteProduct(productId){
        return await this.delete(`/product/${productId}`);
    }

    //Update reviews of the product
    async updateReviewsProduct(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/product?type=update-review`, data);
    }

//==============CATEGORY==================================

    //List all categories
    async listCategories(){
        return await this.get('/category/');
    }

    //Create a new category
    async createCategory(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post('/category/', data)
    }

    //Update a category
    async updateCategory(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch('/category/', data)
    }

//==============SHOPPING CART==================================

    //Create a Shopping cart
    async createShoppingCart(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/shopping-cart/`, data);
    }

    //Get a shopping cart by user id
    async shoppingCartByUserId(userId){
        return await this.get(`/shopping-cart?userId=${userId}`);
    }

    //Add a product to the shopping cart, or change the units of the product 
    //added to the shopping cart 
    async updateCartProduct(userId, data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/shopping-cart?type=updateProduct&userId=${userId}`, data);
    }

    //Remove a product from the cart
    async deleteCartProduct(userId, data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/shopping-cart?type=deleteProduct&userId=${userId}`, data);
    }

    //Delete a Shopping cart
    async deleteShoppingCart(userId){
        return await this.delete(`/shopping-cart/${userId}`);
    }
    
//=================Wish List==================================

    //Get a wish list by user id
    async wishListByUserId(userId){
        return await this.get(`/wish-list?userId=${userId}`);
    }

    //Create a new Wish List
    async createWishList(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/wish-list/`, data);
    }

    //Delete a Wish List
    async deleteWishList(userId){
        return await this.delete(`/wish-list/${userId}`);
    }

    //Add a product to the wish list, or change the units of the product 
    //added to the wish list. 
    async updateWishListProduct(userId, data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/wish-list?type=updateProduct&userId=${userId}`, data);
    }

    //Remove a product from the wish list
    async deleteWishListProduct(userId, data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/wish-list?type=deleteProduct&userId=${userId}`, data);
    }

}

export default ProductAPI;