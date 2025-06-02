import { useState } from "react";
import { createDish } from "../services/dishService";

const AddDishModal = ({ onClose, onMessage }) => {
  const [form, setForm] = useState({ nombre: "", precio_venta: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createDish(form);
    if (response.error) {
      onMessage({ type: "error", message: response.error });
    } else {
      onMessage({ type: "success", message: "Plato agregado correctamente" });
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar plato</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Precio Venta:</label>
            <input type="number" name="precio_venta" value={form.precio_venta} onChange={handleChange} required />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDishModal;