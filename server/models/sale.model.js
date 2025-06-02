import connection from '../config/db.js';

class SaleModel {
  async findAll() {
    const [rows] = await connection.query('SELECT vd.venta_id, vd.producto_id, vd.plato_id, p.nombre as producto_nombre, pl.nombre as plato_nombre, v.fecha, vd.cantidad, v.total FROM ventas v LEFT JOIN ventas_detalle vd ON v.id = vd.venta_id LEFT JOIN productos p ON vd.producto_id = p.id LEFT JOIN platos pl ON vd.plato_id = pl.id ORDER BY fecha DESC');
    return rows;
  }

  async findByIdDetail({ id }) {
    const [rows] = await connection.query('SELECT * FROM ventas_detalle WHERE venta_id = ?', [id]);
    return rows[0];
  }

  async create({ id, fecha, total }) {
    const [result] = await connection.query(
      'INSERT INTO ventas (id, fecha, total) VALUES (?, ?, ?)',
      [id, fecha, total]
    );
    return { success: (result.affectedRows > 0) };
  }

  async createDetail({ id, venta_id, producto_id = null, plato_id = null, cantidad, precio_unitario }) {
    const [result] = await connection.query(
      'INSERT INTO ventas_detalle (id, venta_id, producto_id, plato_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?, ?)',
      [id, venta_id, producto_id, plato_id, cantidad, precio_unitario]
    );
    return { success: (result.affectedRows > 0) };
  }

  async update({ id, fecha, total }) {
    const [result] = await connection.query(
      'UPDATE ventas SET fecha = ?, total = ? WHERE id = ?',
      [fecha, total, id]
    );
    return { success: (result.affectedRows > 0) };
  }

  async updateDetail({ venta_id, producto_id = null, plato_id = null, cantidad, precio_unitario }) {
    const [result] = await connection.query(
      `UPDATE ventas_detalle SET cantidad = ?, precio_unitario = ?, ${(!producto_id) ? 'plato_id = ?, producto_id = null' : 'producto_id = ?, plato_id = null'} WHERE venta_id = ?`,
      [cantidad, precio_unitario, (!producto_id) ? plato_id : producto_id, venta_id]
    );
    return { success: (result.affectedRows > 0) };
  }

  async delete({ id }) {
    const [result] = await connection.query('DELETE FROM ventas WHERE id = ?', [id]);
    return { deleted: (result.affectedRows > 0) };
  }

  async deleteDetail({ venta_id, producto_id = null, plato_id = null }) {
    const [result] = await connection.query(
      'DELETE FROM ventas_detalle WHERE venta_id = ? AND (producto_id = ? OR plato_id = ?)',
      [venta_id, producto_id, plato_id]
    );
    return { deleted: (result.affectedRows > 0) };
  }
}

export default new SaleModel();