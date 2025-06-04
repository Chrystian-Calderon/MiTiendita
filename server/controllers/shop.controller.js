import { v4 as uuid } from 'uuid';
import productModel from '../models/product.model.js';

class ShopController {
  constructor({ shopModel }) {
    this.model = shopModel;
  }

  getShop = async (req, res) => {
    try {
      const result = await this.model.findAll();
      if (result.length === 0) {
        return res.status(404).json({ error: 'No se encontraron ventas' });
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener las ventas' });
    }
  }

  createShop = async (req, res) => {
    const { fecha, total, cantidad, producto_id, producto } = req.body;
    try {
      if (!producto) {
        const id = uuid();
        const resultShop = await this.model.create({
          id,
          fecha,
          total
        });
        const resultShopDetail = await this.model.createDetail({
          id: uuid(),
          compra_id: id,
          producto_id,
          cantidad,
          precio_unitario: total / parseInt(cantidad)
        });
        let { stock_actual } = await productModel.findById({ id: producto_id });
        stock_actual += parseInt(cantidad);
        const resultProduct = await productModel.updateStock({ id: producto_id, stock_actual });
        if (!resultShop.success && !resultShopDetail.success && !resultProduct.success) {
          return res.status(400).json({ error: 'Error al crear la venta ingresada' });
        }
        return res.status(201).json({ message: 'Venta creada correctamente', success: true });
      } else {
        const producto_id = uuid();
        const resultProduct = await productModel.create({
          id: producto_id,
          nombre: producto.nombre,
          tipo: producto.tipo,
          unidad_medida: producto.unidad_medida,
          precio_compra_unitario: total / parseInt(cantidad),
          precio_venta_unitario: producto.precio_venta_unitario,
          stock_actual: parseInt(cantidad)
        });
        const compra_id = uuid();
        const resultShop = await this.model.create({
          id: compra_id,
          fecha,
          total
        });
        const resultShopDetail = await this.model.createDetail({
          id: uuid(),
          compra_id: compra_id,
          producto_id: producto_id,
          cantidad,
          precio_unitario: total / parseInt(cantidad)
        });
        if (!resultProduct.success || !resultShop.success || !resultShopDetail.success) {
          return res.status(400).json({ error: 'Error al crear la venta ingresada' });
        }
        return res.status(201).json({ message: 'Venta creada correctamente', success: true });
      }
    } catch (e) {
      return res.status(500).json({ error: 'Error al crear la venta' });
    }
  }

  updateShop = async (req, res) => {
    const { id } = req.params;
    const { fecha, total, cantidad, precio_unitario, producto_id } = req.body;
    const cant = cantidad;

    try {
      let { cantidad } = await this.model.findByIdDetail({ id });
      let { stock_actual } = await productModel.findById({ id: producto_id });
      const result = await this.model.update({
        id,
        fecha,
        total
      });
      const resultDetail = await this.model.updateDetail({
        compra_id: id,
        producto_id,
        cantidad: cant,
        precio_unitario
      });
      if (!result.success || !resultDetail.success) {
        return res.status(400).json({ error: 'Error al actualizar la venta ingresada' });
      }
      stock_actual = (stock_actual - cantidad) + cant;
      const resultProduct = await productModel.updateStock({ id: producto_id, stock_actual });
      if (!resultProduct.success) {
        return res.status(400).json({ error: 'Error al actualizar el stock del producto' });
      }
      return res.status(200).json({ message: 'Venta actualizada correctamente', success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Error al actualizar la venta' });
    }
  }

  deleteShop = async (req, res) => {
    const { id } = req.params;
    const { producto_id } = req.body;

    try {
      const { cantidad } = await this.model.findByIdDetail({ id });
      const result = await this.model.delete({ id });
      if (!result.deleted) return res.status(404).json({ error: 'Venta no encontrada' });
      let { stock_actual } = await productModel.findById({ id: producto_id });
      stock_actual -= cantidad;
      const resultProduct = await productModel.updateStock({ id: producto_id, stock_actual });
      if (!resultProduct.success) {
        return res.status(400).json({ error: 'Error al actualizar el stock del producto' });
      }
      return res.status(200).json({ message: 'Venta eliminada correctamente', success: true });
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: 'Error al eliminar la venta' });
    }
  }
}

export default ShopController;