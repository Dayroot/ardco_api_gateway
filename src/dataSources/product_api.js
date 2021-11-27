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

    //Create a product
    async createProduct(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/product/`, data);
    }

    //update a product
    async updateProduct(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/product/`, data);
    }

    //Detele a product
    async deleteProduct(productId){
        return await this.delete(`/product/${productId}`);
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

    


}

export default ProductAPI;