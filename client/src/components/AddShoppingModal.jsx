import { useState, useEffect } from "react";
import { createShopping } from "../services/shopService";
import { getProducts } from "../services/productService";

const AddShoppingModal = ({ onClose, onMessage }) => {
  const [form, setForm] = useState({
    fecha: "",
    total: "",
    cantidad: "",
    producto_id: "",
    producto: null
  });
  const [products, setProducts] = useState([]);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    tipo: "",
    unidad_medida: "",
    precio_venta_unitario: ""
  });

  useEffect(() => {
    (async () => {
      const res = await getProducts();
      setProducts(res);
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductSelect = (product) => {
    setForm({ ...form, producto_id: product.id, producto: null });
    setShowNewProductForm(false);
  };

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleShowNewProductForm = () => {
    setShowNewProductForm(true);
    setForm({ ...form, producto_id: "", producto: newProduct });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = { ...form };
      if (showNewProductForm) {
        payload.producto = newProduct;
        payload.producto_id = undefined;
      }
      
      const response = await createShopping(payload);
      if (response.error) {
        onMessage({ type: "error", message: response.error });
      } else {
        onMessage({ type: "success", message: "Venta agregada exitosamente" });
        onClose();
      }
    } catch {
      onMessage({ type: "error", message: "Error al agregar la venta" });
    }
  };

  return (
    <div className="modal !w-120">
      <div className="modal-content flex">
        <form className="flex-1" onSubmit={handleSubmit}>
          <h2>Agregar venta</h2>
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha" value={form.fecha} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="total">Total:</label>
            <input type="number" id="total" name="total" value={form.total} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" value={form.cantidad} onChange={handleChange} required />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>

        <div className="flex-1 px-4 h-96">
          {!showNewProductForm ? (
            <>
              <h3>Selecciona un producto</h3>
              <ul className="mb-4 h-64 overflow-y-scroll">
                {products.map((prod) => (
                  <li
                    key={prod.id}
                    className={`cursor-pointer p-2 rounded ${form.producto_id === prod.id ? "bg-blue-200" : "hover:bg-gray-100"}`}
                    onClick={() => handleProductSelect(prod)}
                  >
                    {prod.nombre}
                  </li>
                ))}
              </ul>
              <button type="button" className="text-primary border border-primary rounded py-2 px-4 hover:bg-primary hover:text-white transition" onClick={handleShowNewProductForm}>
                + Agregar producto
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <h3>Nuevo producto</h3>
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" name="nombre" value={newProduct.nombre} onChange={handleNewProductChange} className="w-full border rounded p-2" required />
              </div>
              <div className="form-group">
                <label>Tipo:</label>
                <select name="tipo" value={newProduct.tipo} onChange={handleNewProductChange} className="w-full border rounded p-2" required>
                  <option value="" disabled>Seleccione</option>
                  <option value="ingrediente">Ingrediente</option>
                  <option value="producto">Producto</option>
                </select>
              </div>
              <div className="form-group">
                <label>Unidad de Medida:</label>
                <select name="unidad_medida" value={newProduct.unidad_medida} onChange={handleNewProductChange} className="w-full border rounded p-2" required>
                  <option value="" disabled>Seleccione</option>
                  <option value="unidad">Unidad</option>
                  <option value="litro">Litro</option>
                  <option value="kilo">Kilo</option>
                  <option value="libra">Libra</option>
                  <option value="paquete">Paquete</option>
                </select>
              </div>
              <div className="form-group">
                <label>Precio Venta Unitario:</label>
                <input type="number" name="precio_venta_unitario" value={newProduct.precio_venta_unitario} onChange={handleNewProductChange}className="w-full border rounded p-2" required />
              </div>
              <button type="button" className="text-primary border border-primary rounded py-2 px-4 hover:bg-primary hover:text-white transition" onClick={() => setShowNewProductForm(false)}>
                ← Volver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddShoppingModal;