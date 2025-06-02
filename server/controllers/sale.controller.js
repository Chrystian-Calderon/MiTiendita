import { v4 as uuid } from 'uuid';
import productModel from '../models/product.model.js';

class SaleController {
  constructor({ saleModel }) {
    this.model = saleModel;
  }

  getSales = async (req, res) => {
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

  createSale = async (req, res) => {
    const { fecha, total, cantidad, producto_id, plato_id } = req.body;

    try {
      if (!producto_id) {
        const id = uuid();
        const resultSale = await this.model.create({ id, fecha, total });
        if (!resultSale.success) {
          return res.status(400).json({ error: 'Error al crear la venta ingresada' });
        }
        const resultSaleDetail = await this.model.createDetail({
          id: uuid(),
          venta_id: id,
          plato_id,
          cantidad,
          precio_unitario: total / cantidad
        });
        if (!resultSaleDetail.success) {
          return res.status(400).json({ error: 'Error al crear el detalle de la venta' });
        }
        return res.status(201).json({ message: 'Venta creada correctamente', success: true });
      } else {
        let { stock_actual } = await productModel.findById({ id: producto_id });
        stock_actual -= cantidad;
        const resultProduct = await productModel.updateStock({ id: producto_id, stock_actual });
        if (!resultProduct.success) {
          return res.status(400).json({ error: 'Error al actualizar el stock del producto' });
        }
        const id = uuid();
        const resultSale = await this.model.create({ id, fecha, total });
        if (!resultSale.success) {
          return res.status(400).json({ error: 'Error al crear la venta ingresada' });
        }
        const resultSaleDetail = await this.model.createDetail({
          id: uuid(),
          venta_id: id,
          producto_id,
          cantidad,
          precio_unitario: total / cantidad
        });
        if (!resultSaleDetail.success) {
          return res.status(400).json({ error: 'Error al crear el detalle de la venta' });
        }
        return res.status(201).json({ message: 'Venta creada correctamente', success: true });
      }
    } catch (e) {
      return res.status(500).json({ error: 'Error al crear la venta' });
    }
  }

  updateSale = async (req, res) => {
    const { id } = req.params;
    const { fecha, total, producto_id, plato_id, cantidad } = req.body;
    const cant = cantidad;

    try {
      if (!producto_id) {
        const result = await this.model.update({ id, fecha, total });
        if (!result.success) {
          return res.status(400).json({ error: 'Error al actualizar la venta ingresada' });
        }
        const resultDetail = await this.model.updateDetail({
          venta_id: id,
          producto_id: null,
          plato_id,
          cantidad,
          precio_unitario: total / cantidad
        });
        if (!resultDetail.success) {
          return res.status(400).json({ error: 'Error al actualizar el detalle de la venta' });
        }
        return res.status(200).json({ message: 'Venta actualizada correctamente', success: true });
      } else {
        let { cantidad } = await this.model.findByIdDetail({ id });
        let { stock_actual } = await productModel.findById({ id: producto_id });
        stock_actual = (stock_actual + cantidad) - cant;
        const result = await this.model.update({ id, fecha, total });
        if (!result.success) {
          return res.status(400).json({ error: 'Error al actualizar la venta ingresada' });
        }
        const resultDetail = await this.model.updateDetail({
          venta_id: id,
          producto_id,
          plato_id: null,
          cantidad: cant,
          precio_unitario: total / cantidad
        });
        if (!resultDetail.success) {
          return res.status(400).json({ error: 'Error al actualizar el detalle de la venta' });
        }
        const resultProduct = await productModel.updateStock({ id: producto_id, stock_actual });
        if (!resultProduct.success) {
          return res.status(400).json({ error: 'Error al actualizar el stock del producto' });
        }
        return res.status(200).json({ message: 'Venta actualizada correctamente', success: true });
      }
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: 'Error al actualizar la venta' });
    }
  }

  deleteSale = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await this.model.delete({ id });
      if (!result.deleted) {
        return res.status(400).json({ error: 'Error al eliminar la venta' });
      }
      return res.status(200).json({ message: 'Venta eliminada correctamente', success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Error al eliminar la venta' });
    }
  }
}

export default SaleController;