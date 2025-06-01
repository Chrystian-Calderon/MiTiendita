import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import userModel from './models/user.model.js';
import productModel from './models/product.model.js';
config();

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));
app.use(express.json());
const PORT = process.env.PORT;

app.use('/login', userRouter({ userModel }));
app.use('/products', productRouter({ productModel }));

app.listen(PORT, () => {
  console.log(`Server iniciado en puerto ${PORT}`);
});