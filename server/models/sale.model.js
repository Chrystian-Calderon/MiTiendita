import connection from '../config/db.js';

class SaleModel {
  static async findAll() {
    const conn = await connection();
    const [rows] = await conn.query('SELECT * FROM ventas ORDER BY fecha DESC');
    return rows;
  }

  static async create({ fecha, total }) {
    const conn = await connection();
    const [result] = await conn.query(
      'INSERT INTO ventas (fecha, total) VALUES (?, ?)',
      [fecha, total]
    );
    return { id: result.insertId, fecha, total };
  }

  static async delete(id) {
    const conn = await connection();
    await conn.query('DELETE FROM ventas WHERE id = ?', [id]);
    return { deleted: true };
  }
}

export default new SaleModel();