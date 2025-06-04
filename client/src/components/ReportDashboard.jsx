import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

import { getCostsSales, getBestSellingProducts, getBestSellingDishes } from "../services/reportService";

const ReportDashboard = () => {
  const [costsSales, setCostsSales] = useState(null);
  const [bestProducts, setBestProducts] = useState(null);
  const [bestDishes, setBestDishes] = useState(null);
  const [showProducts, setShowProducts] = useState(true);

  useEffect(() => {
    (async () => {
      const resultCostsSales = await getCostsSales("month")
      setCostsSales(resultCostsSales.result)
      const resultBestProducts = await getBestSellingProducts(7)
      setBestProducts(resultBestProducts)
      const resultBestDishes = await getBestSellingDishes(7)
      setBestDishes(resultBestDishes);
    })()
  }, []);

  // Preparar datos para la gráfica de ventas y costos por mes
  let barData = null;
  if (costsSales) {
    const labels = costsSales.map(s => `${s.anio}-${String(s.mes).padStart(2, "0")}`);
    barData = {
      labels,
      datasets: [
        {
          label: "Ventas",
          data: costsSales.map(s => s.total_ventas),
          backgroundColor: "rgba(54, 162, 235, 0.6)"
        },
        {
          label: "Costos",
          data: costsSales.map(c => c.total_costos),
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        }
      ]
    };
  }

  // Productos más vendidos
  let productsPie = null;
  if (bestProducts) {
    productsPie = {
      labels: bestProducts.map(p => p.nombre),
      datasets: [
        {
          label: "Vendidos",
          data: bestProducts.map(p => p.total_vendidos),
          backgroundColor: [
            "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
          ]
        }
      ]
    };
  }

  // Platos más vendidos
  let dishesPie = null;
  if (bestDishes) {
    dishesPie = {
      labels: bestDishes.map(p => p.nombre),
      datasets: [
        {
          label: "Vendidos",
          data: bestDishes.map(p => p.total_vendidos),
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF"
          ]
        }
      ]
    };
  }

  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {/* Ventas y Costos por Mes */}
      <div className="bg-white rounded shadow p-4 col-span-2 flex flex-col items-center">
        <h3 className="text-center mb-2 font-bold">Ventas y Costos por Mes</h3>
        {barData && (
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }}
          />
        )}
      </div>
      <div className="bg-white rounded shadow p-4 flex flex-col items-center">
        <div className="flex justify-between w-full mb-2">
          <h3 className="text-center font-bold flex-1">
            {showProducts ? "Productos más vendidos" : "Platos más vendidos"}
          </h3>
          <button
            className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
            onClick={() => setShowProducts(!showProducts)}
          >
            {showProducts ? "Ver Platos" : "Ver Productos"}
          </button>
        </div>
        {showProducts && productsPie && (
          <Pie
            data={productsPie}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }}
          />
        )}
        {!showProducts && dishesPie && (
          <Pie
            data={dishesPie}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReportDashboard;