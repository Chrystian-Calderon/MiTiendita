import connection from '../config/db.js';

class ProductModel {
  static async findAll() {
    const conn = await connection();
    const [rows] = await conn.query('SELECT * FROM productos');
    return rows;
  }

  static async findById(id) {
    const conn = await connection();
    const [rows] = await conn.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ nombre, stock_actual, unidad_medida, precio_venta }) {
    const conn = await connection();
    const [result] = await conn.query(
      'INSERT INTO productos (nombre, stock_actual, unidad_medida, precio_venta) VALUES (?, ?, ?, ?)',
      [nombre, stock_actual, unidad_medida, precio_venta]
    );
    return { id: result.insertId, nombre, stock_actual, unidad_medida, precio_venta };
  }

  static async update(id, { nombre, stock_actual, unidad_medida, precio_venta }) {
    const conn = await connection();
    await conn.query(
      'UPDATE productos SET nombre = ?, stock_actual = ?, unidad_medida = ?, precio_venta = ? WHERE id = ?',
      [nombre, stock_actual, unidad_medida, precio_venta, id]
    );
    return { id, nombre, stock_actual, unidad_medida, precio_venta };
  }

  static async delete(id) {
    const conn = await connection();
    await conn.query('DELETE FROM productos WHERE id = ?', [id]);
    return { deleted: true };
  }
}

export default new ProductModel();