import connection from '../config/db.js';

class ReportsModel {
  async salesPerDay() {
    const [rows] = await connection.query(`
      SELECT DATE(fecha) AS dia, SUM(total) AS total_ventas
      FROM ventas
      GROUP BY dia
      ORDER BY dia DESC
    `);
    return rows;
  }

  async salesPerMonth() {
    const [rows] = await connection.query(`
      SELECT YEAR(fecha) AS anio, MONTH(fecha) AS mes, SUM(total) AS total_ventas
      FROM ventas
      GROUP BY anio, mes
      ORDER BY anio DESC, mes DESC
    `);
    return rows;
  }

  async costsPerDay() {
    const [rows] = await connection.query(`
      SELECT DATE(fecha) AS dia, SUM(total) AS total_costos
      FROM compras
      GROUP BY dia
      ORDER BY dia DESC
    `);
    return rows;
  }

  async costsPerMonth() {
    const [rows] = await connection.query(`
      SELECT YEAR(fecha) AS anio, MONTH(fecha) AS mes, SUM(total) AS total_costos
      FROM compras
      GROUP BY anio, mes
      ORDER BY anio DESC, mes DESC
    `);
    return rows;
  }

  async bestSellingProducts(limit = 10) {
    const [rows] = await connection.query(`
      SELECT p.nombre, SUM(vd.cantidad) AS total_vendidos
      FROM ventas_detalle vd
      JOIN productos p ON p.id = vd.producto_id
      GROUP BY p.id
      ORDER BY total_vendidos DESC
      LIMIT ?
    `, [limit]);
    return rows;
  }

  async bestSellingDishes(limit = 10) {
    const [rows] = await connection.query(`
      SELECT pl.nombre, SUM(vd.cantidad) AS total_vendidos
      FROM ventas_detalle vd
      JOIN platos pl ON pl.id = vd.plato_id
      GROUP BY pl.id
      ORDER BY total_vendidos DESC
      LIMIT ?
    `, [limit]);
    return rows;
  }
}

export default new ReportsModel();