import { v4 as uuid } from 'uuid';

class ProductController {
  constructor({ productModel }) {
    this.model = productModel;
  }

  getProducts = async (req, res) => {
    try {
      const result = await this.model.findAll();
      if (result.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos' });
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }

  createProduct = async (req, res) => {
    const { nombre, tipo, unidad_medida, precio_compra_unitario, precio_venta_unitario, stock_actual } = req.body;
    try {
      const id = uuid();
      const result = await this.model.create({
        id,
        nombre,
        tipo,
        unidad_medida,
        precio_compra_unitario,
        precio_venta_unitario,
        stock_actual
      });
      if (!result.success) {
        return res.status(400).json({ error: 'Error al crear el producto ingresado' });
      }
      return res.status(201).json({ message: 'Producto creado correctamente', success: result.success });
    } catch (e) {
      return res.status(500).json({ error: 'Error al crear el producto' });
    }
  }

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, unidad_medida, precio_compra_unitario, precio_venta_unitario, stock_actual } = req.body;

    try {
      const result = await this.model.update({
        id,
        nombre,
        tipo,
        unidad_medida,
        precio_compra_unitario,
        precio_venta_unitario,
        stock_actual
      });
      if (!result.success) {
        return res.status(400).json({ error: 'Error al actualizar el producto ingresado' });
      }
      return res.status(200).json({ message: 'Producto actualizado correctamente', success: result.success });
    } catch (e) {
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  }

  deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await this.model.delete({ id });
      if (!result.deleted) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (e) {
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
}

export default ProductController;