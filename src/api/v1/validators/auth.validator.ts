import { ValidatorFunction } from '../../../ts-coverage';

import { JWTMiddle } from 'jwt-middle';

const jwtMiddle = JWTMiddle.createJWTMiddle();

export class AuthValidator {

    validateSignRequest(): ValidatorFunction {
        return jwtMiddle.validateCredentials();
    }

    validateAuthRequest(): ValidatorFunction {
        return jwtMiddle.validateAuthToken();
    }
    
   
}