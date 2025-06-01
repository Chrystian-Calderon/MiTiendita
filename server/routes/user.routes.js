import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = ({ userModel }) => {
  const router = express.Router();
  const controller = new UserController({ userModel });

  router.post('/', controller.verifyUserAndPassword);

  return router;
}

export default userRouter;