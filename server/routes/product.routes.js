import express from 'express';
import ProductController from '../controllers/product.controller.js';

const productRouter = ({ productModel }) => {
  const router = express.Router();
  const controller = new ProductController({ productModel });

  router.get('/', controller.getProducts);
  router.post('/', controller.createProduct);
  router.put('/:id', controller.updateProduct);
  router.delete('/:id', controller.deleteProduct);

  return router;
}

export default productRouter;