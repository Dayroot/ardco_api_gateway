import { gql } from 'apollo-server';

const purchaseTypeDefs = gql`

    type Purchase {
        _id: String!
        date: String!
        userId: Int!
        products:[CartProduct]
        total: Int!
        status: String!
    }
    

`;

export default purchaseTypeDefs;