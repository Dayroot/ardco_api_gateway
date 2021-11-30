import { RESTDataSource } from "apollo-datasource-rest";
import serverConfig from '../server.js';

class PurchaseAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = serverConfig.purchase_api_url;
    }

//====================PURCHASE==================================

    //Get a purchase by user id
    async purchasesByUserId( userId ){
        return await this.get(`/purchase?userId=${userId}`)
    }

    //change the status of a purchased product
    async changeProductStatus(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/purchase/changeProductStatus/`, data);
    }

    //Create a purchase
    async createPurchase(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/purchase/`, data);
    }

    //Delete a purchase
    async deletePurchase( purchaseId ){
        return await this.delete(`/purchase/${purchaseId}`)
    }
}

export default PurchaseAPI;