import bcrypt from 'bcrypt';

class UserController {
  constructor({ userModel }) {
    this.model = userModel;
  }

  verifyUserAndPassword = async (req, res) => {
    const { username, password } = req.body;
    let passwordHash;

    try {
      if (!username || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
      if (username) {
        if (!/^[a-zA-Z]+$/.test(username)) {
          return res.status(400).json({ error: 'El nombre solo puede contener letras' });
        }
      }
      if (password) {
        if (!/^[a-zA-Z0-9]+$/.test(password)) {
          return res.status(400).json({ error: 'No se permiten caracteres especiales en la contraseña' });
        }
        passwordHash = await bcrypt.hash(password, 10);
      }

      const result = await this.model.getUserAndPassword({ username, password });
      if (!result) {
        return res.status(404).json({ error: 'Usuario o contraseña incorrectos' });
      }
      return res.status(200).json({ message: 'Usuario verificado correctamente', user: result });
    } catch (e) {
      res.status(500).json({ error: 'Error al verificar el usuario y la contraseña' });
    }
  }
}

export default UserController;