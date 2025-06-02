import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import shopRouter from './routes/shop.routes.js';
import dishRouter from './routes/dishes.routes.js';
import saleRouter from './routes/sale.routes.js';
import reportRouter from './routes/report.routes.js';
import userModel from './models/user.model.js';
import productModel from './models/product.model.js';
import shopModel from './models/shop.model.js';
import dishModel from './models/dishes.model.js';
import saleModel from './models/sale.model.js';
import reportModel from './models/report.model.js';
config();

const app = express();
app.use(cors(
  {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }
));
app.use(express.json());
const PORT = process.env.PORT;

app.use('/login', userRouter({ userModel }));
app.use('/products', productRouter({ productModel }));
app.use('/shop', shopRouter({ shopModel }));
app.use('/dishes', dishRouter({ dishModel }));
app.use('/sales', saleRouter({ saleModel }));
app.use('/reports', reportRouter({ reportModel }));

app.listen(PORT, () => {
  console.log(`Server iniciado en puerto ${PORT}`);
});