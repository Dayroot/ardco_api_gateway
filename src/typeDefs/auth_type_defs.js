import { gql } from 'apollo-server';

const authTypeDefs = gql `
    type Tokens {
        refresh: String!
        access: String!
        fullname: String!
    }

    type Access {
        access: String!
    }

    input CredentialsInput {
        username: String!
        password: String!
    }

    input SingUpInput {
        username: String!
        password: String!
        fullname: String!
        email: String!   
    }

    type UserDetail {
        id: Int!
        username: String!
        fullname: String!
        datebirth: String
        email: String!
        identification: String
        phone_number: String
        address: String
    }

    input UserUpdateInput {
        username: String
        password: String
        fullname: String
        datebirth: String
        email: String
        identification: String
        phone_number: String
        address: String
    }

    type response {
        error: String
        result: String
    }

    type Mutation {
        signUpUser(userInput: SingUpInput): Tokens!
        logIn(credentials: CredentialsInput!): Tokens!
        refreshToken(refresh: String!): Access!
        updateUser(userId: Int!, userUpdateInput: UserUpdateInput!): UserDetail
        deleteUser(userId: Int!): response
    }

    type Query {
        userDetailById(userId: Int!): UserDetail
    }

`;

export default authTypeDefs;