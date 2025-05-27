import connection from '../config/db.js';

class PurchaseModel {
  static async findAll() {
    const conn = await connection();
    const [rows] = await conn.query('SELECT * FROM compras ORDER BY fecha DESC');
    return rows;
  }

  static async create({ fecha, total }) {
    const conn = await connection();
    const [result] = await conn.query(
      'INSERT INTO compras (fecha, total) VALUES (?, ?)',
      [fecha, total]
    );
    return { id: result.insertId, fecha, total };
  }

  static async delete(id) {
    const conn = await connection();
    await conn.query('DELETE FROM compras WHERE id = ?', [id]);
    return { deleted: true };
  }
}

export default new PurchaseModel();