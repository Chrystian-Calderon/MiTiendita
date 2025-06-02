import express from 'express';
import DishController from '../controllers/dishes.controller.js';

const dishRouter = ({ dishModel }) => {
  const router = express.Router();
  const controller = new DishController({ dishModel });

  router.get('/', controller.getDishes);
  router.post('/', controller.createDish);
  router.put('/:id', controller.updateDish);
  router.delete('/:id', controller.deleteDish);

  return router;
}

export default dishRouter;