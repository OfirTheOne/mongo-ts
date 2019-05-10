import { MongoTS } from '../../lib'



MongoTS.setDefinitionMap({
    byField: {
        email: {       
                definition: { unique: true },
                type: String
        }
    },

    byDecorator: {
        'ArrayRef' : {
            definition: { default: [] }
        }
    }
})
