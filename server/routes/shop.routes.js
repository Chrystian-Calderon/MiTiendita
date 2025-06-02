import express from 'express';
import ShopController from '../controllers/shop.controller.js';

const shopRouter = ({ shopModel }) => {
  const router = express.Router();
  const controller = new ShopController({ shopModel });

  router.get('/', controller.getShop);
  router.post('/', controller.createShop);
  router.put('/:id', controller.updateShop);
  router.delete('/:id', controller.deleteShop);

  return router;
}

export default shopRouter;