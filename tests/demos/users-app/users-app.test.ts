import './db/init';

import  { AdminModel} from './db/modals/admin';
import { Model, connection } from 'mongoose';



describe('AdminModel', function() {
    it('should apply restriction as expected', function(done) {
        drop('admins').then(() => {
            insertTwoAdminsWithSameEmail(done)
                .then(() => done(new Error('should throw error for duplicate email.')))
                .catch( (e) => {
                    if(e.errmsg && (e.errmsg as string)
                    .indexOf('E11000 duplicate key error collection: DB_Name.admins index: email') > -1) {
                        done();
                    } else {
                        done(e);
                    }
                });
        }).catch(done);

            
    })
})


async function insertTwoAdminsWithSameEmail(done) {

    const admins =  [
        {
            name: 'ofir',
            email: 'ofir@email.com',
            img: 'image/url/filename.png',
            hash: 'password10101'
        }, {
            name: 'nadav',
            email: 'ofir@email.com',
            img: 'image/url/filename.png',
            hash: 'mypassword'
        }
    ];
    const admin01 = new AdminModel(admins[0]);
    await admin01.save();

    const admin02 = new AdminModel(admins[1]);
    await admin02.save();

}

async function drop(modelName: string) {
    return await connection.dropCollection(modelName).catch(e => console.log(e));
}


async function seed(model: Model<any>, content: any[]) {
    return model.insertMany(content)
        .then( () => console.log('seed model successfully.'))
        .catch((e) => console.log(e));
}


