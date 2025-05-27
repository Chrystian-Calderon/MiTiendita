import connection from '../config/db.js';

class DishModel {
  static async findAll() {
    const conn = await connection();
    const [rows] = await conn.query('SELECT * FROM platos');
    return rows;
  }

  static async findById(id) {
    const conn = await connection();
    const [rows] = await conn.query('SELECT * FROM platos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ nombre, precio_venta }) {
    const conn = await connection();
    const [result] = await conn.query(
      'INSERT INTO platos (nombre, precio_venta) VALUES (?, ?)',
      [nombre, precio_venta]
    );
    return { id: result.insertId, nombre, precio_venta };
  }

  static async update(id, { nombre, precio_venta }) {
    const conn = await connection();
    await conn.query(
      'UPDATE platos SET nombre = ?, precio_venta = ? WHERE id = ?',
      [nombre, precio_venta, id]
    );
    return { id, nombre, precio_venta };
  }

  static async delete(id) {
    const conn = await connection();
    await conn.query('DELETE FROM platos WHERE id = ?', [id]);
    return { deleted: true };
  }
}

export default new DishModel();