import { useState, useEffect } from "react"
import Navigation from "../components/Navbar"
import Button from "../components/Button"
import Notification from "../components/Notification"
import AddShoppingModal from "../components/AddShoppingModal"
import EditShoppingModal from "../components/EditShoppingModal"
import { getShopping, deleteShopping } from "../services/shopService"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Shopping = () => {
  const [shopping, setShopping] = useState([])
  const [msg, setMsg] = useState({ type: '', message: '' })
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchShop()
  }, [])

  const fetchShop = async () => {
    try {
      const response = await getShopping()
      setShopping(response)
    } catch (error) {
      setMsg({ type: 'error', message: 'Error al cargar las compras' })
    }
  }

  const handleEdit = (item) => {
    setData(item)
    setModalVisible(true)
  }

  const handleDelete = async (id, producto_id) => {
    if (window.confirm('¿Estás seguro de eliminar esta compra?')) {
      try {
        const response = await deleteShopping(id, producto_id)
        if (response.error) {
          setMsg({ type: 'error', message: response.error })
        } else {
          setMsg({ type: 'success', message: 'Compra eliminada correctamente' })
          const updatedShopping = shopping.filter(item => item.compra_id !== id)
          setShopping(updatedShopping)
        }
      } catch (e) {
        setMsg({ type: 'error', message: 'Error al eliminar la compra' })
      }
    }
  }

  const handleMessage = async ({ type, message }) => {
    setMsg({ type, message });
    if (type !== 'error') await fetchShop();
    setTimeout(() => setMsg({ type: '', message: '' }), 3000);
  };

  return (
    <main className="grid grid-cols-12">
      <Navigation />
      <Notification type={msg.type} message={msg.message} />
      {modalVisible && (
        data ? (
          <EditShoppingModal
            data={data}
            onClose={() => {setModalVisible(false); setData(null)}}
            onMessage={handleMessage}
          />
        ) : (
          <AddShoppingModal
            onClose={() => setModalVisible(false)}
            onMessage={handleMessage}
          />
        )
      )}
      <div className="col-span-9">
        <h1 className="title">Compras</h1>
        <div className="content">
          <Button text={'Agregar compra'} onClick={() => {setModalVisible(true); setData(null)}} />
          <div className="container-table">
            <table className="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {shopping.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.nombre}</td>
                    <td>{new Date(item.fecha).toLocaleDateString()}</td>
                    <td>{item.total} Bs</td>
                    <td className="actions">
                      <button className="edit" onClick={() => handleEdit(item)}><FaRegEdit /></button>
                      <button className="delete" onClick={() => handleDelete(item.compra_id, item.producto_id)}><MdDelete /></button>
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

export default Shopping