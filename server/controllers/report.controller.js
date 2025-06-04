class ReportController {
  constructor({ reportModel }) {
    this.model = reportModel;
  }

  getCostsAndSales = async (req, res) => {
    const { type } = req.body;

    try {
      if (type === 'day') {
        const resultSales = await this.model.salesPerDay();
        const resultCosts = await this.model.costsPerDay();
        return res.status(200).json({ sales: resultSales, costs: resultCosts });
      } else {
        const result = await this.model.salesAndCostsPerMonth();
        return res.status(200).json({ result });
      }
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los costos y ventas' });
    }
  }

  getBestSellingProducts = async (req, res) => {
    const { limit } = req.body;

    try {
      const result = await this.model.bestSellingProducts(limit);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los productos más vendidos' });
    }
  }
  
  getBestSellingDishes = async (req, res) => {
    const { limit } = req.body;

    try {
      const result = await this.model.bestSellingDishes(limit);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener los platos más vendidos' });
    }
  }

  getSalesAndProfit = async (req, res) => {
    try {
      const result = await this.model.totalSalesAndProfit();
      if (!result) return res.status(404).json({ error: 'No se tienen datos' });
      return res.status(200).json({
        label: "Ventas totales",
        value: result.ganancia,
        type: "currency",
        description: `${(result.ganancia_porcentual >= 0) ? '+' : ''}${result.ganancia_porcentual}% respecto al mes anterior`,
        descriptionType: "percentage",
        color: result.ganancia_porcentual >= 0 ? 'green' : 'red'
      });
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener ventas y ganancias' });
    }
  }

  getShopAndIncrement = async (req, res) => {
    try {
      const result = await this.model.totalShopAndIncrement();
      if (!result) return res.status(404).json({ error: 'Sin datos para compras' });
      return res.status(200).json({
        label: "Compras totales",
        value: result.total,
        type: "currency",
        description: `${(result.increment >= 0) ? '+' : ''}${result.increment}% respecto al mes anterior`,
        descriptionType: "percentage",
        color: result.increment >= 0 ? 'red' : 'green'
      });
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener compras y su incremento' });
    }
  }

  getProfitMargin = async (req, res) => {
    try {
      const result = await this.model.profitMargin();
      if (!result) return res.status(404).json({ error: 'Sin datos para ganancia de margen' });
      return res.status(200).json({
        label: "Margen de ganancia",
        value: result.margen,
        type: "percentage",
        description: `${(result.incremento_margen >= 0) ? '+' : ''}${result.incremento_margen}% respecto al mes anterior`,
        descriptionType: "percentage",
        color: result.incremento_margen >= 0 ? 'green' : 'red'
      });
    } catch (e) {
      return res.status(500).json({ error: 'Error al obtener margen de ganancia' });
    }
  }
}

export default ReportController;