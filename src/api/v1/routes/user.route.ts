import { Router } from 'express'
import { UserController } from '../controllers/user.controller';
import { AuthValidator } from '../validators/auth.validator';

const userRoutes = Router();

const userController = new UserController();
const authValidator = new AuthValidator();

userRoutes.post('/user/signin', authValidator.validateSignRequest(), userController.signIn());
userRoutes.post('/user/signup', userController.signUp());
userRoutes.post('/user/order', authValidator.validateAuthRequest(), userController.postOrder());

export { userRoutes };