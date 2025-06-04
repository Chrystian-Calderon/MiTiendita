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

  async salesAndCostsPerMonth() {
    const [rows] = await connection.query(`
      SELECT
        v.anio,
        v.mes,
        v.total_ventas,
        COALESCE(c.total_costos, 0) AS total_costos
      FROM (
        SELECT 
          YEAR(fecha) AS anio,
          MONTH(fecha) AS mes,
          SUM(total) AS total_ventas
        FROM ventas
        GROUP BY YEAR(fecha), MONTH(fecha)
      ) v
      LEFT JOIN (
        SELECT 
          YEAR(fecha) AS anio,
          MONTH(fecha) AS mes,
          SUM(total) AS total_costos
        FROM compras
        GROUP BY YEAR(fecha), MONTH(fecha)
      ) c ON v.anio = c.anio AND v.mes = c.mes
      ORDER BY v.anio DESC, v.mes DESC
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

  async bestSellingProducts(limit = 10) {
    const [rows] = await connection.query(`
      SELECT p.nombre, SUM(vd.cantidad) AS total_vendidos
      FROM ventas_detalle vd
      JOIN productos p ON p.id = vd.producto_id
      GROUP BY p.id, p.nombre
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
      GROUP BY pl.id, pl.nombre
      ORDER BY total_vendidos DESC
      LIMIT ?
    `, [limit]);
    return rows;
  }

  async totalSalesAndProfit() {
    const [rows] = await connection.query(`
    SELECT 
      YEAR(v.fecha) as anio,
      MONTH(v.fecha) as mes,
      SUM(v.total) - COALESCE((
        SELECT SUM(c.total)
        FROM compras c
        WHERE MONTH(c.fecha) = MONTH(CURDATE())
          AND YEAR(c.fecha) = YEAR(CURDATE())
      ), 0) as ganancia
    FROM ventas v
    GROUP BY YEAR(v.fecha), MONTH(v.fecha)
    ORDER BY anio DESC, mes DESC;
    `);
    if (rows.length < 0) return null;
    const ganancia_porcentual = ((rows[0].ganancia - rows[1].ganancia) / rows[1].ganancia) * 100;
    return {
      ganancia: rows[0].ganancia,
      ganancia_porcentual: parseFloat(ganancia_porcentual.toFixed(2))
    };
  }

  async totalShopAndIncrement() {
    let [rows] = await connection.query(`
    SELECT
    COALESCE((
      SELECT SUM(total) FROM compras
      WHERE YEAR(fecha) = YEAR(CURDATE())
        AND MONTH(fecha) = MONTH(CURDATE())
    ), 0) AS costo_actual,

    COALESCE((
      SELECT SUM(total) FROM compras
      WHERE YEAR(fecha) = YEAR(CURDATE() - INTERVAL 1 MONTH)
        AND MONTH(fecha) = MONTH(CURDATE() - INTERVAL 1 MONTH)
    ), 0) AS costo_anterior
    `);
    if (!rows) return null;
    rows = rows[0];

    const increment = ((rows.costo_actual - rows.costo_anterior) / rows.costo_anterior) * 100;

    return {
      total: rows.costo_actual,
      increment: parseFloat(increment.toFixed(2))
    }
  }

  async profitMargin() {
    const [rows] = await connection.query(`
    WITH resumen AS (
      SELECT
        YEAR(v.fecha) AS anio,
        MONTH(v.fecha) AS mes,
        SUM(v.total) AS total_ventas,
        COALESCE((
          SELECT SUM(c.total)
          FROM compras c
          WHERE YEAR(c.fecha) = YEAR(v.fecha)
            AND MONTH(c.fecha) = MONTH(v.fecha)
        ), 0) AS total_costos
      FROM ventas v
      GROUP BY YEAR(v.fecha), MONTH(v.fecha)
    ),
    margenes AS (
      SELECT
        anio,
        mes,
        total_ventas,
        total_costos,
        total_ventas - total_costos AS ganancia,
        ROUND((total_ventas - total_costos) / total_ventas * 100, 2) AS margen
      FROM resumen
    ),
    con_variacion AS (
      SELECT
        *,
        LAG(margen) OVER (ORDER BY anio, mes) AS margen_anterior
      FROM margenes
    )
    SELECT
      anio,
      mes,
      total_ventas,
      total_costos,
      ganancia,
      margen,
      margen_anterior,
      CASE
        WHEN margen_anterior IS NULL OR margen_anterior = 0 THEN NULL
        ELSE ROUND(((margen - margen_anterior) / ABS(margen_anterior)) * 100, 2)
      END AS incremento_margen
    FROM con_variacion
    ORDER BY anio DESC, mes DESC LIMIT 1
    `);
    if (rows.length === 0) return null;
    return rows[0];
  }
}

export default new ReportsModel();