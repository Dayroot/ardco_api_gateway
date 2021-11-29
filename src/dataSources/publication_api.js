import { RESTDataSource } from "apollo-datasource-rest";
import serverConfig from '../server.js';

class PublicationAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.publication_api_url;
    }

//====================PUBLICATION==================================

    //List all publications
    async listAllPublications(){
        return await this.get('/publication');
    }

    //List publications by user id
    async getPublicationsbyUserId(userId){
        return await this.get(`/publication?userId=${userId}`);
    }

    //Get a publication by id
    async getPublicationbyId(publicationId){
        return await this.get(`/publication?_id=${publicationId}`);
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

}

export default PublicationAPI;