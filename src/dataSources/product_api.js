import { RESTDataSource } from "apollo-datasource-rest";
import serverConfig from '../server.js';

class ProductAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.product_api_url;
    }

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
        return await this.put(`/product/`, data);
    }

    //Detele a product
    async deleteProduct(productId){
        return await this.delete(`/product/${productId}`);
    }

    //List all categories
    async listCategories(){
        return await this.get('/category/');
    }

}

export default ProductAPI;