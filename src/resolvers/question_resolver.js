import { ApolloError } from "apollo-server";

const questionResolver = {
    
    Query: {

        questionsByPublication: async(root, { publicationId }, { dataSources }) => {
            
            //Get questions by publication id
            let questions = ( await dataSources.publicationAPI.questionsByPublication( publicationId ) ).body;
            
            //Get the product data corresponding to the publication where the question was asked
            const productId = questions[0].publication.product;
            const productData = (await dataSources.productAPI.productById( productId )).body[0];
            
            //Populate the product field of the publication
            questions = await questions.map( ques => {
               ques.publication.product = productData;
               return ques
            });

            return questions
        },

        questionsByUserId: async(root, { userId }, { dataSources, userIdToken }) => {
            
            if( userId == userIdToken){

                //Get questions by user id
                let questions = ( await dataSources.publicationAPI.questionsByUserId( userId ) ).body;

                //Populate the product field of the publication
                questions = await questions.map( async(ques) => {
             
                    const productId = ques.publication.product;
                    const productData = ( await dataSources.productAPI.productById( productId )).body[0];
                    ques.publication.product = productData;
                    
                    return ques
                });

                return questions
            }
            else 
                return null
        },

    },

    Mutation: {

        createQuestion: async(root, { questionInput }, { dataSources, userIdToken }) => {

            if( questionInput.userId == userIdToken ){      
                let newQuestion;
                try {
                    //Create a question
                    newQuestion = ( await dataSources.publicationAPI.createQuestion( questionInput ) ).body;
                    
                    //Get the product data corresponding to the publication where the question was asked
                    const productId = newQuestion.publication.product;
                    const productData = ( await dataSources.productAPI.productById( productId ) ).body[0];

                    //Populate the product field of the publication
                    newQuestion.publication.product = productData;
                
                    return newQuestion

                } catch (error) {
                    //Rollback
                    if( newQuestion )
                        await dataSources.publicationAPI.deleteQuestion( newQuestion._id );
                    
                    console.log(`[ERROR] ${error}`);
                    throw new ApolloError("Unexpected error", 500)
                }
            }
            else
                return null
        },

        answerQuestion: async(root, { userId, answerInput }, { dataSources, userIdToken }) => {

            if( userId == userIdToken ){
                
                let questionWithAsnwer;

                try {
                    //Get the publication to verify that the user who will answer the question is indeed the owner of the publication
                    const publication = ( await dataSources.publicationAPI.publicationbyId( answerInput.publication ) ).body[0];
                    const pubOwnerId = publication.userId;

                    if( userId == pubOwnerId ){
                        //Add answer to a question
                        questionWithAsnwer = ( await dataSources.publicationAPI.answerQuestion( answerInput ) ).body;

                        //Populate the product field of the publication
                        const productId = questionWithAsnwer.publication.product;
                        const productData = ( await dataSources.productAPI.productById( productId ) ).body[0];
                        questionWithAsnwer.publication.product = productData;
                        
                        return questionWithAsnwer
                    }

                } catch (error) {
                    //Rollback
                    if( questionWithAsnwer )
                        await dataSources.publicationAPI.answerQuestion( { ...answerInput, answer: null } );

                    console.log(`[ERROR] ${error}`);
                    throw new ApolloError("Unexpected error", 500)
                }
            }
            else
                return null
        },
    }
}

export default questionResolver;