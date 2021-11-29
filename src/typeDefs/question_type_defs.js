import { gql } from 'apollo-server';

const questionTypeDefs = gql`

    type Answer {
        _id: String!
        date: String!
        text: String!
    }
    
    input AnswerInput {
        text: String!
    }

    type Question {
        _id: String!
        publication: Publication!
        date: String!
        userId: Int!
        text: String!
        answer: Answer
        status: String!
    }

    input QuestionInput {
        publication: String!
        userId: Int!
        text: String!
        status: String!
    }

    input UpdateQuestionInput {
        _id: String!
        publication: String!
        answer: AnswerInput!
        status: String!
    }

    extend type Query {
        questionsByPublication( publicationId: String! ): [Question]
        questionsByUserId( userId: Int! ): [Question]
    }

    extend type Mutation {
        createQuestion( questionInput: QuestionInput! ): Question!
        answerQuestion( userId: Int!, answerInput: UpdateQuestionInput! ): Question!
    }

`;

export default questionTypeDefs;