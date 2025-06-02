import { useState, useEffect } from "react";
import { updateShopping } from "../services/shopService";
import { getProducts } from "../services/productService";

const EditShoppingModal = ({ data, onClose, onMessage }) => {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    fecha: "",
    total: "",
    cantidad: "",
    precio_unitario: "",
    producto_id: "",
    producto_nombre: ""
  });

  useEffect(() => {
    if (data) {
      setForm({
        id: data.id || data.compra_id || "",
        fecha: data.fecha ? data.fecha.slice(0, 10) : "",
        total: data.total || "",
        cantidad: data.cantidad || "",
        precio_unitario: data.precio_unitario || "",
        producto_id: data.producto_id || "",
        producto_nombre: data.nombre || ""
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fecha: form.fecha,
        total: form.total,
        cantidad: form.cantidad,
        precio_unitario: form.precio_unitario,
        producto_id: form.producto_id
      };
      const response = await updateShopping(form.id, payload);
      if (response.error) {
        onMessage({ type: "error", message: response.error });
      } else {
        onMessage({ type: "success", message: "Venta actualizada exitosamente" });
        onClose();
      }
    } catch {
      onMessage({ type: "error", message: "Error al actualizar la venta" });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content flex">
        {/* Formulario de edición */}
        <form className="flex-1" onSubmit={handleSubmit}>
          <h2>Editar venta</h2>
          <div className="form-group">
            <label>Fecha:</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Total:</label>
            <input type="number" name="total" value={form.total} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Cantidad:</label>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Precio Unitario:</label>
            <input type="number" name="precio_unitario" value={form.precio_unitario} onChange={handleChange} required />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>

        {/* Columna derecha: Producto (solo lectura) */}
        <div className="flex-1 border-l px-4 flex flex-col justify-center">
          <h3>Producto asociado</h3>
          <div className="mb-2">
            <strong>ID:</strong>
            <div className="bg-gray-100 rounded px-2 py-1">{form.producto_id}</div>
          </div>
          <div>
            <strong>Nombre:</strong>
            <div className="bg-gray-100 rounded px-2 py-1">{form.producto_nombre}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShoppingModal;