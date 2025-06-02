import { useState, useEffect } from "react";
import Navigation from "../components/Navbar";
import Button from "../components/Button";
import Notification from "../components/Notification";
import AddSaleModal from "../components/AddSaleModal";
import EditSaleModal from "../components/EditSaleModal";
import { getSales, deleteSale } from "../services/saleService";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [msg, setMsg] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const response = await getSales();
    console.log(response)
    if (response.error) {
      setMsg({ type: 'error', message: response.error });
    } else {
      setSales(response);
    }
  };

  const handleAdd = () => {
    setEditData(null);
    setModalVisible(true);
  };

  const handleEdit = (sale) => {
    setEditData(sale);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      const response = await deleteSale(id);
      if (response.error) {
        setMsg({ type: 'error', message: response.error });
      } else {
        setMsg({ type: 'success', message: 'Venta eliminada correctamente' });
        setSales(sales.filter(s => s.venta_id !== id));
      }
    }
  };

  const handleMessage = async ({ type, message }) => {
    setMsg({ type, message });
    if (type !== 'error') await fetchSales();
    setTimeout(() => setMsg({ type: '', message: '' }), 3000);
  };

  return (
    <main className="grid grid-cols-12">
      <Navigation />
      <Notification type={msg.type} message={msg.message} />
      {modalVisible && (
        editData ? (
          <EditSaleModal
            data={editData}
            onClose={() => {setModalVisible(false); setEditData(null)}}
            onMessage={handleMessage}
          />
        ) : (
          <AddSaleModal
            onClose={() => {setModalVisible(false); setEditData(null)}}
            onMessage={handleMessage}
          />
        )
      )}
      <div className="col-span-9">
        <h1 className="title">Ventas</h1>
        <div className="content">
          <Button text={'Agregar venta'} onClick={handleAdd} />
          <div className="container-table">
            <table className="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Producto/Plato</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sale.producto_nombre || sale.plato_nombre || ""}</td>
                    <td>{sale.fecha ? new Date(sale.fecha).toLocaleDateString() : ""}</td>
                    <td>{sale.cantidad}</td>
                    <td>{sale.total} Bs</td>
                    <td className="actions">
                      <button className="edit" onClick={() => handleEdit(sale)}><FaRegEdit /></button>
                      <button className="delete" onClick={() => handleDelete(sale.venta_id)}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sales;