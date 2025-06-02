import connection from '../config/db.js';

class DishModel {
  async findAll() {
    const [rows] = await connection.query('SELECT * FROM platos');
    return rows;
  }

  async findById({ id }) {
    const [rows] = await connection.query('SELECT * FROM platos WHERE id = ?', [id]);
    return rows[0];
  }

  async create({ id, nombre, precio_venta }) {
    const [result] = await connection.query(
      'INSERT INTO platos (id, nombre, precio_venta) VALUES (?, ?, ?)',
      [id, nombre, precio_venta]
    );
    return { success: (result.affectedRows > 0) ? true : false };
  }

  async update({ id, nombre, precio_venta }) {
    const [result] = await connection.query(
      'UPDATE platos SET nombre = ?, precio_venta = ? WHERE id = ?',
      [nombre, precio_venta, id]
    );
    return { success: (result.affectedRows) ? true : false };
  }

  async delete({ id }) {
    const [result] = await connection.query('DELETE FROM platos WHERE id = ?', [id]);
    return { deleted: (result.affectedRows > 0) ? true : false };
  }
}

export default new DishModel();