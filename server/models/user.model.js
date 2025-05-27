import connection from '../config/db.js';

class UserModel {
  async getUserAndPassword({ username, password }) {
    const conn = await connection();
    const [rows] = await conn.query(
      'SELECT * FROM usuarios WHERE nombre = ? AND password_hash = ?',
      [username, password]
    );
    return rows[0];
  }
}

export default new UserModel();