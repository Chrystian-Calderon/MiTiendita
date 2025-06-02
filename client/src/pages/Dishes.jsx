import { useState, useEffect } from "react";
import Navigation from "../components/Navbar";
import Button from "../components/Button";
import Notification from "../components/Notification";
import AddDishModal from "../components/AddDishModal";
import EditDishModal from "../components/EditDishModal";
import { getDishes, deleteDish } from "../services/dishService";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [msg, setMsg] = useState({ type: '', message: '' });

  useEffect(() => {
    (async () => {
      const response = await getDishes();
      if (response.error) {
        setMsg({ type: 'error', message: response.error });
      } else {
        setDishes(response);
      }
    })();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setModalVisible(true);
  };

  const handleEdit = (dish) => {
    setEditData(dish);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este plato?')) {
      const response = await deleteDish(id);
      if (response.error) {
        setMsg({ type: 'error', message: response.error });
      } else {
        setMsg({ type: 'success', message: 'Plato eliminado correctamente' });
        setDishes(dishes.filter(d => d.id !== id));
      }
    }
  };

  const handleMessage = async ({ type, message }) => {
    setMsg({ type, message });
    if (type !== 'error') {
      const response = await getDishes();
      if (!response.error) setDishes(response);
    }
    setTimeout(() => setMsg({ type: '', message: '' }), 3000);
  };

  return (
    <main className="grid grid-cols-12">
      <Navigation />
      <Notification type={msg.type} message={msg.message} />
      {modalVisible && (
        editData ? (
          <EditDishModal
            data={editData}
            onClose={() => setModalVisible(false)}
            onMessage={handleMessage}
          />
        ) : (
          <AddDishModal
            onClose={() => setModalVisible(false)}
            onMessage={handleMessage}
          />
        )
      )}
      <div className="col-span-9">
        <h1 className="title">Platos</h1>
        <div className="content">
          <Button text={'Agregar plato'} onClick={handleAdd} />
          <div className="container-table">
            <table className="table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Precio Venta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish, index) => (
                  <tr key={dish.id}>
                    <td>{index + 1}</td>
                    <td>{dish.nombre}</td>
                    <td>{dish.precio_venta} Bs</td>
                    <td className="actions">
                      <button className="edit" onClick={() => handleEdit(dish)}><FaRegEdit /></button>
                      <button className="delete" onClick={() => handleDelete(dish.id)}><MdDelete /></button>
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

export default Dishes;