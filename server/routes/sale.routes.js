import express from 'express';
import SaleController from '../controllers/sale.controller.js';

const saleRouter = ({ saleModel }) => {
  const router = express.Router();
  const controller = new SaleController({ saleModel });

  router.get('/', controller.getSales);
  router.post('/', controller.createSale);
  router.put('/:id', controller.updateSale);
  router.delete('/:id', controller.deleteSale);

  return router;
}

export default saleRouter;