const questionResolver = {
    Query: {

        questionsByPublication: async(root, { publicationId }, { dataSources }) => {

            let questions = ( await dataSources.publicationAPI.questionsByPublication( publicationId ) ).body;
            const productId = questions[0].publication.product;
            const productData = (await dataSources.productAPI.productById( productId )).body[0];
            
            questions = questions.map( ques => {
               ques.publication.product = productData;
               return ques
            });

            return questions
        },

        questionsByUserId: async(root, { userId }, { dataSources, userIdToken }) => {
            if( userId == userIdToken){
                let questions = ( await dataSources.publicationAPI.questionsByUserId( userId ) ).body;

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

                let question = ( await dataSources.publicationAPI.createQuestion( questionInput ) ).body;

                const productId = question.publication.product;
                const productData = ( await dataSources.productAPI.productById( productId ) ).body[0];
                question.publication.product = productData;
                
                return question
            }
            else
                return null
        },

        answerQuestion: async(root, { userId, answerInput }, { dataSources, userIdToken }) => {

            if( userId == userIdToken ){
                const publication = ( await dataSources.publicationAPI.getPublicationbyId( answerInput.publication ) ).body[0];
                const pubOwnerId = publication.userId;

                if( userId == pubOwnerId ){
                    let question = ( await dataSources.publicationAPI.answerQuestion( answerInput ) ).body;

                    const productId = question.publication.product;
                    const productData = ( await dataSources.productAPI.productById( productId ) ).body[0];
                    question.publication.product = productData;
                    
                    return question
                }
            }
            else
                return null
        },
    }
}

export default questionResolver;