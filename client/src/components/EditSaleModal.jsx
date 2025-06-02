import { useState, useEffect } from "react";
import { updateSale } from "../services/saleService";
import { getProducts } from "../services/productService";
import { getDishes } from "../services/dishService";

const EditSaleModal = ({ data, onClose, onMessage }) => {
  const [form, setForm] = useState({
    id: "",
    fecha: "",
    total: "",
    cantidad: "",
    producto_id: "",
    plato_id: ""
  });
  const [products, setProducts] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [productoNombre, setProductoNombre] = useState("");
  const [platoNombre, setPlatoNombre] = useState("");

  useEffect(() => {
    (async () => {
      const prods = await getProducts();
      const plats = await getDishes();
      setProducts(prods);
      setDishes(plats);
      if (data) {
        setForm({
          id: data.venta_id,
          fecha: data.fecha ? data.fecha.slice(0, 10) : "",
          total: data.total,
          cantidad: data.cantidad,
          producto_id: data.producto_id || "",
          plato_id: data.plato_id || ""
        });
        setProductoNombre(data.producto_nombre || "");
        setPlatoNombre(data.plato_nombre || "");
      }
    })();
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateSale(form.id, form);
    if (response.error) {
      onMessage({ type: "error", message: response.error });
    } else {
      onMessage({ type: "success", message: "Venta actualizada correctamente" });
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content flex">
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
          <div className="form-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
        <div className="flex-1 px-4 flex flex-col justify-center">
          <h3>Producto o Plato asociado</h3>
          {form.producto_id ? (
            <div>
              <strong>Producto:</strong>
              <div className="bg-gray-100 rounded px-2 py-1">{productoNombre}</div>
            </div>
          ) : (
            <div>
              <strong>Plato:</strong>
              <div className="bg-gray-100 rounded px-2 py-1">{platoNombre}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSaleModal;