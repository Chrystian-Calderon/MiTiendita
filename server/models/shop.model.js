import connection from '../config/db.js';

class PurchaseModel {
  async findAll() {
    const [rows] = await connection.query('SELECT c.id as compra_id, cd.producto_id, p.nombre, c.fecha, c.total FROM compras c LEFT JOIN compras_detalle cd ON c.id = cd.compra_id LEFT JOIN productos p ON cd.producto_id = p.id ORDER BY fecha DESC;');
    return rows;
  }

  async findByIdDetail({ id }) {
    const [rows] = await connection.query('SELECT * FROM compras_detalle WHERE compra_id = ?', [id]);
    return rows[0];
  }

  async create({ id, fecha, total }) {
    const [result] = await connection.query(
      'INSERT INTO compras (id, fecha, total) VALUES (?, ?, ?)',
      [id, fecha, total]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async createDetail({ id, compra_id, producto_id, cantidad, precio_unitario }) {
    const [result] = await connection.query(
      'INSERT INTO compras_detalle (id, compra_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
      [id, compra_id, producto_id, cantidad, precio_unitario]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async update({ id, fecha, total }) {
    const [result] = await connection.query(
      'UPDATE compras SET fecha = ?, total = ? WHERE id = ?',
      [fecha, total, id]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async updateDetail({ compra_id, producto_id, cantidad, precio_unitario }) {
    const [result] = await connection.query(
      'UPDATE compras_detalle SET cantidad = ?, precio_unitario = ? WHERE compra_id = ? AND producto_id = ?',
      [cantidad, precio_unitario, compra_id, producto_id]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async delete({ id }) {
    const [result] = await connection.query('DELETE FROM compras WHERE id = ?', [id]);
    return { deleted: (result.affectedRows > 0) ? true : false };
  }

  async deleteDetail({ compra_id, producto_id }) {
    const [result] = await connection.query('DELETE FROM compras_detalle WHERE compra_id = ? AND producto_id = ?', [compra_id, producto_id]);
    return { deleted: (result.affectedRows > 0) ? true : false };
  }
}

export default new PurchaseModel();