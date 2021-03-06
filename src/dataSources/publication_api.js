import { RESTDataSource } from "apollo-datasource-rest";
import serverConfig from '../server.js';

class PublicationAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.publication_api_url;
    }

//====================PUBLICATION==================================

    //List all publications
    async listPublications(){
        return await this.get('/publication');
    }

    //List publications by user id
    async publicationsbyUserId(userId){
        return await this.get(`/publication?userId=${userId}`);
    }

    //Get a publication by id
    async publicationbyId(publicationId){
        return await this.get(`/publication?_id=${publicationId}`);
    }

    //Get a publication by product id
    async publicationbyProductId(productId){
        return await this.get(`/publication?product=${productId}`);
    }

    //Create a new publication
    async createPublication(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/publication/`, data);
    }

    //Update a publication
    async updatePublication(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/publication/`, data);
    }

    //Delete a publication
    async deletePublication(publicationId){
        return await this.delete(`/publication/${publicationId}`);
    }

    //====================QUESTION==================================

    //List questions by publication
    async questionsByPublication(publicationId){
        return await this.get(`/question?publication=${publicationId}`);
    }

    //List questions by user id
    async questionsByUserId(userId){
        return await this.get(`/question?userId=${userId}`);
    }

    //Delete a question
    async deleteQuestion(questionId){
        return await this.delete(`/question/${questionId}`);
    }

    //Create a question
    async createQuestion(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/question/`, data);
    }

    //Add answer to question
    async answerQuestion(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.patch(`/question/`, data);
    }

    //====================REVIEW==================================

    //List reviews by publication
    async reviewsByPublication(publicationId){
        return await this.get(`/review?publication=${publicationId}`);
    }

    //List reviews by user id
    async reviewsByUserId(userId){
        return await this.get(`/review?userId=${userId}`);
    }

    //Create a question
    async createReview(data){
        data = new Object(JSON.parse(JSON.stringify(data)));
        return await this.post(`/review/`, data);
    }

    //Delete a review
    async deleteReview(reviewId){
        return await this.delete(`/review/${reviewId}`);
    }
}

export default PublicationAPI;