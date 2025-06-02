import { useState, useEffect } from "react";
import { createSale } from "../services/saleService";
import { getProducts } from "../services/productService";
import { getDishes } from "../services/dishService";

const AddSaleModal = ({ onClose, onMessage }) => {
  const [form, setForm] = useState({
    fecha: "",
    total: "",
    cantidad: "",
    producto_id: "",
    plato_id: ""
  });
  const [products, setProducts] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectType, setSelectType] = useState(""); // "producto" o "plato"

  useEffect(() => {
    (async () => {
      setProducts(await getProducts());
      setDishes(await getDishes());
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (type, id) => {
    setSelectType(type);
    setForm({
      ...form,
      producto_id: type === "producto" ? id : "",
      plato_id: type === "plato" ? id : ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createSale(form);
    if (response.error) {
      onMessage({ type: "error", message: response.error });
    } else {
      onMessage({ type: "success", message: "Venta agregada correctamente" });
      onClose();
    }
  };

  return (
    <div className="modal !w-[800px]">
      <div className="modal-content flex">
        <form className="flex-1" onSubmit={handleSubmit}>
          <h2>Agregar venta</h2>
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
        <div className="flex-1 px-4">
          <h3>Selecciona producto o plato</h3>
          <div>
            <strong>Productos:</strong>
            <ul className="max-h-60 overflow-y-auto">
              {products.map(prod => (
                <li
                  key={prod.id}
                  className={`cursor-pointer p-2 rounded ${form.producto_id === prod.id ? "bg-blue-200" : "hover:bg-gray-100"}`}
                  onClick={() => handleSelect("producto", prod.id)}
                >
                  {prod.nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <strong>Platos:</strong>
            <ul className="max-h-60 overflow-y-auto">
              {dishes.map(dish => (
                <li
                  key={dish.id}
                  className={`cursor-pointer p-2 rounded ${form.plato_id === dish.id ? "bg-green-200" : "hover:bg-gray-100"}`}
                  onClick={() => handleSelect("plato", dish.id)}
                >
                  {dish.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSaleModal;