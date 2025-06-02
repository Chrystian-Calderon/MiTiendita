import { useState, useEffect } from "react"
import Navigation from "../components/Navbar"
import Button from "../components/Button"
import ProductModal from "../components/ProductModal"
import Notification from "../components/Notification"
import { getProducts, deleteProduct } from "../services/productService"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [msg, setMsg] = useState({ type: '', message: '' })

  useEffect(() => {
    (async () => {
      try {
        const response = await getProducts()
        setProducts(response)
      } catch (error) {
        setMsg({ type: 'error', message: 'Error al cargar los productos' })
      }
    })()
  }, [])

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleEdit = (product) => {
    setData(product)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await deleteProduct(id)
        if (response.error) {
          setMsg({ type: 'error', message: response.error })
        } else {
          setMsg({ type: 'success', message: 'Producto eliminado correctamente' })
          const updatedProducts = products.filter(product => product.id !== id)
          setProducts(updatedProducts)
        }
      } catch (e) {
        setMsg({ type: 'error', message: 'Error al eliminar el producto' })
      }
    }
  }

  const handleMessage = async ({ type, message }) => {
    setMsg({ type, message })
    try {
      if (type !== 'error') {
        const response = await getProducts()
        setProducts(response)
      }
    } catch (e) {
      setMsg({ type: 'error', message: 'Error al actualizar la lista de productos' })
    }
    setTimeout(() => {
      setMsg({ type: '', message: '' })
    }, 3000)
  }

  return (
    <main className="grid grid-cols-12">  
      <Navigation />
      <Notification type={msg.type} message={msg.message} />
      {modalVisible && <ProductModal onClose={handleModal} data={data} onMessage={handleMessage} />}
      <div className="col-span-9">
        <h1 className="title">Productos</h1>
        <div className="content">
          <Button text={'Agregar producto'} onClick={() => {setModalVisible(true); setData(null)}} />
          <div className="container-table">
            <table className="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Unidad de Medida</th>
                  <th>Cantidad</th>
                  <th>Compra unitario</th>
                  <th>Venta unitario</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.nombre}</td>
                    <td>{product.tipo}</td>
                    <td>{product.unidad_medida}</td>
                    <td>{product.cantidad_por_presentacion}</td>
                    <td>{product.precio_compra_unitario} Bs</td>
                    <td>{product.precio_venta_unitario} Bs</td>
                    <td>{product.stock_actual}</td>
                    <td className="actions">
                      <button className="edit" onClick={() => handleEdit(product)}><FaRegEdit /></button>
                      <button className="delete" onClick={() => handleDelete(product.id)}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Products