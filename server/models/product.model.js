import connection from '../config/db.js';

class ProductModel {
  async findAll() {
    const [rows] = await connection.query('SELECT * FROM productos');
    return rows;
  }

  async findById({ id }) {
    const [rows] = await connection.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  }

  async create({ id, nombre, tipo, unidad_medida, cantidad_por_presentacion, precio_compra_unitario, precio_venta_unitario, stock_actual }) {
    const [result] = await connection.query(
      'INSERT INTO productos (id, nombre, tipo, unidad_medida, cantidad_por_presentacion, precio_compra_unitario, precio_venta_unitario, stock_actual) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, nombre, tipo, unidad_medida, cantidad_por_presentacion, precio_compra_unitario, precio_venta_unitario, stock_actual]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async update({ id, nombre, tipo, unidad_medida, cantidad_por_presentacion, precio_compra_unitario, precio_venta_unitario, stock_actual }) {
    const [result] = await connection.query(
      'UPDATE productos SET nombre = ?, tipo = ?, unidad_medida = ?, cantidad_por_presentacion = ?, precio_compra_unitario = ?, precio_venta_unitario = ?, stock_actual = ? WHERE id = ?',
      [nombre, tipo, unidad_medida, cantidad_por_presentacion, precio_compra_unitario, precio_venta_unitario, stock_actual, id]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async updateStock({ id, stock_actual }) {
    const [result] = await connection.query(
      'UPDATE productos SET stock_actual = ? WHERE id = ?',
      [stock_actual, id]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async delete({ id }) {
    const [result] = await connection.query('DELETE FROM productos WHERE id = ?', [id]);
    return { deleted: (result.affectedRows > 0) ? true : false};
  }

  async findByName({ nombre }) {
    const [rows] = await connection.query('SELECT id, nombre FROM productos WHERE nombre LIKE ?', [`%${nombre}%`]);
    return rows;
  }
}

export default new ProductModel();