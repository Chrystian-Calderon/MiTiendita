import express from 'express';
import ReportController from '../controllers/report.controller.js';

const reportRouter = ({ reportModel }) => {
  const router = express.Router();
  const controller = new ReportController({ reportModel });

  router.get('/cost-sales', controller.getCostsAndSales);
  router.get('/best-selling-products', controller.getBestSellingProducts);
  router.get('/best-selling-dishes', controller.getBestSellingDishes);

  return router;
}

export default reportRouter;