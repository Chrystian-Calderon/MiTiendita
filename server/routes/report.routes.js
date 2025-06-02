import express from 'express';
import ReportController from '../controllers/report.controller.js';

const reportRouter = ({ reportModel }) => {
  const router = express.Router();
  const controller = new ReportController({ reportModel });

  router.post('/cost-sales', controller.getCostsAndSales);
  router.post('/best-selling-products', controller.getBestSellingProducts);
  router.post('/best-selling-dishes', controller.getBestSellingDishes);

  return router;
}

export default reportRouter;