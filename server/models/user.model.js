import connection from '../config/db.js';
import bcrpypt from 'bcrypt';

class UserModel {
  async getUserAndPassword({ username, password }) {
    const [rows] = await connection.query(
      'SELECT id, password_hash FROM usuarios WHERE nombre = ?',
      [username]
    );
    const result = await bcrpypt.compare(password, rows[0].password_hash);
    if (result) return { id: rows[0].id, username };
    return null;
  }
}

export default new UserModel();