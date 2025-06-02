import { v4 as uuid } from 'uuid';

class DishController {
  constructor({ dishModel }) {
    this.model = dishModel;
  }

  getDishes = async (req, res) => {
    try {
      const result = await this.model.findAll();
      if (result.length === 0) {
        return res.status(404).json({ error: 'No se encontraron platos' });
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los platos' });
    }
  }

  updateDish = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio_venta } = req.body;
    try {
      const updatedDish = await this.model.update({ id, nombre, precio_venta });
      if (!updatedDish.success) return res.status(400).json({ error: 'Error al actualizar el plato' });
      return res.status(200).json({ message: 'Plato actualizado correctamente', success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Error al actualizar el plato' });
    }
  }

  createDish = async (req, res) => {
    const { nombre, precio_venta } = req.body;
    try {
      const newDish = await this.model.create({ id: uuid(), nombre, precio_venta });
      if (!newDish.success) {
        return res.status(400).json({ error: 'Error al crear el plato' });
      }
      return res.status(201).json(newDish);
    } catch (e) {
      return res.status(500).json({ error: 'Error al crear el plato' });
    }
  }

  deleteDish = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.model.delete({ id });
      if (!result.deleted) {
        return res.status(400).json({ error: 'Error al eliminar el plato' });
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al eliminar el plato' });
    }
  }
}

export default DishController;