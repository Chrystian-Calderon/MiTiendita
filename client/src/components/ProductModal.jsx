import { useEffect } from "react";
import { createProduct, updateProduct } from "../services/productService"

const ProductModal = ({ data, onClose, onMessage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = document.querySelector('form')
    const formData = new FormData(form)
    const newData = Object.fromEntries(formData.entries())
    
    try {
      if (!data) {
        const response = await createProduct(newData)
        if (response.error) {
          onMessage({ type: 'error', message: response.error })
        } else {
          onMessage({ type: 'success', message: 'Producto creado exitosamente' })
          onClose()
        }
      } else {
        const response = await updateProduct(newData.id, newData)
        if (response.error) {
          onMessage({ type: 'error', message: response.error })
        } else {
          onMessage({ type: 'success', message: 'Producto actualizado exitosamente' })
          onClose()
        }
      }
    } catch (error) {
      onMessage({ type: 'error', message: 'Error al crear el producto' })
    }
  }

  useEffect(() => {
    if (data) {
      const form = document.querySelector('form');
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const input = form.querySelector(`[name="${key}"]`);
          if (input) {
            input.value = data[key];
          }
        }
      }
    }
  }, [data])

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{(!data) ? 'Agregar producto' : 'Editar producto'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" />
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="form-group-2">
            <div className="form-group">
              <label htmlFor="tipo">Tipo:</label>
              <select name="tipo" id="tipo" required>
                <option value="" disabled>Seleccione</option>
                <option value="ingrediente">Ingrediente</option>
                <option value="producto">Producto</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="unidad_medida">Unidad de Medida:</label>
              <select name="unidad_medida" id="unidad_medida">
                <option value="" disabled>Seleccione</option>
                <option value="unidad">Unidad</option>
                <option value="litro">Litro</option>
                <option value="kilo">Kilo</option>
                <option value="libra">Libra</option>
                <option value="paquete">Paquete</option>
              </select>
            </div>
          </div>
          <div className="form-group cantidad">
            <label htmlFor="cantidad_por_presentacion">Cantidad:</label>
            <input type="number" id="cantidad_por_presentacion" name="cantidad_por_presentacion" required />
          </div>
          <div className="form-group-2">
            <div className="form-group">
              <label htmlFor="precio_compra_unitario">Precio Compra Unitario:</label>
              <input type="text" id="precio_compra_unitario" name="precio_compra_unitario" required />
            </div>
            <div className="form-group">
              <label htmlFor="precio_venta_unitario">Precio Venta Unitario:</label>
              <input type="text" id="precio_venta_unitario" name="precio_venta_unitario" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" name="stock_actual" required />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal